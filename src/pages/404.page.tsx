import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import { GeneralLayout } from '~layouts';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <NextSeo
        title={t('404:title')}
        noindex
      />
      {t('404:not_found_label')}
    </div>
  );
};

NotFoundPage.getLayout = (page: ReactElement) => {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18next = await serverSideTranslations(locale as string, ['404']);

  return {
    props: {
      ...i18next,
    },
  };
};

export default NotFoundPage;
