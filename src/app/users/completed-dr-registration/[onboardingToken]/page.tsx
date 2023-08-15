import { cookies } from 'next/headers'
import { getRequest } from '@/ultils/httpRequests'
import SuccessAlert from '@/components/success-alert'
import FailureAlert from '@/components/failure-alert'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { onboardingToken: number } }) {
    const cookieStore = cookies()

    await getRequest(`/donation-receivers/register-completed/${params.onboardingToken}`, {
        Cookie: cookieStore
    }).then(({ success }: { success: boolean }) => {
        if (success) {
            redirect('/users/settings')
        }
    })

    return (
        <div role="status" className='items-center justify-center hidden w-full h-full md:flex md:w-auto md:order-1'>
            <FailureAlert text='Failed to validate the token!' />
        </div>
    )
}


