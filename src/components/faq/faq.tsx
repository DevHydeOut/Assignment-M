"use client"

import { useState } from 'react';
import styles from '@/app/page.module.css';


interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FAQ = ({ items }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      {items.map((item, index) => (
        <div key={index} className={styles.faqItem}>
            <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
            >
              <p>{item.question}</p>
                <span className={`${styles.icon} ${openIndex === index ? styles.iconOpen : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 8L2.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 13.5L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
            </button>
          
            <div className={`${styles.faqAnswer} ${openIndex === index ? styles.faqAnswerOpen : ''}`}>
                <div className={styles.faqAnswerContent}>
                {item.answer}
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;