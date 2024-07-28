"use client"
import React, { useEffect, useState } from 'react'
import smallHero from "@/../videos/smallHero.mp4"
import hero from "@/../videos/hero.mp4"
import Video from 'next-video';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


export default function Hero() {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHero : hero)
  useGSAP(()=>{
    gsap.to('#title-hero-1',{
      opacity: 1,
      delay: 1.5
    })
  },[])

  const handleSetVideoSrc = () => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHero)
    }else{
      setVideoSrc(hero)
    }
  }

  useEffect(()=>{
    window.addEventListener("resize", handleSetVideoSrc)
  },[])

  return (
    <section className='w-full nav-height bg-black relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
        <p id='title-hero-1' className='hero-title'>iPhone 15 Pro</p>
        {/* <div className='w-9/12 md:w-10/12'>
          <Video src={videoSrc} autoPlay muted loop controls={false} key={videoSrc.createdAt} playsInline={true} className='pointer-events-none'/>
        </div> */}
      </div>
    </section>
  )
}
