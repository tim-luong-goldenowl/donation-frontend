'use client';

import { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import styles from '../page.module.scss'
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { UserType } from '@/types';
import { StripeAddressElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { getRequest, postRequest } from '@/ultils/httpRequests';

type Inputs = {
  firstName: string
  lastName: string
  avatar: string
  dob: Date
}

type Props = {
  user: UserType
}

type PaymentMethod = {
  last4: string
  brand: string
  country: string
  exp_year: number
  exp_month: number
}

export default function CreditCardTab(props: Props) {
  const {
    user
  } = props

  const stripe = useStripe();
  const elements = useElements();

  const [cardElement, setCardElement] = useState<StripeCardNumberElement>()
  const [alreadyHaveCard, setAlreadyHaveCard] = useState<boolean>(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!elements || !cardElement || !stripe) {
      return
    }
    stripe?.createToken(cardElement).then((token) => {
      postRequest('/stripe/create-customer-card', JSON.stringify({ cardToken: token.token?.id, customerId: user.stripeCustomerId }))
    })
  }

  useEffect(() => {
    if (!stripe || !elements || alreadyHaveCard) {
      return
    }

    const cardNumberElement: StripeCardNumberElement = elements.create('cardNumber', {
      placeholder: 'Input Your Card Number',
    })

    cardNumberElement.mount('#card-number')

    setCardElement(cardNumberElement)

    elements?.create("cardExpiry", {
      placeholder: 'Card Expiry',
    }).mount('#card-expiry')

    elements?.create("cardCvc", {
      placeholder: 'Card CVC',
    }).mount('#card-cvc')
  }, [stripe, alreadyHaveCard])

  useEffect(() => {
    getRequest(`/stripe/get-payment-method/${user.stripeCustomerId}`).then(({ success, data }: { success: boolean, data: PaymentMethod }) => {
      if (success) {
        setAlreadyHaveCard(true)
      } else {
        setAlreadyHaveCard(false)
      }
    })
  }, [user])

  const changeToUpdateCard = () => {
    setAlreadyHaveCard(false)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="mb-2 block">
        <Label
          value="Card Number"
        />
      </div>
      {
        alreadyHaveCard ? <TextInput
          id="cardNumber"
          disabled
          value='*******4242'
        /> :
          <div id='card-number' className={styles.stripeElementInput} />
      }

      <div className="mb-2 block">
        <Label
          value="Card Expiry"
        />
      </div>
      {
        alreadyHaveCard ? <TextInput
          id="cardExpiry"
          disabled
          value={'424'}
        /> :
          <div id='card-expiry' className={styles.stripeElementInput} />
      }

      <div className="mb-2 block">
        <Label
          value="Card CVC"
        />
      </div>
      {
        alreadyHaveCard ? <TextInput
          id="cardCvc"
          disabled
          value={'424'}
        /> :
          <div id='card-cvc' className={styles.stripeElementInput} />
      }

      {
        alreadyHaveCard ?
          <Button onClick={changeToUpdateCard}>
            Update Card Info
          </Button>
          :
          <Button type='submit'>
            Submit
          </Button>
      }
    </form>
  )
}

