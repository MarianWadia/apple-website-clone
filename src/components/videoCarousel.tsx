"use client";
import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg, replayImg } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, {
	ElementRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

type videoType = {
	isEnd: boolean;
	startPlay: boolean;
	isLastVideo: boolean;
	isPlaying: boolean;
	videoId: number;
};
export default function VideoCarousel() {
	const videoRef = useRef<(HTMLSpanElement | HTMLVideoElement | null)[]>([]);
	const videoSpanRef = useRef<(React.LegacyRef<HTMLSpanElement> | null)[]>([]);
	const videoDivRef = useRef<(React.LegacyRef<HTMLSpanElement> | null)[]>([]);

	const [video, setVideo] = useState<videoType>({
		videoId: 0,
		isEnd: false,
		startPlay: true,
		isLastVideo: false,
		isPlaying: false,
	});

	const [loadedData, setLoadedData] = useState<
		React.SyntheticEvent<HTMLVideoElement, Event>[]
	>([]);
	const { videoId, isEnd, startPlay, isLastVideo, isPlaying } = video;

	useGSAP(() => {
		gsap.to("#video", {
			scrollTrigger: {
				trigger: "#video",
				toggleActions: "restart none none none",
			},
			onComplete: () => {
				setVideo((prev) => ({ ...prev, isPlaying: true, startPlay: true }));
			},
		});
	}, []);
	const handleProcess = useCallback(
		(type: string, i = 0) => {
			switch (type) {
				case "video-end":
					setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
					break;
				case "video-last":
					setVideo((prev) => ({ ...prev, isLastVideo: true }));
					break;
				case "video-reset":
					setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
					break;
				case "play":
					setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
				default:
					return video;
			}
		},
		[video]
	);

	useEffect(() => {
		if (loadedData.length > 3) {
			if (!isPlaying) {
				(videoRef.current[videoId] as HTMLVideoElement)?.pause();
			} else {
				startPlay && (videoRef.current[videoId] as HTMLVideoElement)?.play();
			}
		}
	}, [isPlaying, startPlay, loadedData, videoId]);

	const handleLoadedData = useCallback(
		(e: React.SyntheticEvent<HTMLVideoElement, Event>, i: number) => {
			setLoadedData((prev) => [...prev, e]);
		},
		[]
	);

	useEffect(() => {
		let currentProgress = 0;
		let span = videoSpanRef.current;
        console.log('span video condition before')
        if (span[videoId]) {
			// animate the progress of the video
            console.log('span video condition true')
			let anim = gsap.to(span[videoId], {
				onUpdate: () => {
					const progress = Math.ceil(anim.progress() * 100);
					if (currentProgress != progress) {
						currentProgress = progress;
						gsap.to(videoDivRef.current[videoId], {
							width: 80
						});
					}
				},
				onComplete: () => {},
			});
		}
        console.log('span video condition false')
	}, [videoId, startPlay]);
	return (
		<>
			<div className="w-full flex flex-row items-center">
				{hightlightsSlides.map((slide, i) => (
					<div key={slide.id} id="slider" className="sm:pr-20 pr-10">
						<div className="video-carousel_container">
							<div className="w-full flex-center h-full bg-black overflow-hidden rounded-3xl">
								<video
									src={slide.videoSrc}
									playsInline
									muted
									autoPlay
									preload="auto"
									id={`video`}
									onLoadedMetadata={(e) => {
										handleLoadedData(e, i);
									}}
									ref={(el) => {
										videoRef.current[i] = el;
									}}
									onPlay={() => {
										setVideo((prev) => ({
											...prev,
											isPlaying: true,
										}));
									}}
								/>
								<div className="flex flex-col gap-4 z-10 absolute top-12 left-[5%]">
									{slide.textLists.map((text, i) => (
										<p key={i} className="md:text-2xl text-xl font-medium">
											{text}
										</p>
									))}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="relative mt-10 flex-center">
				<div className="py-5 px-7 bg-gray-300 flex-center backdrop-blur rounded-full">
					{videoRef.current.map((_, i) => (
						<span
							key={i}
							ref={videoDivRef.current[i]}
							className={`mx-2 w-3 h-3 bg-gray-100 rounded-full relative cursor-pointer`}
						>
							<span
								className="absolute h-full w-full rounded-full"
								ref={videoSpanRef.current[i]}
							/>
						</span>
					))}
				</div>
				<button className="control-btn">
					<Image
						src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
						width={20}
						height={20}
						alt={
							isLastVideo
								? "replay icon"
								: isPlaying
								? "pause icon"
								: "play icon"
						}
						onClick={
							isLastVideo
								? () => handleProcess("video-reset")
								: isPlaying
								? () => handleProcess("pause")
								: () => handleProcess("play")
						}
					/>
				</button>
			</div>
		</>
	);
}
