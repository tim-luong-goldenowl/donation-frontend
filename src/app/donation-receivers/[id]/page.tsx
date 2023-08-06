import Image from 'next/image'
import styles from './page.module.scss'
import { cookies } from 'next/headers'
import { getRequest } from '@/ultils/httpRequests'
import { redirect } from 'next/navigation'
import { DonationReceiverType } from '@/types'
import ReactHtmlParser from 'react-html-parser'
import { HiMail } from 'react-icons/hi'

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies()

  const donationReceiver = await getRequest(`/donation-receivers/${params.id}`, {
    Cookie: cookieStore
  }).then(({ data }: { data: DonationReceiverType }) => {
    return data
  }).catch((e) => {
    redirect('/users/sign-in')
  })

  return (
    <div className={styles.donationReceiverPage}>
      <div className={styles.leftContent}>
        <div className={styles.avatarImage}>
          <img className="h-auto max-w-full rounded-lg" src="/hinh.jpg" alt="image description"></img>
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

        <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Donate!</button>
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


