import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import '../app/globals.css';
import LoadingBar from 'react-top-loading-bar';
import { AuthProvider } from '@saas-ui/auth';
import { SaasProvider } from '@saas-ui/react';
import { Layout } from '../app/(landing)/components/layout';
import theme from '../app/(landing)/theme';
import Head from 'next/head';
import { ThemeProvider } from '../app/(landing)/components/layout/ThemeContext';
import { DataProvider } from '@/app/(landing)/components/layout/dataContext';

function MyApp({ Component, pageProps }: AppProps) {
  const { announcement, header, footer } = pageProps;
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    // START VALUE - WHEN LOADING WILL START
    router.events.on('routeChangeStart', () => {
      setProgress(40);
    });

    // COMPLETE VALUE - WHEN LOADING IS FINISHED
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });
  }, []);

  return (
    <SaasProvider theme={theme}>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <Layout
              announcementProps={announcement}
              headerProps={header}
              footerProps={footer}
            >
              <Head>
                <title>Puppy Love</title>
                <link rel="shortcut icon" href="/pclub-logo.png" />
                <script
                  src="https://www.google.com/recaptcha/api.js"
                  async
                  defer
                ></script>
              </Head>
              <LoadingBar
                color="rgb(180, 130, 251)"
                progress={progress}
                waitingTime={400}
                onLoaderFinished={() => {
                  setProgress(0);
                }}
              />
              <Component {...pageProps} />
            </Layout>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </SaasProvider>
  );
}

export default MyApp;
