'use client'

import { postRequest } from "@/ultils/httpRequests"
import { Button, Card, Label, TextInput } from "flowbite-react"
import { useForm, SubmitHandler } from "react-hook-form"
import { HiFire } from 'react-icons/hi'

type Inputs = {
    value: number
    message: string
}

type DonationFormProps = {
    donationReceiverId?: number
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const {
        donationReceiverId,
        setDonationCount,
        handleShowDonationAlert,
        toggleDonationForm
    } = props

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const requestData = {
            ...data,
            value: parseInt(data.value.toString()),
            donationReceiverId
        }


        postRequest('/donation', JSON.stringify(requestData))
            .then(({ success, data }: {success: boolean, data: CreateDonationType}) => {
                if(success) {
                    setDonationCount(data.donationCount)
                    toggleDonationForm(false)
                    handleShowDonationAlert(true)
                } else {
                    handleShowDonationAlert(false)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <Card>
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
                        placeholder="1.0$"
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
                <Button onClick={() => {toggleDonationForm(false)}} gradientDuoTone="pinkToOrange">
                    <HiFire className="mr-2 h-5 w-5" />
                    Cancel!
                </Button>
            </form>
        </Card>
    );
}