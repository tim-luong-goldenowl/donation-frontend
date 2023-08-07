'use client'

import Image from 'next/image'
import { Button, Card, FileInput, Label, Tabs, TextInput, Toast } from "flowbite-react"
import { HiUserCircle, HiFire } from 'react-icons/hi'
import styles from './page.module.scss'
import { HiPencilAlt } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import DatePickerComponent from '@/app/donation-receivers/components/date-picker'
import { getRequest, putRequest } from '@/ultils/httpRequests'
import { useRouter } from 'next/navigation'
import SuccessAlert from '@/components/success-alert'
import FailureAlert from '@/components/failure-alert'
import DonationReceiverTab from './components/donation-receiver-tab'
import { UserType, DonationReceiverType } from '@/types'
import ProfileTab from './components/profile-tab'

export default function Page() {
  const router = useRouter();

  const [user, setUser] = useState<UserType>({})
  const [donationReceiver, setDonationReceiver] = useState<DonationReceiverType>({})
  const [disableEdit, setDisableEdit] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState(user.dob)
  const [showToast, setShowToast] = useState(false)
  const [updatStatus, setUpdatedStatus] = useState(false)
  const [showDobPicker, setShowDobPicker] = useState(false)
  const [avatar, setAvatar] = useState(undefined)

  const setUserData = (user: UserType) => {
    setUser(user)
    setFirstName(user.firstName || '')
    setLastName(user.lastName || '')
    setDob(user.dob)
    setEmail(user.email || '')
  }

  useEffect(() => {
    getRequest('/users/profiles')
      .then(({ user, donationReceiver }: { user: UserType, donationReceiver: DonationReceiverType }) => {
        setUserData(user)
        setDonationReceiver(donationReceiver)
        setShowDobPicker(true)
      })
      .catch(() => {
        router.push('/users/sign-in')
      })
  }, [])

  return (
    <Tabs.Group
      aria-label="Tabs with icons"
      style="underline"
    >
      <Tabs.Item
        active
        icon={HiUserCircle}
        title="Profile"

      >
       <ProfileTab userProfile={user} styles={styles} showDobPickerStatus={showDobPicker}/>
      </Tabs.Item>
      <Tabs.Item
        title="Donation Profile"
      >
        <div className={styles.donationReceiverTab}>
          <DonationReceiverTab donationReceiver={donationReceiver} styles={styles} />
        </div>
      </Tabs.Item>
    </Tabs.Group>
  )
}
