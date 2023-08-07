'use client';

import { useEffect, useState } from 'react';
import SuccessAlert from '@/components/success-alert'
import FailureAlert from '@/components/failure-alert'
import { Button, Card, FileInput, Label, TextInput } from 'flowbite-react';
import { HiPencilAlt } from 'react-icons/hi'
import styles from '../page.module.scss'
import { putRequest } from '@/ultils/httpRequests';
import { UserType } from '@/types';
import DatePickerComponent from '@/app/donation-receivers/components/date-picker';
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  firstName: string
  lastName: string
  avatar: string
}

export default function ProfileTab(props: any) {
  const {
    userProfile,
    showDobPickerStatus,
  }: {
    userProfile: UserType,
    showDobPickerStatus: boolean
  } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData()

    for (const key in data) {
      if (key == 'avatar') {
        formData.append(key, data[key][0])

      } else {
        formData.append(key, data[key])
      }
    }

    // putRequest('/users/update-profile', formData)
    //   .then((res) => {
    //     setUserData(res)
    //     setShowToast(true)
    //     setUpdatedStatus(true)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //     setShowToast(true)
    //     setUpdatedStatus(false)
    //   })
  }

  const [user, setUser] = useState<UserType>({})
  const [disableEdit, setDisableEdit] = useState(false)
  const [firstName, setFirstName] = useState(userProfile.firstName)
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState(userProfile.dob)
  const [showToast, setShowToast] = useState(false)
  const [updatStatus, setUpdatedStatus] = useState(false)
  const [avatar, setAvatar] = useState(undefined)

  const setUserData = (user: UserType) => {
    setFirstName(user.firstName || '')
    setLastName(user.lastName || '')
    setDob(user.dob)
    setEmail(user.email || '')
  }

  useEffect(() => {
    setUserData(userProfile)
  }, [userProfile])

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

  return (
    <div className={styles.userProfileTab}>
      {showToast && buildToastComponent()}
      <div className={styles.editButtonGroup}>
        <Button gradientMonochrome="teal" onClick={handleEditButtonClick}>
          <HiPencilAlt className="mr-2 h-5 w-5" />
          {disableEdit ? 'Edit' : 'Cancel'}
        </Button>
      </div>

      <Card>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
              {...(register('firstName'), { required: true })}
              defaultValue={userProfile.lastName}
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
              {...register('lastName')}
              defaultValue={lastName}
            />
          </div>

          <div>
            {showDobPickerStatus && (
              <>
                <Label
                  value="Date of Birth"
                />
                <DatePickerComponent title="Date of Birth" defaultDate={dob ? new Date(dob) : new Date("1950-01-01")} isDisabled={disableEdit} setValue={setDob} />
              </>
            )}

          </div>

          <div>
            <FileInput
              helperText="A profile picture is useful to confirm your are logged into your account"
              id="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              {...register('avatar')}
            />
          </div>

          {

            !disableEdit && (
              <div className={styles.editButtonGroup}>
                <Button type="submit" gradientMonochrome="teal" className={`${styles.submitButton}`}>
                  <HiPencilAlt className="mr-2 h-5 w-5" />
                  Submit
                </Button>
              </div>
            )
          }
        </form>
      </Card>
    </div>
  )
}