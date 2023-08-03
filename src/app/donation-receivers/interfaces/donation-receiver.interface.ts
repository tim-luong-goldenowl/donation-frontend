import { iUser } from "../../users/interfaces/user.interface"

export interface iDonationReceiver {
    id: number
    email: string
    businessName: string
    companyName: string
    country: string
    onboardingCompleteToken: string
    user: iUser
}