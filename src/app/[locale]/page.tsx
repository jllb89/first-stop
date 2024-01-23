import styles from './page.module.css';
import initTranslations from '../i18n';
import TranslationsProvider from '../../components/TranslationsProvider';
import Navbar from '../../components/Navbar';
import Services from '../../components/Services';
import ContactForm from '../../components/ContactForm';

const i18nNamespaces = ['home'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.navbarWrapper}>
            <Navbar />
          </div>
          <div className={styles.headerContent}>
            <img src="/svg/fs-logo2.svg" alt="Logo" width="300" height="200" />
            <p className={styles.headerText}>{t('subheader')}</p>
          </div>
        </header>
        <section id="services"> {/* Add this line */}
          <Services />
        </section>
        <section id="contact"> {/* Add this line */}
          <div className={styles.contact}>
            <p className={styles.contactText}>{t('contact-title')}</p>
          </div>
          <ContactForm />
        </section>
        <div className={styles.footer}>
            <img src="/svg/fs-logo2.svg" alt="Logo" width="100" height="50" />
        </div>
      </main>
    </TranslationsProvider>
  );
}