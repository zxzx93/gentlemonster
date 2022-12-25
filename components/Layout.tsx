import Head from 'next/head';
import { useRouter } from 'next/router';

import FloatCart from './FloatCart';
import Header from './Header';

interface ChildrenProps {
  children: React.ReactNode;
}

function Layout({ children }: ChildrenProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>GENTLEMONSTER</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      {router.pathname !== '/success' && <FloatCart />}

      <main className=''>{children}</main>
      <footer className='flex h-20 items-center justify-center shadow-inner'>
        <p>© 2022 GENTLE MONSTER</p>
      </footer>
    </>
  );
}

export default Layout;
