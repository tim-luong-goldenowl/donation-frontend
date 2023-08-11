'use client';

import { useEffect, useState } from 'react';
import SuccessAlert from '@/components/success-alert'
import FailureAlert from '@/components/failure-alert'
import { Button, Card, FileInput, Label, TextInput } from 'flowbite-react';
import { HiPencilAlt } from 'react-icons/hi'
import styles from '../page.module.scss'
import { putRequest } from '@/ultils/httpRequests';
import { UserType } from '@/types';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import Image from 'next/image'
import DatePickerComponent from '@/components/date-picker';
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreditCardTab from './credit-card-tab';

const stripePromise = loadStripe('pk_test_51IdVtGDy6vw8nRPsYZtNOku1t5YBXEYcoarTSQD7gOrDWIeCSTHS7nfNU3gMKzE8yBCPwSUiQ2Nz85aKdGrThIuI00Vbxuo4pr');

export default function StripeElementsWrapper() {
  return (
    <Elements stripe={stripePromise} >
      <CreditCardTab />
    </Elements>
  )
}


