import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from 'react-icons/hi';
import { signIn, signOut, useSession } from 'next-auth/react';

import useQuantity from '../hooks/useQuantity';
import SearchModal from './SearchModal';

function Header() {
  const history = useRouter();
  const { data: session, status } = useSession();
  const { cartQuantity } = useQuantity();

  const [showModal, setShowModal] = useState(false); // search 모달 show
  const [isNavOpen, setIsNavOpen] = useState(false);

  const signin = () => {
    !session && history.push('/login');
  };

  return (
    <div>
      {history.pathname === '/success' ? (
        <header className='mx-auto max-w-xl'>
          <Link href='/'>
            <div className='relative ml-4 h-16 w-48 cursor-pointer transition lg:hidden'>
              <Image
                alt='로고'
                src='https://images.surfacemag.com/app/uploads/2017/06/gentlemonsterlogo-1024x83.png'
                objectFit='contain'
                layout='fill'
              />
            </div>
          </Link>
        </header>
      ) : (
        <header className='top-0 flex h-16 w-full items-center justify-between bg-[#fff] py-4 px-5'>
          <div className='flex items-center justify-center'>
            <Link href='/'>
              <div className='relative w-48 cursor-pointer opacity-100 transition hover:opacity-75'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 166 15.9'>
                  <path d='M7.3 5.3V4.1c0-1.3-.6-1.9-2.1-1.9-1.6 0-2.2.6-2.2 1.9v7.7c0 1.3.5 1.9 2.1 1.9 1.5 0 2.2-1 2.2-2.5V9.4H4.8V7.2h5.5v8.5H7.7v-1.2c-.5.7-1.4 1.5-3.5 1.5C1.5 16 0 14.9 0 11.3V4.8C0 1.3 2.1 0 5.2 0c3 0 5.1 1.4 5.1 4.1v1.2h-3zm14.9-5v2.3h-6v3.9h5.4v2.2h-5.4v4.7h6v2.3h-9V.3h9zm13.5 0v15.3H32L28 3.9v11.7h-3V.3h3.7l4 11.6V.3h3zm12.5 0v2.3h-3.8v13.1h-3V2.6h-3.8V.3h10.6zm4.9 13.1H59v2.3h-8.9V.3h3v13.1zM69.9.3v2.3h-6v3.9h5.4v2.2h-5.4v4.7h6v2.3h-9V.3h9zM91 .3v15.3h-3V3.9l-2.6 11.8H83L80.5 3.8v11.9h-3V.3h4.2L84.2 12 86.7.3H91zM104.1 5v5.9c0 3.7-1.8 5-5.1 5s-5.1-1.2-5.1-5V5c0-3.7 1.8-5 5.1-5s5.1 1.3 5.1 5zm-3-.7c0-1.6-.6-2.1-2.1-2.1-1.6 0-2.1.5-2.1 2.1v7.4c0 1.6.6 2 2.1 2 1.6 0 2.1-.5 2.1-2V4.3zm16.7-4v15.3h-3.7l-4-11.7v11.7h-3V.3h3.7l4 11.6V.3h3zm12.3 3.6v.9h-3V4c0-1.3-.2-1.8-1.7-1.8-1.4 0-1.7.6-1.7 1.6 0 .9.2 1.3 1 1.8l2.9 1.9c1.6 1 2.5 1.6 2.5 4.4 0 2.7-1.8 4-4.7 4-3.5 0-4.9-1.2-4.9-4v-1.3h3v1.1c0 1.6.5 2 1.9 2s1.7-.6 1.7-1.7-.2-1.5-1.2-2.2L123 7.9c-1.8-1.2-2.4-1.8-2.4-4 0-1.9 1.1-3.8 4.7-3.8 3.7-.1 4.8 1.5 4.8 3.8M142.2.3v2.3h-3.8v13.1h-3V2.6h-3.8V.3h10.6zm10.9 0v2.3h-6v3.9h5.4v2.2h-5.4v4.7h6v2.3h-9V.3h9zm12.4 10.2v3.3c0 .8.2 1.5.6 1.9H163c-.3-.4-.5-1.1-.5-1.9v-3.3c0-1.2-.5-1.6-1.6-1.6h-2.1v6.8h-3V.3h5.5c4 0 4.5 2.2 4.5 4.3 0 1.7-.9 2.9-3.1 3.3 1.9.1 2.8 1.1 2.8 2.6zm-4.6-3.9c1.6 0 1.9-.7 1.9-2s-.2-2-1.9-2h-2.1v4h2.1z' />
                </svg>
              </div>
            </Link>
          </div>

          <div className='DESKTOP-MENU hidden flex-1 items-center justify-center space-x-8 lg:flex'>
            <a className='headerLink' href='#!'>
              선글라스
            </a>
            <a className='headerLink' href='#!'>
              안경
            </a>
            <a className='headerLink' href='#!'>
              매장보기
            </a>
            <a className='headerLink' href='#!'>
              수리 서비스
            </a>
          </div>

          <div className='flex items-center justify-center gap-x-4'>
            <Link href='/cart'>
              <div className='relative cursor-pointer'>
                {cartQuantity > 0 && (
                  <span className='to-white-300 from-white-500 bg-gradient-to-r absolute -right-2 -top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full text-[10px]'>
                    {cartQuantity}
                  </span>
                )}
                <HiOutlineShoppingBag className='headerIcon' />
              </div>
            </Link>
            <HiOutlineSearch
              className='headerIcon'
              onClick={() => setShowModal(true)}
            />

            <SearchModal showModal={showModal} setShowModal={setShowModal} />
            {session ? (
              <Image
                className='cursor-pointer rounded-full'
                alt='사용자 이미지'
                src={
                  session.user?.image ||
                  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                }
                width={34}
                height={34}
                onClick={() => signOut()}
              />
            ) : (
              <HiOutlineUser className='headerIcon' onClick={signin} />
            )}

            <section className='lg:hidden'>
              <div
                className='space-y-1.5'
                onClick={() => setIsNavOpen(prev => !prev)}
                role='presentation'
              >
                <span className='hambergerIcon' />
                <span className='hambergerIcon' />
                <span className='hambergerIcon' />
              </div>

              <div className={isNavOpen ? 'showMenuNav' : 'hideMenuNav'}>
                <div
                  className='absolute top-0 right-0 px-5 py-5'
                  onClick={() => setIsNavOpen(false)}
                  role='presentation'
                >
                  <svg
                    className='h-6 w-6 text-gray-600'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18' />
                    <line x1='6' y1='6' x2='18' y2='18' />
                  </svg>
                </div>

                <ul className='flex min-h-[250px] flex-col space-y-5 text-2xl font-bold'>
                  <li className='border-gray-400 uppercase'>
                    <a href='/'>선글라스</a>
                  </li>
                  <li className=' border-gray-400 uppercase'>
                    <a href='/'>안경</a>
                  </li>
                  <li className=' border-gray-400 uppercase'>
                    <a href='/'>매장보기</a>
                  </li>
                  <li className='border-gray-400 uppercase'>
                    <a href='/'>수리 서비스</a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </header>
      )}
    </div>
  );
}

export default Header;
