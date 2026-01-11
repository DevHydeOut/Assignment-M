'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "@/app/page.module.css"; 
import MobileMenu from "./mobileMenu";


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <Image src="/logo.svg" className={styles.logo} alt="Logo" width={120} height={33} />
        <div className={styles.navLinks}>
          <ul className={styles.navUl}>
            <li className={styles.navLi}>
              <a href="">For Institutions</a>
            </li>
            <li className={styles.navLi}>
              <a href="">Become a Mentor</a>
            </li>
          </ul>
          <a href="" className={styles.navButton}>
            Login
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.621 4.60555L3.125 16.0614L3.93461 16.875L15.4306 5.41913L14.621 4.60555Z" fill="currentColor"/>
              <path d="M15.6588 14.3656C13.2952 11.3574 13.1116 7.06321 15.3146 3.92872C15.2687 3.88279 16.0374 4.69799 16.0259 4.68651C12.9395 6.84506 8.63687 6.64987 5.67664 4.28465L6.72075 3.125C8.86634 5.61652 12.8248 5.68541 15.4178 3.8139C15.4064 3.8139 16.1866 4.60614 16.1292 4.57169C13.9263 6.97136 14.1787 11.277 16.875 13.1715L15.6473 14.377L15.6588 14.3656Z" fill="currentColor"/>
            </svg>
          </a>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}