"use client"

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/app/page.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Slide {
    id: number;
    image: string;
}

export default function Slider() {
    const sliderOuterRef = useRef<HTMLElement>(null);
    const sliderHeadingRef = useRef<HTMLDivElement>(null);
    const slidesContainerRef = useRef<HTMLDivElement>(null);
    
    const slides: Slide[] = [
        { id: 1, image: '/slider/1.png' },
        { id: 2, image: '/slider/2.png' },
        { id: 3, image: '/slider/3.png' },
        { id: 4, image: '/slider/4.png' },
        { id: 5, image: '/slider/5.png' },
        { id: 6, image: '/slider/3.png' },
        { id: 7, image: '/slider/4.png' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setloading] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [windowWidth, setWindowWidth] = useState(1200);
    const [isMounted, setIsMounted] = useState(false);

    const getSlideConfig = () => {
        if (windowWidth <= 768) {
            return { width: 250 + 32, spacing: -60 };
        } else if (windowWidth <= 1200) {
            return { width: 300 + 32, spacing: -70 };
        } else {
            return { width: 350 + 32, spacing: -80 };
        }
    };

    const config = getSlideConfig();
    const slideWidth = config.width + config.spacing;

    useEffect(() => {
        setIsMounted(true);
        setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMounted]);

    const slideDuration = 4000;

    const visibleRange = 3;
    const extendedSlides = [
        ...slides.slice(-visibleRange),
        ...slides,
        ...slides.slice(0, visibleRange), 
    ];

    useEffect(() => {
        if (!sliderHeadingRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                sliderHeadingRef.current,
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
                        trigger: sliderOuterRef.current,
                        start: "top 70%",
                        end: "top 50%",
                        scrub: false,
                        markers: false,
                    },
                }
            );
        }, sliderOuterRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!slidesContainerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                slidesContainerRef.current,
                {
                    opacity: 0,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.4,
                    ease: "power2.out",
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: sliderOuterRef.current,
                        start: "top 70%",
                        end: "top 50%",
                        scrub: false,
                        markers: false,
                    },
                }
            );
        }, sliderOuterRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!slidesContainerRef.current) return;

        const ctx = gsap.context(() => {
            const slides = slidesContainerRef.current?.querySelectorAll(`.${styles.slide}`);
            
            if (slides) {
                gsap.fromTo(
                    slides,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: {
                            amount: 0.6,
                            from: "start",
                        },
                        scrollTrigger: {
                            trigger: sliderOuterRef.current,
                            start: "top 70%",
                            end: "top 40%",
                            scrub: false,
                            markers: false,
                        },
                        delay: 0.3,
                    }
                );
            }
        }, sliderOuterRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const loadingInterval = setInterval(() => {
            setloading((prev) => {
                if (prev >= 100) {
                    return 0;
                }
                return prev + (100 / (slideDuration / 50));
            });
        }, 50);

        return () => clearInterval(loadingInterval);
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setloading(0);
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        }, slideDuration);

        return () => clearInterval(slideInterval);
    }, []);

    useEffect(() => {
        if (currentIndex === slides.length) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 500); 
        } else if (currentIndex === -1) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(slides.length - 1);
            }, 500);
        }
    }, [currentIndex, slides.length]);

    const getSlideStyle = (index: number) => {
        const adjustedCurrentIndex = currentIndex + visibleRange;
        const diff = index - adjustedCurrentIndex;
        const translateX = diff * slideWidth;
        
        const isMobile = windowWidth <= 768;
        const isTablet = windowWidth <= 1200 && windowWidth > 768;
        
        if (diff === 0) {
            return {
                transform: `translateX(${translateX}px) scale(1)`,
                opacity: 1,
                zIndex: 5,
                filter: 'brightness(1)',
            };
        }
        else if (diff === 1 || diff === -1) {
            return {
                transform: `translateX(${translateX}px) scale(${isMobile ? 0.85 : 0.9})`,
                opacity: isMobile ? 0.6 : 0.8,
                zIndex: 4,
                filter: `brightness(${isMobile ? 0.6 : 0.75})`,
            };
        }
        else if (diff === 2 || diff === -2) {
            return {
                transform: `translateX(${translateX}px) scale(0.8)`,
                opacity: isMobile ? 0.3 : 0.6,
                zIndex: 3,
                filter: `brightness(${isMobile ? 0.4 : 0.6})`,
            };
        }
        else if (diff === 3 || diff === -3) {
            return {
                transform: `translateX(${translateX}px) scale(0.8)`,
                opacity: isMobile ? 0 : 0.4,
                zIndex: 2,
                filter: 'brightness(0.5)',
            };
        }
        else {
            return {
                transform: `translateX(${translateX}px) scale(0.8)`,
                opacity: 0,
                zIndex: 1,
                filter: 'brightness(0.4)',
            };
        }
    };

    return (
        <section className={styles.sliderOuter} ref={sliderOuterRef}>
            <div className={`${styles.sliderInner} ${styles.inner}`}>
                <div className={styles.sliderHeading} ref={sliderHeadingRef}>
                    <h3 className={styles.sliderH3}>
                        Your Goals, Our Mentors<br/>
                        <span className={styles.headingHighlight}>Let's Make it Happen</span>
                    </h3>
                </div>
                <div className={styles.slider}>
                    <div className={styles.slidesContainer} ref={slidesContainerRef}>
                        {extendedSlides.map((slide, index) => {
                            const style = getSlideStyle(index);
                            const actualIndex = ((index - visibleRange) % slides.length + slides.length) % slides.length;
                            const isActive = actualIndex === (currentIndex % slides.length + slides.length) % slides.length;

                            return (
                                <div
                                    key={`${slide.id}-${index}`}
                                    className={styles.slide}
                                    style={{
                                        transform: style.transform,
                                        opacity: style.opacity,
                                        zIndex: style.zIndex,
                                        filter: style.filter,
                                        transition: isTransitioning ? 'all 0.5s ease-in-out' : 'none',
                                    }}
                                >
                                    <div className={styles.slideImageContainer}>
                                        <Image 
                                            className={styles.slideImage} 
                                            src={slide.image} 
                                            alt="Slider Image" 
                                            width={350} 
                                            height={454} 
                                        />
                                    </div>
                                    {isActive && (
                                        <div className={styles.loadingBarContainer}>
                                            <div
                                                className={styles.loadingBar}
                                                style={{
                                                    width: `${loading}%`,
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}