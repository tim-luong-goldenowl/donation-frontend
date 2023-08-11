'use client';

import { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Label } from 'flowbite-react';
import styles from '../page.module.scss'
import { useElements, useStripe } from '@stripe/react-stripe-js';

type Inputs = {
  firstName: string
  lastName: string
  avatar: string
  dob: Date
}

export default function CreditCardTab() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    stripe?.createSource(elements)
  }

  useEffect(() => {
    elements?.create('cardNumber', {
      placeholder: 'Input Your Card Number',
    }).mount('#card-number')

    elements?.create("cardExpiry", {
      placeholder: 'Card Expiry',
    }).mount('#card-expiry')

    elements?.create("cardCvc", {
      placeholder: 'Card CVC',
    }).mount('#card-cvc')
  }, [])


  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="mb-2 block">
        <Label
          value="Card Number"
        />
      </div>
      <div id='card-number' className={styles.stripeElementInput} />

      <div className="mb-2 block">
        <Label
          value="Card Number"
        />
      </div>
      <div id='card-expiry' className={styles.stripeElementInput} />

      <div className="mb-2 block">
        <Label
          value="Card CVC"
        />
      </div>
      <div id='card-cvc' className={styles.stripeElementInput} />
      <Button type='submit'>
        Submit
      </Button>
    </form>
  )
}

