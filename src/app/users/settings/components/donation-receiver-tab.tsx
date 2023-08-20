'use client';

import { useEffect, useState } from 'react';
import SuccessAlert from '@/components/success-alert'
import FailureAlert from '@/components/failure-alert'
import { Badge, Button, Card, FileInput, Label, TextInput } from 'flowbite-react';
import { HiPencilAlt, HiFire, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi'
import styles from '../page.module.scss'
import { postRequest, putRequest } from '@/ultils/httpRequests';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DonationReceiverType } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import ImageComponent from '@/components/image-component';

type Inputs = {
    email: string
    businessName: string
    companyName: string
    bio: string
    country: string
    avatar: string
}

export default function DonationReceiverTab(props: any) {
    const {
        donationReceiver
    }: {
        donationReceiver: DonationReceiverType
    } = props

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()


    const [showToast, setShowToast] = useState(false)
    const [showSendMailToast, setShowSendMailToast] = useState(false)
    const [updatStatus, setUpdatedStatus] = useState(false)
    const [disableEdit, setDisableEdit] = useState(true)
    const [bio, setBio] = useState(donationReceiver.bio)

    const [avatarUrl, setAvatarUrl] = useState(donationReceiver.avatarUrl)

    const setDonationReceiverData = (data: DonationReceiverType) => {
        reset(data)
        setBio(data.bio || '')
        setAvatarUrl(data.avatarUrl)
    }

    useEffect(() => {
        setDonationReceiverData(donationReceiver)
    }, [donationReceiver])

    const buildToastComponent = () => {
        if (updatStatus) {
            return <SuccessAlert text='Updated Successfully' setShowToast={setShowToast} />
        } else {
            return <FailureAlert text='Updated Failed' setShowToast={setShowToast} />
        }
    }

    const buildSendMailToastComponent = () => {
        return <SuccessAlert text='The onboarding link has been sent to your email account, please check it!' setShowToast={setShowToast} />
    }


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const formData = new FormData()

        formData.append('bio', bio || '')

        for (const key in data) {
            if (key == 'bio' || data[key] == null || data[key] == undefined) {
                continue
            }

            if (key == 'avatar') {
                formData.append(key, data[key][0])

            } else {
                formData.append(key, data[key])
            }
        }

        putRequest('/donation-receivers/update-profile', formData)
            .then((res) => {
                setDonationReceiverData(res)
                setShowSendMailToast(false)
                setShowToast(true)
                setUpdatedStatus(true)
            })
            .catch((e) => {
                setShowSendMailToast(false)
                setShowToast(true)
                setUpdatedStatus(false)
            })
    }

    const handleEditButtonClick = () => {
        setDisableEdit(!disableEdit)
    }

    const statusBadge = () => {
        let colorClassName = 'failure'
        let text = 'Not Verified'
        let icon = HiExclamationCircle

        if (donationReceiver.verified) {
            colorClassName = 'success'
            text = 'Verified'
            icon = HiCheckCircle
        }

        return (
            <Badge
                color={colorClassName}
                size="md"
                className={styles.statusBadge}
                icon={icon}
            >
                <p className={styles.statusBadgeText}>
                    {text}
                </p>
            </Badge>
        )
    }

    const handleGetVeiried = () => {
        const data = {
            id: donationReceiver.id
        }
        postRequest('/donation-receivers/verify', JSON.stringify(data)).then(() => {
            setShowToast(false)
            setShowSendMailToast(true)
        })
    }

    return (
        <>
            {showToast && buildToastComponent()}
            {showSendMailToast && buildSendMailToastComponent()}
            <Card>
                {statusBadge()}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.editButtonGroup}>
                        {
                            !donationReceiver.verified && (
                                <Button onClick={handleGetVeiried} gradientDuoTone="pinkToOrange">
                                    <HiFire className="mr-2 h-5 w-5" />
                                    Get Verified!
                                </Button>
                            )
                        }
                        {
                            !disableEdit && (
                                <Button gradientMonochrome="teal" className={styles.submitButton} type='submit'>
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
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email"
                                value="Business Email"
                            />
                        </div>
                        <TextInput
                            id="email"
                            placeholder="Business Email"
                            disabled={disableEdit}
                            {...register('email')}
                            defaultValue={donationReceiver.email}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="businessName"
                                value="Business Name"
                            />
                        </div>
                        <TextInput
                            id="businessName"
                            placeholder="Business Name"
                            disabled={disableEdit}
                            {...register('businessName')}
                            defaultValue={donationReceiver.businessName}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="companyName"
                                value="Company Name"
                            />
                        </div>
                        <TextInput
                            id="companyName"
                            placeholder="Company Name"
                            disabled={disableEdit}
                            {...register('companyName')}
                            defaultValue={donationReceiver.companyName}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="country"
                                value="Country"
                            />
                        </div>
                        <TextInput
                            id="country"
                            placeholder="Country"
                            disabled={disableEdit}
                            {...register('country')}
                            defaultValue={donationReceiver.country}
                        />
                    </div>

                    {
                        !disableEdit && (
                            <FileInput
                                helperText="A profile picture is useful to confirm your are logged into your account"
                                id="file"
                                {...register('avatar')}
                            />
                        )
                    }

                    <div>
                        {
                            avatarUrl && (
                                <ImageComponent url={avatarUrl} width={400} height={400} />
                            )
                        }
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                value="Bio"
                            />
                        </div>
                        <CKEditor
                            editor={ClassicEditor}
                            disabled={disableEdit}
                            data={bio}
                            onChange={(event: any, editor: any) => {
                                const data = editor.getData();
                                setBio(data)
                            }}
                        />
                    </div>
                </form>
            </Card>
        </>
    )
}