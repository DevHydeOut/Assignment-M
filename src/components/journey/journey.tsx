'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/app/page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
    const journeyOuterRef = useRef(null);
    const headingRef = useRef(null);
    const mediaRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: journeyOuterRef.current,
                    start: "top 70%",
                    end: "top 30%",
                    scrub: false,
                    markers: false,
                }
            });

            timeline.fromTo(
                headingRef.current,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.3,
                    ease: "back.out(1.5)",
                },
                0
            );

            timeline.fromTo(
                mediaRef.current,
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: "power2.out",
                },
                0.2
            );

            timeline.fromTo(
                imageRef.current,
                {
                    opacity: 0,
                    filter: "blur(10px) brightness(0.8)",
                },
                {
                    opacity: 1,
                    filter: "blur(0px) brightness(1)",
                    duration: 1.2,
                    ease: "power2.inOut",
                },
                0.3
            );

            gsap.to(mediaRef.current, {
                y: -15,
                duration: 2.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 1.8,
            });

            gsap.to(imageRef.current, {
                duration: 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 1.8,
            });
        }, journeyOuterRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.journeyOuter} ref={journeyOuterRef}>
            <div className={`${styles.journeyInner} ${styles.inner}`}>
                <div className={styles.journeyHeading} ref={headingRef}>
                    <h3 className={styles.journeyH3}>
                        Begin your Mentorship<br /> Journey in
                        <span className={styles.headingHighlight}> 5 steps</span>
                    </h3>
                </div>
                <div className={styles.journeyMedia} ref={mediaRef}>
                    <Image 
                        ref={imageRef}
                        src="/journey-bg.png" 
                        className={styles.journeyImage}
                        alt="Journey Media" 
                        width={940} 
                        height={570} 
                    />
                </div>
            </div>
        </section>
    );
}