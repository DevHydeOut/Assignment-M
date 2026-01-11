"use client"

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/app/page.module.css';
import FAQ from '@/components/faq/faq';

gsap.registerPlugin(ScrollTrigger);

const TabSection = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const outerTabRef = useRef(null);
  const headingRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  const tab1 = [
    {
      question: "How do I book a mentorship call?",
      answer: "You can book a mentorship call by logging into mentorunion.org, selecting your preferred mentor using filters like domain, and confirming an available slot. Booking is instant, designed to make real guidance just a few clicks away."
    },
    {
      question: "Can I book more than one call at a time?",
      answer: "Yes, you can book multiple mentorship calls. Simply select different time slots or mentors based on your needs."
    },
    {
      question: "I can't find a mentor in my domain. What should I do?",
      answer: "If you can't find a mentor in your specific domain, try broadening your search criteria or contact our support team for assistance in finding the right mentor."
    },
    {
      question: "I have credits, but can't book a session. Why?",
      answer: "If you can't find a mentor in your specific domain, try broadening your search criteria or contact our support team for assistance in finding the right mentor."
    },
    {
      question: "Can I reschedule a session?",
      answer: "If you can't find a mentor in your specific domain, try broadening your search criteria or contact our support team for assistance in finding the right mentor."
    },
    {
      question: "What's the cancellation policy?",
      answer: "If you can't find a mentor in your specific domain, try broadening your search criteria or contact our support team for assistance in finding the right mentor."
    },
  ];

  const tab2 = [
    {
      question: "I can't find a mentor in my domain. What should I do?",
      answer: "Try expanding your search using the advanced filters — explore by domain, expertise, or related areas of interest. If you still don't find a fit, reach out to the MentorUnion team info@mentorunion.org, and we'll guide you to the right mentor."
    },
    {
      question: "I have credits but can't book a session. Why?",
      answer: "Yes, you can book multiple mentorship calls. Simply select different time slots or mentors based on your needs."
    },
    {
      question: "I can't find a mentor in my domain. What should I do?",
      answer: "If you can't find a mentor in your specific domain, try broadening your search criteria or contact our support team for assistance in finding the right mentor."
    },
    {
      question: "I can't find a mentor in my domain. What should I do?",
      answer: "If you can't find a mentor in your specific domain, try broadening your search criteria or contact our support team for assistance in finding the right mentor."
    }
  ];
  
  const tab3 = [
    {
      question: "What if my mentor doesn't have open slots?",
      answer: "Mentors can get fully booked at times. You can request up to three slots directly from their profile, and they'll confirm or release availability."
    },
    {
      question: "What happens if my mentor cancels or doesn't show up?",
      answer: "Your credit will be returned, and you can rebook with the same mentor or choose another."
    },
    {
      question: "Can I share feedback about my mentor or session?",
      answer: "Yes. After every session, you'll see a quick feedback form to rate your experience and share comments."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: outerTabRef.current,
            start: "top 70%",
            end: "top 50%",
            scrub: false,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        sidebarRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: outerTabRef.current,
            start: "top 70%",
            end: "top 50%",
            scrub: false,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: outerTabRef.current,
            start: "top 70%",
            end: "top 50%",
            scrub: false,
            markers: false,
          },
        }
      );
    }, outerTabRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.outerTab} ref={outerTabRef}>
      <div className={styles.innerTab}>
        <div className={styles.tabHeading} ref={headingRef}>
          <h3 className={styles.tabH3}>
            Frequently Asked<br/>
            <span className={styles.headingHighlight}>Questions</span>
          </h3>
        </div>
        <div className={styles.tabContainer}>
          <div className={styles.tabSidebar} ref={sidebarRef}>
            <ul className={styles.tabContentUl}>
              <li className={`${styles.tabContentLi} ${activeTab === 'tab1' ? styles.active : ''}`} onClick={() => setActiveTab('tab1')}>
                  Bookings & Rescheduling
              </li>
              
              <li className={`${styles.tabContentLi} ${activeTab === 'tab2' ? styles.active : ''}`} onClick={() => setActiveTab('tab2')}>
                  Tech Support & Navigation
              </li>
              
              <li className={`${styles.tabContentLi} ${activeTab === 'tab3' ? styles.active : ''}`} onClick={() => setActiveTab('tab3')}>
                  Mentor, Feedback & Policies
              </li>
            </ul>
          </div>

          <div className={styles.tabContent} ref={contentRef}>
            
            {activeTab === 'tab1' && (
              <div className={styles.tabContentInner}>
                <FAQ items={tab1} />
              </div>
            )}
            {activeTab === 'tab2' && (
              <div className={styles.tabContentInner}>
                <FAQ items={tab2} />
              </div>
            )}
            {activeTab === 'tab3' && (
              <div className={styles.tabContentInner}>
                <FAQ items={tab3} />
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default TabSection;