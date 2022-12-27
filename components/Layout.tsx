import Head from 'next/head';

import FloatWishList from './FloatWishList';
import Header from './Header';

interface ChildrenProps {
  children: React.ReactNode;
}

type Props = { floatWishlist?: boolean } & ChildrenProps;

function Layout({ children, floatWishlist }: Props) {
  return (
    <>
      <Head>
        <title>GENTLEMONSTER</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      {!floatWishlist && <FloatWishList />}

      <main className='h-[100vh]'>{children}</main>
      <footer className='flex h-20 items-center justify-center shadow-inner'>
        <p>© 2022 GENTLE MONSTER</p>
      </footer>
    </>
  );
}

export default Layout;
