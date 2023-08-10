'use client'

import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from "react"
import DonationForm from './donation-form';
import { Button } from 'flowbite-react';
import { HiCurrencyDollar } from 'react-icons/hi';
import styles from '../[id]/page.module.scss';

type DonationSectionProps = {
    donationReceiverId: number
}

const stripePromise = loadStripe('pk_test_51IdVtGDy6vw8nRPsYZtNOku1t5YBXEYcoarTSQD7gOrDWIeCSTHS7nfNU3gMKzE8yBCPwSUiQ2Nz85aKdGrThIuI00Vbxuo4pr');

export default function DonationSection(props: DonationSectionProps) {
    const {
        donationReceiverId
    } = props
    
    const [showDonationForm, setShowDonationForm] = useState(false)

    return (
        <>
            <Button gradientMonochrome="teal" onClick={() => setShowDonationForm(true)}>
                <HiCurrencyDollar className="mr-2 h-5 w-5" />
                Make a Donate!
            </Button>

            {
                showDonationForm && (
                    <div className={styles.donationForm}>
                        <DonationForm donationReceiverId={donationReceiverId}/>
                    </div>
                )
            }
        </>

        // <Elements stripe={stripePromise} options={{}}>
        //     <form>
        //         <PaymentElement />
        //         <button>Submit</button>
        //     </form>
        // </Elements>
    );
}