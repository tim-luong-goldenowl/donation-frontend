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


  const buildToastComponent = () => {
    if (updatStatus) {
      return <SuccessAlert text='Updated Successfully' setShowToast={setShowToast} />
    } else {
      return <FailureAlert text='Updat Failed' setShowToast={setShowToast} />
    }
  }

  const handleEditButtonClick = () => {
    setDisableEdit(!disableEdit)
  }



  const handleSubmit = () => {
    const data: UserType = {
      firstName,
      lastName,
      dob,
      email: user.email,
      id: user.id,
      avatar
    }

    let formData = new FormData();
    formData.append('name', 'John');
    formData.append('password', 'John123');

    putRequest('/users/update-profile', JSON.stringify(formData))
      .then((res) => {
        setUserData(res)
        setShowToast(true)
        setUpdatedStatus(true)
      })
      .catch((e) => {
        console.log(e)
        setShowToast(true)
        setUpdatedStatus(false)
      })
  }


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
        <div className={styles.userProfileTab}>
          {showToast && buildToastComponent()}
          <div className={styles.editButtonGroup}>
            {
              !disableEdit && (
                <Button gradientMonochrome="teal" className={styles.submitButton} onClick={handleSubmit}>
                  <HiPencilAlt className="mr-2 h-5 w-5" />
                  Submit
                </Button>
              )
            }

            <Button gradientMonochrome="teal" onClick={handleEditButtonClick}>
              <HiPencilAlt className="mr-2 h-5 w-5" />
              {disableEdit ? 'Edit' : 'Cancel'}
            </Button>
          </div>

          <Card>
            <form className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="email1"
                    value="Email"
                  />
                </div>
                <TextInput
                  id="email1"
                  placeholder="name@gmail.com"
                  disabled
                  type="email"

                  value={email}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="first-name"
                    value="First Name"
                  />
                </div>
                <TextInput
                  id="first-name"
                  placeholder="First Name"
                  disabled={disableEdit}
                  onChange={({ target }) => { setFirstName(target.value) }}
                  value={firstName}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="last-name"
                    value="Last Name"
                  />
                </div>
                <TextInput
                  id="last-name"
                  placeholder="Last Name"
                  disabled={disableEdit}
                  onChange={({ target }) => { setLastName(target.value) }}
                  value={lastName}
                />
              </div>

              <div>
                {showDobPicker && <DatePickerComponent title="Date of Birth" defaultDate={dob ? new Date(dob) : new Date("1950-01-01")} isDisabled={disableEdit} setValue={setDob} />}
              </div>

              <div>
                <FileInput
                  helperText="A profile picture is useful to confirm your are logged into your account"
                  id="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>

              <Button type="submit">
                Submit
              </Button>
            </form>
          </Card>
        </div>
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
