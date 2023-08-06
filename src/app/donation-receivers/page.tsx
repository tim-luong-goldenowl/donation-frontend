import Link from 'next/link'
import { getRequest } from '../../ultils/httpRequests'
import { cookies } from 'next/headers'
import styles from './page.module.scss'
import { redirect } from 'next/navigation'
import { DonationReceiverType } from '@/types'

const Index = async () => {
  const cookieStore = cookies()

  const donationReceiverList = await getRequest('/donation-receivers', {
    Cookie: cookieStore
  }).then(({ data }) => {
    return data
  }).catch((e) => {
    redirect('/users/sign-in')
  })

  if (donationReceiverList) {
    return (
      <>
        <div className={styles.donationReceiverlist}>
          {donationReceiverList.map((el: DonationReceiverType) => (
            <div className={`${styles.donationCard} ` + "max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"}>
              <img className="rounded-t-lg" src="/hinh.jpg" alt="" />
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{el.businessName}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <Link href={`/donation-receivers/${el.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Explore More
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default Index;
