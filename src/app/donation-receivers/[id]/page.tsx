import Image from 'next/image'
import styles from './page.module.scss'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={styles.donationReceiverPage}>
      <div className={styles.coverImage}>
        <Image className="w-8 h-8" fill={true} src="/hinh.jpg" alt="" />
      </div>

      <div className={styles.profileCard}>
        <div className={styles.avatarImage}>
          <Image className={"w-8 h-8"} fill={true} src="/hinh.jpg" alt="" />
        </div>
        <div className={styles.donationInfor}>
          <div className={styles.donationInforElement}>
            <div>
              3
            </div>
            <div className={styles.text}>
              Donation
            </div>
          </div>
          <div className={styles.donationInforElement}>
            <div>
              4
            </div>
            <div className={styles.text}>
              Followers
            </div>
          </div>
        </div>

        <div className={styles.donateButton}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Donate!
          </button>
        </div>
      </div>
    </div>
  )
}
