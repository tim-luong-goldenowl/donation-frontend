'use client';

import { useEffect, useState } from 'react';
import SuccessAlert from '@/components/success-alert'
import FailureAlert from '@/components/failure-alert'
import { Badge, Button, Card, Label, TextInput } from 'flowbite-react';
import { HiPencilAlt, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi'
import styles from '../page.module.scss'
import { putRequest } from '@/ultils/httpRequests';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DonationReceiverType } from '@/types';

export default function DonationReceiverTab(props: any) {
    const {
        donationReceiver
    }: {
        donationReceiver: DonationReceiverType
    } = props


    const [showToast, setShowToast] = useState(false)
    const [updatStatus, setUpdatedStatus] = useState(false)
    const [email, setEmail] = useState('')
    const [disableEdit, setDisableEdit] = useState(true)
    const [businessName, setBusinessName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [country, setCountry] = useState('')
    const [bio, setBio] = useState('')

    const setDonationReceiverData = (data: DonationReceiverType) => {
        setEmail(data.email || '')
        setCountry(data.country || '')
        setCompanyName(data.companyName || '')
        setBusinessName(data.businessName || '')
        setBio(data.bio || '')
    }

    useEffect(() => {
        setDonationReceiverData(donationReceiver)
    }, [donationReceiver])

    const buildToastComponent = () => {
        if (updatStatus) {
            return <SuccessAlert text='Updated Successfully' setShowToast={setShowToast} />
        } else {
            return <FailureAlert text='Updat Failed' setShowToast={setShowToast} />
        }
    }

    const handleSubmit = () => {
        const data: DonationReceiverType = {
            email,
            id: donationReceiver.id,
            country,
            businessName,
            companyName,
            bio
        }

        putRequest('/donation-receivers/update-profile', JSON.stringify(data))
            .then((res) => {
                setDonationReceiverData(res)
                setShowToast(true)
                setUpdatedStatus(true)
            })
            .catch((e) => {
                console.log(e)
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


    return (
        <>
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
                {statusBadge()}
                <form className="flex flex-col gap-4">
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
                            value={email}
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
                            onChange={({ target }) => { setBusinessName(target.value) }}
                            value={businessName}
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
                            onChange={({ target }) => { setCompanyName(target.value) }}
                            value={companyName}
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
                            onChange={({ target }) => { setCountry(target.value) }}
                            value={country}
                        />
                    </div>
                </form>

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
            </Card>
        </>
    )
}