'use client';

import { SyntheticEvent, use, useEffect, useState } from 'react';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import styles from '../page.module.scss'
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { UserType } from '@/types';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import { getRequest, postRequest } from '@/ultils/httpRequests';
import SuccessAlert from '@/components/success-alert';

type Props = {
  user: UserType
}

type PaymentMethod = {
  last4?: string
  brand?: string
  country?: string
  expYear?: number
  expMonth?: number
  cvc?: string
}

export default function CreditCardTab(props: Props) {
  const {
    user
  } = props

  const stripe = useStripe();
  const elements = useElements();

  const [cardElement, setCardElement] = useState<StripeCardNumberElement>()
  const [alreadyHaveCard, setAlreadyHaveCard] = useState<boolean>(false)
  const [cardInfor, setCardInfor] = useState<PaymentMethod>({})
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!elements || !cardElement || !stripe) {
      return
    }

    stripe?.createToken(cardElement).then((token) => {
      postRequest('/users/create-customer-card', JSON.stringify({ cardToken: token.token?.id })).then(({ success }) => {
        if (success) {
          fetchCustomerCardInfor()
          setShowToast(true)
        }
      })
    })
  }

  useEffect(() => {
    if (!stripe || !elements || alreadyHaveCard) {
      return
    }

    elements?.getElement('cardExpiry')?.destroy()
    elements?.getElement('cardCvc')?.destroy()
    elements?.getElement('cardNumber')?.destroy()

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
    if (user.stripeCustomerId) {
      fetchCustomerCardInfor()
    }
  }, [user])


  const fetchCustomerCardInfor = () => {
    getRequest('/users/get-payment-method').then(({ success, data }: { success: boolean, data: PaymentMethod }) => {
      if (success) {
        setCardInfor(data)
        setAlreadyHaveCard(true)
      } else {
        setAlreadyHaveCard(false)
      }
    })
  }

  const changeToUpdateCard = () => {
    setAlreadyHaveCard(false)
  }

  return (
    <Card className='w-full'>
      {
        showToast && <SuccessAlert text='Updated Credit Card Successfully' setShowToast={setShowToast} />
      }
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div className="mb-2 block">
          <Label
            value="Card Number"
          />
        </div>
        {
          alreadyHaveCard ? <TextInput
            id="cardNumber"
            disabled
            value={`****${cardInfor.last4}`}
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
            value={`${cardInfor.expMonth}/${cardInfor.expYear}`}
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
            value='***'
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
    </Card>

  )
}

