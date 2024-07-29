"use client";
import smallHero from '@/../videos/smallHero.mp4';
import hero from '@/../videos/hero.mp4';
import Video from 'next-video';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';

export default function Hero() {

  useGSAP(() => {
    gsap.to('#title-hero-1', {
      opacity: 1,
      delay: 3.5,
    });
    gsap.to('#hero-last-part', {
      opacity: 1,
      delay: 3.5,
      y: -50,
    });
  }, []);

  return (
    <section className='w-full nav-height bg-black relative'>
      <div className='h-full w-full flex-center flex-col'>
        <p id='title-hero-1' className='hero-title'>iPhone 15 Pro</p>

          <div className='w-9/12 md:w-10/12 h-4/6 hidden md:block'>
            <Video src={hero} autoPlay muted loop controls={false} className='pointer-events-none h-full' />
          </div>

          <div className='w-9/12 md:w-10/12 h-4/6 block md:hidden'>
            <Video src={smallHero} autoPlay muted loop controls={false} className='pointer-events-none h-full' />
          </div>

        <div id='hero-last-part' className='flex flex-col items-center opacity-0 translate-y-20'>
          <Link passHref={true} href='#highlights' className='btn'>Buy</Link>
          <p className='font-normal text-xl'>From $199/month or $999</p>
        </div>
      </div>
    </section>
  );
}
