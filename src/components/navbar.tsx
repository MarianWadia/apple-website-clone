import { navLists } from '@/constants'
import { appleImg, bagImg, searchImg } from '@/utils'
import Image from 'next/image'
import React from 'react'

export default function Navbar() {
  return (
    <header className='w-full flex py-5 items-center justify-between sm:px-5 px-10'>
        <nav className='w-full flex screen-max-width flex-row items-center justify-between'>
            <Image src={appleImg} alt='apple-logo' width={20} height={18} />

            <div className='hidden md:flex flex-row gap-10 '>
                {navLists.map(navItem=>(
                    <p className='text-gray-400 hover:text-white transition-all text-sm font-medium cursor-pointer' key={navItem}>{navItem}</p>
                ))}
            </div>

            <div className='flex flex-row items-center gap-4 md:gap-7'>
                <Image src={searchImg} alt='search-icon' width={20} height={18} />
                <Image src={bagImg} alt='bag-icon' width={20} height={18} />
            </div>

        </nav>
    </header>
  )
}
