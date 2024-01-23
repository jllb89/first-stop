'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Services.module.css';

export default function Services() {
    const { t } = useTranslation();
    const [activeService, setActiveService] = useState(0);
    const [titleFixed, setTitleFixed] = useState(false);
    const [titleOpacity, setTitleOpacity] = useState(1); // New state variable for title opacity
    const servicesSectionRef = useRef(null);
    const servicesRef = useRef([]);
    const titleHeight = useRef(0);

    const handleScroll = () => {
        if (servicesSectionRef.current) {
            const servicesTop = servicesSectionRef.current.getBoundingClientRect().top;
            if (servicesTop <= 0 && !titleFixed) {
                setTitleFixed(true);
                const servicesTitleElement = document.querySelector('.' + styles.servicesTitle);
                if (servicesTitleElement) {
                    titleHeight.current = servicesTitleElement.offsetHeight;
                }
            } else if (servicesTop > 0 && titleFixed) {
                setTitleFixed(false);
            }

            const middleOfViewport = window.innerHeight / 2;
            servicesRef.current.forEach((service, index) => {
                if (service) {
                    const serviceMiddle = service.getBoundingClientRect().top + service.offsetHeight / 2;
                    if (serviceMiddle < middleOfViewport + 100 && serviceMiddle > middleOfViewport - 100) {
                        setActiveService(index);
                    }
                }
            });

            // Get the last service
            const lastService = servicesRef.current[servicesRef.current.length - 1];
            if (lastService) {
                const lastServiceTop = lastService.getBoundingClientRect().top;
                if (lastServiceTop <= middleOfViewport - 300) {
                    setTitleOpacity(0); // Fade out the title
                } else {
                    setTitleOpacity(1); // Show the title
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [titleFixed]);

    return (
        <section className={styles.services} ref={servicesSectionRef}>
            {titleFixed && <div style={{ height: `${titleHeight.current}px` }} />} {/* Placeholder for fixed title */}
            <div className={titleFixed ? styles.servicesTitleFixed : styles.servicesTitle} style={{ opacity: titleOpacity }}>
                <p>{t('services-title')}</p>
                {/* Dynamic logo based on active service */}
                <img 
                    src={titleFixed ? `/svg/service-${activeService + 1}-logo.svg` : "/svg/fs-logo.svg"} 
                    width={20} 
                    height={20} 
                    alt={`Service ${titleFixed ? activeService + 1 : ''} Logo`} 
                />
            </div>
            <div className={styles.servicesContainer}>
                {[1, 2, 3, 4].map((service, index) => (
                    <div key={service}
                         className={`${styles.service} ${activeService === index ? styles.active : ''}`}
                         ref={el => servicesRef.current[index] = el}>
                        <p className={styles.serviceTitle}>{t(`services-${service}`)}</p>
                        <p className={styles.serviceSubtitle}>{t(`services-subtitle-${service}`)}</p>
                        <p className={styles.serviceText}>{t(`service-${service}`)}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
