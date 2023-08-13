'use client'

import { Tabs } from "flowbite-react"
import { HiUserCircle, HiFire } from 'react-icons/hi'
import styles from './page.module.scss'
import { use, useEffect, useState } from 'react'
import { getRequest, putRequest } from '@/ultils/httpRequests'
import { useRouter } from 'next/navigation'
import DonationReceiverTab from './components/donation-receiver-tab'
import { UserType, DonationReceiverType } from '@/types'
import ProfileTab from './components/profile-tab'
import CreditCardTab from "./components/credit-card-tab"
import StripeElementsWrapper from "./components/stripe-element-wrapper"

export default function Page() {
  const router = useRouter();

  const [user, setUser] = useState<UserType>({})
  const [donationReceiver, setDonationReceiver] = useState<DonationReceiverType>({})
  const [showDobPicker, setShowDobPicker] = useState(false)

  useEffect(() => {
    getRequest('/users/profiles')
      .then(({ user, donationReceiver }: { user: UserType, donationReceiver: DonationReceiverType }) => {
        setUser(user)
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
        title="Credit Card Information"
      >
        <div className={styles.creditCardTab}>
          <StripeElementsWrapper user={user}/>
        </div>
      </Tabs.Item>
      <Tabs.Item
        icon={HiUserCircle}
        title="Profile"

      >
        <ProfileTab userProfile={user} styles={styles} showDobPickerStatus={showDobPicker} />
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

