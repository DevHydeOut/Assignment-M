"use client";
import { useState } from "react";
import styles from "@/app/page.module.css";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";



const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={styles.mobileMenu}>

        <RxHamburgerMenu onClick={openMenu} className={styles.hamburgerBtn} />

        <nav className={`${styles.menu} ${isOpen ? styles.active : ""}`}>
            <div className={styles.mobileHeader}>
                <Image src="/logo.svg" className={styles.logo} alt="Logo" width={120} height={33} />
                <RxCross2 onClick={closeMenu} className={styles.closeBtn} />
            </div>
            <ul className={styles.mobileNavUl}>
                <li className={styles.mobileNavLi}><a href="">Home</a></li>
                <li className={styles.mobileNavLi}><a href="">For Institutions</a></li>
                <li className={styles.mobileNavLi}><a href="">Become a Mentor</a></li>
            </ul>
        </nav>
    </div>
  );
};

export default MobileMenu;
