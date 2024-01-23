'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';


export default function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <div>
        <Image src="/svg/fs-logo2.svg" alt="Logo" width="300" height="200" />
      </div>
      <p>{t('subheader')}</p>
    </header>
  );
}