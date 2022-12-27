import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { BsCheckCircle } from 'react-icons/bs';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import CurrencyFormat from 'react-currency-format';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

import Link from 'next/link';
import Button from '../../components/Button';
import { StripeProducts } from '../../typings';
import fetchLineItems from '../../utils/fetchLineItems';
import Layout from '../../components/Layout';

interface Props {
  products: StripeProducts;
}

function Success({ products }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const sessionId = router.query.session_id;
  const { customer_details: orderAddress, line_items: orderItems } = products;
  const {
    state,
    city,
    line1,
    line2,
    postal_code: postalCode,
  } = orderAddress.address;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  const ShowOrderSummaryIcon = showOrderSummaryCondition
    ? HiChevronUp
    : HiChevronDown;

  const subTotal = orderItems.reduce(
    (acc, product) => acc + product.price.unit_amount,
    0
  );

  return (
    <Layout floatWishlist>
      <div className='grid grid-cols-1 font-title lg:grid-cols-9'>
        <section className='order-2 mx-auto max-w-xl pb-52 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44'>
          <Link href='/'>
            <div className='relative ml-14 hidden  h-16 w-48 cursor-pointer transition lg:inline-flex'>
              <Image
                src='https://images.surfacemag.com/app/uploads/2017/06/gentlemonsterlogo-1024x83.png'
                objectFit='contain'
                layout='fill'
              />
            </div>
          </Link>

          <div className='my-8 ml-4 flex space-x-4 lg:ml-14'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full  border-black'>
              <BsCheckCircle className='h-8 w-8' />
            </div>
            <div>
              <p className='text-xs text-gray-500'>
                구매번호 #{sessionId?.slice(-5)}
              </p>
              <h4 className='text-base font-medium'>
                {session ? session.user?.name?.split(' ')[0] : '고객'}님 주문이
                완료 되었습니다.
              </h4>
            </div>
          </div>

          <table className='mx-4 mb-4  flex table-fixed border-separate border-spacing-4 flex-col divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14'>
            <thead className='text-sm font-medium'>
              <tr>
                <th>배송지 정보</th>
              </tr>
            </thead>

            <tbody className='text-sm'>
              <tr>
                <td className='pr-4'>받는사람 이름</td>
                <td>{orderAddress.name}</td>
              </tr>
              <tr>
                <td>연락처</td>
                <td>{orderAddress.phone}</td>
              </tr>
              <tr>
                <td>주소</td>
                <td>
                  [{postalCode}] {`${state} ${city} ${line1} ${line2 || ''}`}
                </td>
              </tr>
            </tbody>
          </table>

          <div className='mx-4 flex flex-col items-center justify-end text-sm lg:ml-14 lg:flex-row'>
            {mounted && (
              <Button
                title='쇼핑 계속하기'
                onClick={() => router.push('/')}
                width={isTabletOrMobile ? 'w-full' : undefined}
                buttonColor='black'
                padding='p-3'
                height='inherit'
              />
            )}
          </div>
        </section>

        {mounted && (
          <section className='no-scrollbar overflow-y-scroll border-y border-l border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0'>
            <div
              className={`w-full ${
                showOrderSummaryCondition && 'border-b'
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className='mx-auto flex max-w-xl items-center justify-between px-4 py-6'>
                <button
                  type='button'
                  onClick={handleShowOrderSummary}
                  className='flex items-center space-x-2'
                >
                  <p>주문 상세내역</p>
                  <ShowOrderSummaryIcon className='text-black-500 h-4 w-4' />
                </button>

                <p className='text-xl font-medium'>
                  <CurrencyFormat
                    value={subTotal}
                    displayType='text'
                    thousandSeparator
                    suffix='원'
                  />
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div className='mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16'>
                <div className='space-y-4 pb-4'>
                  {orderItems.map(product => (
                    <div
                      key={product.id}
                      className='flex items-center space-x-4 text-sm font-medium'
                    >
                      <div className='relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] text-xs text-white'>
                        <div className='relative h-7 w-7 animate-bounce rounded-md'>
                          <Image
                            src='https://images.surfacemag.com/app/uploads/2017/06/gentlemonsterlogo-1024x83.png'
                            layout='fill'
                            objectFit='contain'
                          />
                        </div>
                        <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs'>
                          {product.quantity}
                        </div>
                      </div>

                      <p className='flex-1'>{product.description}</p>
                      <p>
                        <CurrencyFormat
                          value={product.price.unit_amount}
                          displayType='text'
                          thousandSeparator
                          suffix='원'
                        />
                      </p>
                    </div>
                  ))}
                </div>

                <div className='space-y-1 py-4'>
                  <div className='flex justify-between text-sm'>
                    <p className='text-[gray]'>소계</p>
                    <p className='font-medium'>
                      <CurrencyFormat
                        value={subTotal}
                        displayType='text'
                        thousandSeparator
                        suffix='원'
                      />
                    </p>
                  </div>

                  <div className='flex justify-between text-sm'>
                    <p className='text-[gray]'>배송비</p>
                    <p className='text-[gray]'>무료</p>
                  </div>

                  <div className='flex justify-between pt-4'>
                    <p>결제 금액</p>
                    <p className='flex items-center gap-x-2 text-xs text-[gray]'>
                      <span className='text-xl font-medium text-black'>
                        <CurrencyFormat
                          value={subTotal}
                          displayType='text'
                          thousandSeparator
                          suffix='원'
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId); // 결제한 아이템들 정보 가져옴

  return {
    props: {
      products,
    },
  };
};

export default Success;
