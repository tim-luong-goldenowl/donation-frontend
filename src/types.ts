export type UserType = {
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    dob?: Date
    avatarUrl?: string
    stripeCustomerId?: string
}

export type DonationReceiverType = {
    id?: number
    email?: string
    businessName?: string
    companyName?: string
    country?: string
    verified?: boolean
    bio?: string
    donationCount?: number
    avatarUrl?: string
}
