"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/app/page.module.css";
import Orbit from "./orbit";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroOuterRef = useRef<HTMLElement>(null);
    const heroHeadingRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
    const heroBtnRef = useRef<HTMLAnchorElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!heroOuterRef.current) return;

        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: heroOuterRef.current,
                    start: "top center",
                    end: "top 20%",
                    scrub: false,
                    markers: false,
                }
            });

            if (heroTitleRef.current) {
                timeline.fromTo(
                    heroTitleRef.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
                    0
                );
            }

            if (heroSubtitleRef.current) {
                timeline.fromTo(
                    heroSubtitleRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                    0.2
                );
            }

            if (heroBtnRef.current) {
                timeline.fromTo(
                    heroBtnRef.current,
                    { opacity: 0, scale: 0.8, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)" },
                    0.4
                );

                const handleMouseEnter = () => {
                    gsap.to(heroBtnRef.current, {
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(57, 181, 215, 0.4)",
                        duration: 0.3,
                        ease: "power2.out",
                    });

                    const svg = heroBtnRef.current?.querySelector("svg");
                    if (svg) {
                        gsap.to(svg, { x: 4, duration: 0.3, ease: "power2.out" });
                    }
                };

                const handleMouseLeave = () => {
                    gsap.to(heroBtnRef.current, {
                        scale: 1,
                        boxShadow: "none",
                        duration: 0.3,
                        ease: "power2.out",
                    });

                    const svg = heroBtnRef.current?.querySelector("svg");
                    if (svg) {
                        gsap.to(svg, { x: 0, duration: 0.3, ease: "power2.out" });
                    }
                };

                heroBtnRef.current.addEventListener("mouseenter", handleMouseEnter);
                heroBtnRef.current.addEventListener("mouseleave", handleMouseLeave);
            }
        }, heroOuterRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section className={styles.heroOuter} ref={heroOuterRef}>
            <div ref={orbitRef}>
                <Orbit />
            </div>
            <div className={`${styles.heroInner} ${styles.inner}`}>
                <div className={styles.heroHeading} ref={heroHeadingRef}>
                    <h1 className={styles.heroTitle} ref={heroTitleRef}>
                        Unlock Your Potential with
                        <span className={styles.highlightText}> 1:1 Mentorship</span>
                    </h1>
                    <p className={styles.heroSubtitle} ref={heroSubtitleRef}>
                        Get real-world insights and career guidance from 650+ seasoned industry experts
                    </p>
                    <a href="" className={styles.heroBtn} ref={heroBtnRef}>
                        Browse Mentors
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.621 4.60555L3.125 16.0614L3.93461 16.875L15.4306 5.41913L14.621 4.60555Z" fill="currentColor"/>
                            <path d="M15.6588 14.3656C13.2952 11.3574 13.1116 7.06321 15.3146 3.92872C15.2687 3.88279 16.0374 4.69799 16.0259 4.68651C12.9395 6.84506 8.63687 6.64987 5.67664 4.28465L6.72075 3.125C8.86634 5.61652 12.8248 5.68541 15.4178 3.8139C15.4064 3.8139 16.1866 4.60614 16.1292 4.57169C13.9263 6.97136 14.1787 11.277 16.875 13.1715L15.6473 14.377L15.6588 14.3656Z" fill="currentColor"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}