'use client'

import Link from 'next/link'
import AvatarMenu from './avatar-menu'

type Props = {
    isLogin: boolean
}

export default function Header(props: Props) {
    const {
        isLogin
    } = props

    return (
        <nav className="bg-black border-gray-500 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
                <a className="flex items-center" onClick={() => console.log("@@")}>
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Donation</span>
                </a>

                {
                    isLogin && (
                        <div className="flex items-center md:order-2">
                            <AvatarMenu />
                        </div>
                    )
                }

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <Link href={`/donation-receivers`} className='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'>
                            <div className='pokemon-element'>
                                Donation Receivers
                            </div>
                        </Link>

                        {
                            !isLogin && (
                                <Link href={`/users/sign-in`} className='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'>
                                    <div className='pokemon-element'>
                                        Login
                                    </div>
                                </Link>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}