import withAuthen from '@/components/hoc/auth'
import Link from 'next/link'
import { getRequest } from '../../ultils/httpRequests'

interface IDonationReceiver {
  name: String,
  email: String,
  id: Number,
  businessName: String,
  companyName: String,
  country: String,
  verified: Boolean
}

export async function getServerSideProps({ req }: { req: any }) {
  const res = await getRequest('/donation-receivers', {
    Cookie: req.headers.cookie
  }).then(({ data }) => {
    return data
  }).catch((e) => {
    return false
  })

  return {
    props: {
      donationReceiverList: res || []
    }
  }
}

const Index = (props: any): React.ReactNode => {
  const { donationReceiverList }: { donationReceiverList: Array<IDonationReceiver> } = props

  if (donationReceiverList) {
    return (
      <>
        <div className='donation-receiver-list'>
          {donationReceiverList.map((el: IDonationReceiver) => (
            <Link href={``} key={el.id.toString()}>
              <div>
                {el.email}
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }
}

export default withAuthen(Index);
