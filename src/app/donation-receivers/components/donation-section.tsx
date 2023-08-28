'use client'

import { useState } from "react"
import DonationForm from './donation-form';
import { Alert, Button } from 'flowbite-react';
import styles from '../[id]/page.module.scss';
import { DonationReceiverType } from '@/types';
import { HiInformationCircle, HiEye, HiCurrencyDollar, HiOutlineCheckCircle } from 'react-icons/hi';
import FailureAlert from "@/components/failure-alert";

type DonationSectionProps = {
    donationReceiver: DonationReceiverType
}

export default function DonationSection(props: DonationSectionProps) {
    const {
        donationReceiver
    } = props

    const [showDonationForm, setShowDonationForm] = useState(false)
    const [donationCount, setDonationCount] = useState(donationReceiver.donationCount)
    const [showMakeDonateButton, setShowMakeDonateButton] = useState(true)
    const [showDonationAlert, setShowDonationAlert] = useState(false)
    const [donationSucess, setDonationSuccess] = useState(false)

    const toggleDonationForm = (show: boolean) => {
        if (show) {
            setShowDonationForm(true)
            setShowMakeDonateButton(false)
        } else {
            setShowDonationForm(false)
            setShowMakeDonateButton(true)
        }
    }

    const handleShowDonationAlert = (success: boolean) => {
        setShowDonationAlert(true)
        setDonationSuccess(success)
    }

    const renderDonationAlert = (success: boolean) => {
        if (success) {
            return <Alert
                additionalContent={
                    <>
                        <>
                            <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
                                To view more about your donation, please hit the link bellow!
                            </div>
                            <div className="flex">
                                <button
                                    type="button"
                                    className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
                                >
                                    <HiEye className="-ml-0.5 mr-2 h-4 w-4" />
                                    View more
                                </button>
                                <button
                                    onClick={() => {setShowDonationAlert(false)}}
                                    type="button"
                                    className="rounded-lg border border-cyan-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-cyan-300 dark:border-cyan-800 dark:text-cyan-800 dark:hover:text-white"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </>
                    </>
                }
                color="success"
                icon={HiOutlineCheckCircle}
                rounded
            >
                <span>
                    <p>
                        <span className="font-medium">
                            Congratulations!
                        </span>
                        <span className="ml-1">
                            Your donation has been successfully transfered to <span className="font-medium"> {donationReceiver.businessName} </span> organization
                        </span>
                    </p>
                </span>
            </Alert>
        } else {
            return <FailureAlert setShowToast={setShowDonationAlert} text='Something went wrong with the payment, please try again!' />
        }
    }

    return (
        <>
            <div className={styles.donationCountSection}>
                {donationCount}
                <div className={styles.donationCountText}>
                    Donations
                </div>
            </div>
            {
                showMakeDonateButton && (
                    <Button gradientMonochrome="teal" onClick={() => { toggleDonationForm(true) }}>
                        <HiCurrencyDollar className="mr-2 h-5 w-5" />
                        Make a Donate!
                    </Button>
                )
            }

            {
                showDonationForm && (
                    <div className={styles.donationForm}>
                        <DonationForm handleShowDonationAlert={handleShowDonationAlert} toggleDonationForm={toggleDonationForm} donationReceiverUid={donationReceiver.uid} setDonationCount={setDonationCount} />
                    </div>
                )
            }

            {
                showDonationAlert && <div className={styles.donationAlertMessageSection}>
                    {renderDonationAlert(donationSucess)}
                </div>
            }
        </>
    );
}