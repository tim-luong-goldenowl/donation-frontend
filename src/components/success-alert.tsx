'use client';

import { Alert } from 'flowbite-react';
import { useState } from 'react';
import { HiFire } from 'react-icons/hi'

export default function SuccessAlert(props: any) {
    const {
        text,
        setShowToast: setShowToastParent
    } = props

    const [showToast, setShowToast] = useState(true)

    const onDismiss = () => {
        setShowToast(false)
        setShowToastParent(false)
    }


    return (
        showToast && <Alert
            color="success"
            icon={HiFire}
            onDismiss={onDismiss}
        >
            <span>
                <p>
                    {text}
                </p>
            </span>
        </Alert>
    )
}