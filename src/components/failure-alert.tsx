'use client';

import { Alert } from 'flowbite-react';
import { useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi'

export default function FailureAlert(props: any) {
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
            color="failure"
            icon={HiInformationCircle}
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