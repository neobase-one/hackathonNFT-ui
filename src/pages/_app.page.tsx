import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextPage } from 'next';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { Homemade_Apple } from 'next/font/google';
import Head from 'next/head';
import { ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';
import { WagmiConfig } from 'wagmi';
import '~assets/styles/theme.css';
import { ThemeProvider } from '~providers';
import { chains, reactQueryClient, wagmiConfig } from '~setup';

const homemadeAppleFont = Homemade_Apple({
  subsets: ['latin'],
  variable: '--font-homemade-apple',
  weight: '400',
});

const AppPage = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { t } = useTranslation();

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <>
      <NextSeo
        title={t('general:default_title')}
        titleTemplate={t('general:title_template')}
        description="Lorem Ipsum is sample text"
      />
      <Head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
        />
      </Head>
      <style
        jsx
        global>
        {`
          :root {
            --homemade-apple-font: ${homemadeAppleFont.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={reactQueryClient}>
        <main className="grid min-h-screen grid-cols-[100%] grid-rows-[auto_1fr_auto]">
          {getLayout(<Component {...pageProps} />)}
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster
        toastOptions={{
          style: {
            background: 'rgb(236,231,204)',
            color: 'black',
          },
        }}
      />
      {/* Kept for later */}
      {/* <Analytics debug={false} /> */}
    </>
  );
};

const AppPageWrapper = ({ locale, ...props }: AppPropsWithLayout) => {
  return (
    <ThemeProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColorForeground: 'black',
            accentColor: 'var(--color-primary)',
          })}
          showRecentTransactions>
          <AppPage
            {...props}
            locale={locale}
          />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  locale?: string;
};

export default appWithTranslation(AppPageWrapper);
