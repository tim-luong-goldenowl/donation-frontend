'use client'

import { postRequest } from "@/ultils/httpRequests"
import { Button, Card, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { HiFire } from 'react-icons/hi'

type Inputs = {
    value: number
    message: string
}

type DonationFormProps = {
    donationReceiverUid?: string
    setDonationCount: Function
    handleShowDonationAlert: Function
    toggleDonationForm: Function
}

type Donation = {
    id: number
    message: string
    value: number
}

type CreateDonationType = {
    donation: Donation,
    donationCount: number
}


export default function DonationForm(props: DonationFormProps) {
    const [showLoading, setShowLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const {
        donationReceiverUid,
        setDonationCount,
        handleShowDonationAlert,
        toggleDonationForm
    } = props

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setShowLoading(true)

        const requestData = {
            ...data,
            value: parseInt(data.value.toString()),
            donationReceiverUid
        }


        postRequest('/donation', JSON.stringify(requestData))
            .then(({ success, data }: { success: boolean, data: CreateDonationType }) => {
                if (success) {
                    setDonationCount(data.donationCount)
                    toggleDonationForm(false)
                    handleShowDonationAlert(true)
                    setShowLoading(false)
                } else {
                    handleShowDonationAlert(false)
                    setShowLoading(false)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <Card>
            {
                showLoading ? (
                    <div className="flex flex-col justify-center items-center w-full">
                        <Spinner
                            aria-label="Extra large spinner example"
                            size="xl"
                        />

                        Processing
                    </div>

                ) : (
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="donation-value"
                                    value="Donation Value"
                                />
                            </div>
                            <TextInput
                                id="donation-value"
                                placeholder="0.0$"
                                type='number'
                                {...register('value')}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="message"
                                    value="Message"
                                />
                            </div>
                            <TextInput
                                id="message"
                                placeholder="Your message send to the receiver..."
                                {...register('message')}
                            />
                        </div>

                        <Button type='submit' gradientDuoTone="greenToBlue">
                            <HiFire className="mr-2 h-5 w-5" />
                            Donate!
                        </Button>
                        <Button onClick={() => { toggleDonationForm(false) }} gradientDuoTone="pinkToOrange">
                            <HiFire className="mr-2 h-5 w-5" />
                            Cancel!
                        </Button>
                    </form>
                )
            }
        </Card>
    );
}