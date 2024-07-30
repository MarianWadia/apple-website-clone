"use client"
import { rightImg, watchImg } from '@/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import React from 'react'

export default function Highlights() {
  useGSAP(()=>{
    gsap.to('#highlights-heading', {
      opacity: 1,
      y:0,
      delay: 1.5,
    })
    gsap.to('.link', {
      opacity: 1,
      delay: 1.5,
      stagger: 1.25,
      ease: 'power3.in-out',
      duration: 1,
      y: 0
    })
  },[])
  return (
    <section className='w-screen overflow-hidden h-full common-padding bg-zinc'>
      <div className='screen-max-width'>
        <div className='w-full md:flex flex-row justify-between items-end'>

          <h1 id='highlights-heading' className='section-heading'>Get the highlights</h1>

          <div className='flex flex-wrap items-end flex-row gap-6'>
            <div className='link gap-2 transition-all'>
              <p>Watch the film</p>
              <Image src={watchImg} alt='watch-icon' width={16} height={16} />
            </div>
            <div className='link gap-2 transition-all'>
              <p>Watch the event</p>
              <Image src={rightImg} alt='right-arrow-icon' width={10} height={10} />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
