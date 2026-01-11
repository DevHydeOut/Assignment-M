'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/app/page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function LineReveal() {
    const sectionRef = useRef<HTMLElement>(null);
    const blackTextRef = useRef<HTMLHeadingElement>(null);
    const whiteOverlayRef = useRef<HTMLDivElement>(null);
    const whiteTextRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=200%',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            tl.fromTo(
                blackTextRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 2 }
            )
            .to({}, { duration: 1.5 })
            .fromTo(
                whiteOverlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.5 }
            )
            .to(
                blackTextRef.current,
                { opacity: 0, y: -50, duration: 1 },
                '<0.5'
            )
            .to({}, { duration: 0.5 })
            .fromTo(
                whiteTextRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1 }
            );

            const rightSvg = sectionRef.current?.querySelector('.rightSvg');
            const rightPath = rightSvg?.querySelector('path') as SVGPathElement | null;

            if (rightPath) {
                const pathLength = rightPath.getTotalLength();
                gsap.set(rightPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
                gsap.to(rightPath, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=200%',
                        scrub: 1,
                    }
                });
            }

            const leftSvg = sectionRef.current?.querySelector('.leftSvg');
            const leftPath = leftSvg?.querySelector('path') as SVGPathElement | null;

            if (leftPath) {
                const pathLength = leftPath.getTotalLength();
                gsap.set(leftPath, { strokeDasharray: pathLength, strokeDashoffset: -pathLength });
                gsap.to(leftPath, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=80%',
                        scrub: 1,
                    }
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.LineRevealOuter}>
            <div className={styles.LineRevealBlack}>
                <h2 ref={blackTextRef} className={styles.LineRevealH2}>
                    Still Guessing Your Way Through Career Choices, Alone?
                </h2>
            </div>

            <div ref={whiteOverlayRef} className={styles.LineRevealWhite}>
                <h2 ref={whiteTextRef} className={styles.LineRevealH2}>
                    Now you don't have to!
                </h2>
            </div>
            
            <div className={`${styles.LineRevealSvg} ${styles.LineRevealSvgLeft} leftSvg`}>
                <svg width="1119" height="664" viewBox="0 0 1119 664" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path opacity="0.8" d="M-12.0155 364.33C113.302 459.148 238.89 555.564 367.162 637.683C374.506 642.385 437.024 689.981 412.865 638.169C377.133 561.535 321.533 501.845 280.416 430.48C238.662 358.01 235.607 313.499 296.769 296.233C392.482 269.212 498.318 284.585 598.684 282.814C629.343 282.273 692.447 288.813 700.446 235.812C709.58 175.291 653.747 104.44 632.279 52.2774C581.221 -71.7834 777.92 -61.5358 971.03 -25.8782C1122.12 2.01992 1116.53 -250 1116.53 -250" stroke="url(#paint0_linear_10_2430)" strokeWidth="3" strokeLinecap="round"/>
                    <defs>
                        <linearGradient id="paint0_linear_10_2430" x1="-201.475" y1="374.596" x2="1028.69" y2="33.2533" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#39B6D8"/>
                            <stop offset="0.5" stopColor="#F7D344"/>
                            <stop offset="1" stopColor="#E38330"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className={`${styles.LineRevealSvg} rightSvg`}>
                <svg width="3627" height="1845" viewBox="0 0 3627 1845" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path opacity="0.8" d="M3625 2.51673C3520.89 3.25418 2301.59 -27.6565 2545.48 291.69C2603.02 367.023 2711.57 433.804 2735.96 559.954C2794.88 864.817 1952.69 609.089 1860.62 856.348C1805.38 998.39 1773.66 1064.9 1675.19 1152.73C1443.47 1359.42 832.114 979.421 891.043 1284.28C915.428 1410.43 1023.98 1477.21 1081.52 1552.55C1325.41 1871.89 106.113 1840.98 2 1841.72" stroke="url(#paint0_linear_11_2432)" strokeWidth="7" strokeLinecap="round"/>
                    <defs>
                        <linearGradient id="paint0_linear_11_2432" x1="1740.95" y1="856.377" x2="453.714" y2="1780.99" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#39B6D8"/>
                            <stop offset="0.5" stopColor="#F7D344"/>
                            <stop offset="1" stopColor="#E38330"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
}