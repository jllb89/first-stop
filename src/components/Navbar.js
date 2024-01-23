'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '../../i18nConfig';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const { t } = useTranslation();
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
  
      setNavbarVisible(isScrollingUp || currentScrollY === 0);
      lastScrollY = currentScrollY;
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleChange = (newLocale) => {
    // set cookie for next-i18n-router
    const days = 5;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <nav className={`${styles.navbar} ${navbarVisible ? '' : styles.hide}`}>
    <div>
        <Image src="/svg/fs-logo.svg" alt="Logo" width={30} height={30} />
      </div>
      <div>
        <Link href="#services" className={styles.navLink}>{t("nav-1")}</Link>
        <Link href="#contact" className={styles.navLink}>{t("nav-2")}</Link>
        <div>
          <button className={styles.button} onClick={() => handleChange('en')}>EN</button>
          /
          <button className={styles.button} onClick={() => handleChange('es')}>ES</button>
        </div>
      </div>

    </nav>
  );
}

