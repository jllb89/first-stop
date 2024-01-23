'use client';

import React, { useState, useEffect } from 'react'; // Import useEffect
import { useTranslation } from 'react-i18next';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const servicesTitleElement = document.querySelector("." + styles.servicesTitle);
        if (servicesTitleElement) {
            const elementHeight = servicesTitleElement.offsetHeight;
            // ... rest of your code
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = t('name-required');
        }
        if (!formData.email.match(/[^@\s]+@[^@\s]+\.[^@\s]+/)) {
            errors.email = t('invalid-email-address');
        }
        if (!formData.message.trim()) {
            errors.message = t('message-required');
        }
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setIsSubmitted(true);
            // Here you would typically handle the form submission (e.g., send data to an API)
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <>
            {!isSubmitted ? (
                <section className={styles.contactFormSection}>
                    <div className={styles.contactFormText}>
                        <p>{t('contact-description')}</p>
                    </div>
                    <div className={styles.contactFormFields}>
                        <form onSubmit={handleSubmit}>
                            {/* Name input */}
                            <label htmlFor="name">{t('name')}</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                            {formErrors.name && <p className={styles.errorText}>{formErrors.name}</p>}

                            {/* Email input */}
                            <label htmlFor="email">{t('email')}</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                            {formErrors.email && <p className={styles.errorText}>{formErrors.email}</p>}

                            {/* Phone input */}
                            <label htmlFor="phone">{t('phone')}</label>
                            <div className={styles.phoneContainer}>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>

                            {/* Message textarea */}
                            <label htmlFor="message">{t('message')}</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
                            {formErrors.message && <p className={styles.errorText}>{formErrors.message}</p>}

                            {/* Submit button */}
                            <button type="submit">{t('send')}</button>
                        </form>
                    </div>
                </section>
            ) : (
                <section className={styles.contactFormSection}>
                    <p>{t('form-submitted-message')}</p>
                </section>
            )}
        </>
    );
}
