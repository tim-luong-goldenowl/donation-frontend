'use client';

import { useEffect, useState } from 'react';
import SuccessAlert from '@/components/success-alert'
import FailureAlert from '@/components/failure-alert'
import { Button, Card, FileInput, Label, TextInput } from 'flowbite-react';
import { HiPencilAlt, HiFire } from 'react-icons/hi'
import styles from '../page.module.scss'
import { postRequest, putRequest } from '@/ultils/httpRequests';
import { UserType } from '@/types';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import DatePickerComponent from '@/components/date-picker';
import ImageComponent from '@/components/image-component';

type Inputs = {
  firstName: string
  lastName: string
  avatar: string
  dob: Date
}

export default function ProfileTab(props: any) {
  const {
    userProfile,
    showDobPickerStatus,
    setDonationReceiver,
    setHasDonationReceiver
  }: {
    userProfile: UserType,
    showDobPickerStatus: boolean,
    setDonationReceiver: Function,
    setHasDonationReceiver: Function
  } = props

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
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

    putRequest('/users/update-profile', formData)
      .then((res) => {
        setUserData(res)
        setAvatarUrl(res.avatarUrl)
        setShowToast(true)
        setUpdatedStatus(true)
      })
      .catch((e) => {
        console.log(e)
        setShowToast(true)
        setUpdatedStatus(false)
      })
  }

  const [disableEdit, setDisableEdit] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [updatStatus, setUpdatedStatus] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl)

  const setUserData = (user: UserType) => {
    reset(user)
    setAvatarUrl(user.avatarUrl)
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

  const handleBecomeDonationReceiver = () => {
    postRequest('/donation-receivers/register').then((data) => {
      console.log("@@@@@@@@@@@@@@@@@@@data", data)
      setDonationReceiver(data)
      setHasDonationReceiver(true)
    })
  }

  return (
    <div className={styles.userProfileTab}>
      {showToast && buildToastComponent()}
      <div className={styles.editButtonGroup}>
        <Button onClick={handleBecomeDonationReceiver} gradientDuoTone="pinkToOrange">
          <HiFire className="mr-2 h-5 w-5" />
          Become a Donatio Receiver!
        </Button>
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
              value={userProfile.email}
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
              {...register('firstName')}
              defaultValue={userProfile.firstName}
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
              defaultValue={userProfile.lastName}
            />
          </div>

          <div>
            {showDobPickerStatus && (
              <Controller
                control={control}
                name="dob"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <>
                    <Label
                      value="Date of Birth"
                    />
                    <DatePickerComponent onChange={onChange} title="Date of Birth" defaultDate={userProfile.dob ? new Date(userProfile.dob) : new Date("1950-01-01")} isDisabled={disableEdit} setValue={setValue} register={register} />
                  </>
                )}
              />
            )}

          </div>

          <div>
            {
              !disableEdit && (
                <FileInput
                  helperText="A profile picture is useful to confirm your are logged into your account"
                  id="file"
                  {...register('avatar')}
                />
              )
            }

          </div>

          <div>
            {
              avatarUrl && (
                <ImageComponent url={avatarUrl} width={400} height={400}/>
              )
            }
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