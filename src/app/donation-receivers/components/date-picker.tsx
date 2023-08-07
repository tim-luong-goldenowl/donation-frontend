'use client'

import { useState } from "react"
import Datepicker from "tailwind-datepicker-react"

export default function DatePickerComponent(props: any) {
    const {
        title,
        defaultDate,
        isDisabled,
        setValue,
        formRegister
    } = props

    const [show, setShow] = useState(false)

    const options = {
        title,
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        disabled: false,
        theme: {
            background: "bg-gray-200",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "",
            disabledText: "bg-gray-300",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: {
            prev: () => <span>Previous</span>,
            next: () => <span>Next</span>,
        },
        datepickerClassNames: "top-12",
        defaultDate: defaultDate,
        language: "en",
    }

    const handleChange = (selectedDate: Date) => {
        setValue(selectedDate)
    }

    const handleClose = (state: boolean) => {
        if(!isDisabled) {
            setShow(state)
        } else {
            false
        }
    }

    return (
        <div>
            <Datepicker disabled options={options} onChange={handleChange} show={show} setShow={handleClose} />
        </div>
    )
}