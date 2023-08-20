import Image from 'next/image'
import styles from './page.module.scss'
import { cookies } from 'next/headers'
import { getRequest } from '@/ultils/httpRequests'
import { redirect } from 'next/navigation'
import { DonationReceiverType } from '@/types'
import ReactHtmlParser from 'react-html-parser'
import { HiMail } from 'react-icons/hi'
import DonationSection from '../components/donation-section'

export default async function Page({ params }: { params: { id: number } }) {
  const cookieStore = cookies()
  let canMakeDonation = false

  const donationReceiver = await getRequest(`/donation-receivers/${params.id}`, {
    Cookie: cookieStore
  }).then(({ data, canMakeDonate }: { data: DonationReceiverType, canMakeDonate: boolean }) => {
    canMakeDonation = canMakeDonate
    return data
  }).catch((e) => {
    redirect('/users/sign-in')
  })

  return (
    <div className={styles.donationReceiverPage}>
      <div className={styles.leftContent}>
        <div className={styles.avatarImage}>
          {
            donationReceiver.avatarUrl && (
              <Image key={Date.now()} src={donationReceiver.avatarUrl} alt='' width={400} height={400} />
            )
          }
        </div>

        <div className={styles.companyName}>
          <h6 className="text-lg dark:text-white">
            {donationReceiver.companyName}
          </h6>
        </div>

        <div className={styles.socialMedia}>
          <div className={styles.socialMediaMember}>
            <HiMail className="mr-2 h-5 w-5" />
            {donationReceiver.email}
          </div>
        </div>

        {
          canMakeDonation && (
            <DonationSection donationReceiver={donationReceiver} />

          )
        }

      </div>

      <div className={styles.rightContent}>
        <div className={styles.aboutUs}>
          <div className={`${styles.bioContent} ck-content`}>
            {ReactHtmlParser(donationReceiver.bio)}
          </div>
        </div>
      </div>
    </div>
  )
}


