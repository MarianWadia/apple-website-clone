"use client"
import { hightlightsSlides } from '@/constants'
import { pauseImg, playImg, replayImg } from '@/utils'
import gsap from 'gsap'
import Image from 'next/image'
import React, { ElementRef, useCallback, useEffect, useRef, useState } from 'react'


type videoType = {
    isEnd: boolean,
    startPlay: boolean,
    isLastVideo: boolean,
    isPlaying: boolean,
    videoId: number,  
}
export default function VideoCarousel() {
    const videoRef = useRef<(HTMLSpanElement | HTMLVideoElement | null)[]>([])
    const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([])
    const videoDivRef = useRef([])

    const [video, setVideo] = useState<videoType>({
        videoId: 0,
        isEnd: false,
        startPlay: true,
        isLastVideo: false,
        isPlaying: false
    })

    const {videoId, isEnd, startPlay, isLastVideo, isPlaying} = video
    const [loadedData, setLoadedData] = useState([])
    const handleProcess = useCallback((action : string)=>{

    },[])
    useEffect(()=>{
        if(loadedData.length > 3){
            if(!isPlaying){
                (videoRef.current[videoId] as HTMLVideoElement)?.pause()
            }else{
                startPlay && (videoRef.current[videoId] as HTMLVideoElement)?.play()
            }
        }
    },[isPlaying, startPlay, loadedData, videoId])

    useEffect(()=>{
        const currentProgress = 0;
        let span = videoSpanRef.current;
        if(span[videoId]){
            // animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: ()=>{},
                onComplete: ()=>{}
            })
        }
    }, [videoId, startPlay])
  return (
    <>
        <div className='w-full flex flex-row items-center'>
            {hightlightsSlides.map((slide, i) =>(
                <div key={slide.id} id='slider' className='sm:pr-20 pr-10'>
                    <div className='video-carousel_container'>
                        <div className='w-full flex-center h-full bg-black overflow-hidden rounded-3xl'>
                            <video 
                                src={slide.videoSrc} 
                                playsInline 
                                muted 
                                autoPlay 
                                preload='auto' 
                                id={`video ${videoId}`}
                                ref={(el) => { videoRef.current[i] = el; }}
                                onPlay={()=>{
                                    setVideo((prev)=>({
                                        ...prev,
                                        isPlaying: true
                                    }))
                                }}
                            />
                            <div className='flex flex-col gap-4 z-10 absolute top-12 left-[5%]'>
                                {slide.textLists.map((text, i) =>(
                                    <p key={i} className='md:text-2xl text-xl font-medium'>{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='relative mt-10 flex-center'>
            <div className='py-5 px-7 bg-gray-300 flex-center backdrop-blur rounded-full'>
                {videoRef.current.map((_, i)=>(
                    <span 
                        key={i} 
                        ref={(el)=>{videoRef.current[i] = el}}
                        className='mx-2 w-3 h-3 bg-gray-100 rounded-full relative cursor-pointer'
                    >
                        <span className='absolute h-full w-full rounded-full' ref={(el)=>{videoSpanRef.current[i] = el}} />
                    </span>
                ))}
            </div>
            <button onClick={isLastVideo ? ()=>handleProcess('video-reset') : isPlaying ? ()=>handleProcess('pause') : ()=>handleProcess('play')} className='control-btn'>
                <Image 
                    src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg} 
                    width={20} 
                    height={20} 
                    alt={isLastVideo ? 'replay icon' : isPlaying ? 'pause icon' : 'play icon'} 
                />
            </button>
        </div>
    </>
  )
}
