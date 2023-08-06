export type UserType = {
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    dob?: Date
}

export type DonationReceiverType = {
    id?: number
    email?: string
    businessName?: string
    companyName?: string
    country?: string
    verified?: boolean
    bio?: string
}
