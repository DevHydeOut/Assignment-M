"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/app/page.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Logo() {
    const logoOuterRef = useRef<HTMLElement>(null);
    const logoHeadingRef = useRef<HTMLDivElement>(null);
    const logoGridRef = useRef<HTMLDivElement>(null);

    const logoSequences = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7],
        [5, 6, 7, 8],
        [6, 7, 8, 9],
        [7, 8, 9, 10],
        [8, 9, 10, 11],
        [9, 10, 11, 12],
        [10, 11, 12, 13],
        [11, 12, 13, 14],
        [12, 13, 14, 15],
        [13, 14, 15, 16],
        [14, 15, 16, 17],
        [15, 16, 17, 18],
        [17, 18, 19, 20],
        [18, 19, 20, 21],
        [19, 20, 21, 23],
        [20, 21, 22, 23],
        [21, 22, 23, 24],
        [22, 23, 24, 1],
        [23, 24, 1, 2],
        [24, 1, 2, 3],
        [1, 2, 3, 4],
    ];

    const faces = ['front', 'right', 'back', 'left'];

    useEffect(() => {
        if (!logoOuterRef.current) return;

        const ctx = gsap.context(() => {

            if (logoHeadingRef.current) {
                gsap.fromTo(
                    logoHeadingRef.current,
                    {
                        opacity: 0,
                        y: 40,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: logoOuterRef.current,
                            start: "top 70%",
                            end: "top 50%",
                            scrub: false,
                            markers: false,
                        },
                    }
                );
            }

            if (logoGridRef.current) {
                const logoContainers = logoGridRef.current.querySelectorAll(`.${styles.logoContainer}`);
                
                gsap.fromTo(
                    logoContainers,
                    {
                        opacity: 0,
                        scale: 0.7,
                        y: 40,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "back.out(1.5)",
                        stagger: {
                            amount: 0.8,
                            from: "start",
                        },
                        scrollTrigger: {
                            trigger: logoOuterRef.current,
                            start: "top 70%",
                            end: "top 30%",
                            scrub: false,
                            markers: false,
                        },
                    }
                );

                logoContainers.forEach((container) => {
                    const logoBox = container.querySelector(`.${styles.logoBox}`) as HTMLElement;
                    
                    if (logoBox) {
                        container.addEventListener("mouseenter", () => {
                            gsap.to(logoBox, {
                                rotateY: 360,
                                duration: 0.8,
                                ease: "power2.inOut",
                            });

                            gsap.to(container, {
                                scale: 1.08,
                                boxShadow: "0 20px 40px rgba(57, 181, 215, 0.3)",
                                duration: 0.3,
                                ease: "power2.out",
                            });
                        });

                        container.addEventListener("mouseleave", () => {
                            gsap.to(container, {
                                scale: 1,
                                boxShadow: "none",
                                duration: 0.3,
                                ease: "power2.out",
                            });
                        });
                    }
                });
            }
        }, logoOuterRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section className={styles.logoOuter} ref={logoOuterRef}>
            <div className={`${styles.logoInner} ${styles.inner}`}>
                <div className={styles.logoHeading} ref={logoHeadingRef}>
                    <h2 className={styles.logoH2}>
                        Gain Access to Mentors from<br/>
                        <span className={styles.headingHighlight}>Global Brands</span>
                    </h2>
                </div>
                <div className={styles.logoGrid} ref={logoGridRef}>
                    {logoSequences.map((sequence, boxIndex) => (
                        <div key={boxIndex} className={styles.logoContainer}>
                            <div className={styles.logoBox}>
                                {sequence.map((logoNum, faceIndex) => (
                                    <div 
                                        key={faceIndex}
                                        className={`${styles.boxFace} ${styles[faces[faceIndex]]}`}
                                    >
                                        <Image 
                                            src={`/icons/${logoNum}.png`}
                                            className={styles.logoImage}
                                            alt="Logo"
                                            width={206}
                                            height={89}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}