import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

import { selectCartItems, selectCartTotal } from '../../redux/cartSlice';
import Button from '../../components/Button';
import { Product } from '../../typings';
import Content from '../../components/Content';
import useCreateCheckout from '../../hooks/useCreateCheckout';
import Layout from '../../components/Layout';

function Cart() {
  const items = useSelector(selectCartItems);
  const allTotal = useSelector(selectCartTotal);
  const { createCheckout, loading } = useCreateCheckout();

  const [groupedItemsInCart, setGroupedItemsInCart] = useState(
    {} as { [key: string]: Product[] }
  );

  useEffect(() => {
    const groupedItems = items.reduce(
      (group, item) => ({
        ...group,
        [item._id]: (group[item._id] || []).concat(item),
      }),
      {} as { [key: string]: Product[] }
    );

    setGroupedItemsInCart(groupedItems);
  }, [items]);

  return (
    <Layout floatWishlist>
      <div className='flex h-full min-h-[780px] max-w-[1419px] flex-col gap-8 px-4 pt-5 font-title md:flex-row md:px-12 md:pb-44 md:pt-[150px] lg:gap-20 xl:mx-auto xl:my-0'>
        {/* 쇼핑백 */}
        <div className='basis-2/3'>
          <h1 className='mb-10 text-base font-semibold text-black'>쇼핑백</h1>

          <div className='flex flex-row justify-between border-b pb-6 text-[13px] font-normal'>
            <p>상품</p>
            <p>가격</p>
          </div>

          {items.length > 0 ? (
            <div>
              {Object.entries(groupedItemsInCart).map(([key, contents]) => (
                <Content
                  key={key}
                  id={key}
                  contents={contents}
                  location='cart'
                />
              ))}
            </div>
          ) : (
            <div className='mt-5 text-sm'>쇼핑백에 담긴 제품이 없습니다</div>
          )}
        </div>

        {/* 주문상세 */}
        <div className='mt-[73px] basis-1/3 text-sm md:sticky md:top-[150px] md:mt-0 md:h-80'>
          <h1 className='mb-5 text-base font-semibold text-black'>주문상세</h1>

          <ul className='flex list-none flex-col justify-between border-t pt-4'>
            <li className='checkoutSummary'>
              <span>소계</span>
              <span>
                <CurrencyFormat
                  value={allTotal}
                  displayType='text'
                  thousandSeparator
                  suffix='원'
                />
              </span>
            </li>
            <li className='checkoutSummary mt-2'>
              <span>배송비</span>
              <span>무료</span>
            </li>
            <li className='checkoutSummary mt-4 border-t pt-5'>
              <span>합계</span>
              <span>
                <CurrencyFormat
                  value={allTotal}
                  displayType='text'
                  thousandSeparator
                  suffix='원'
                />
              </span>
            </li>
          </ul>

          <div className='mt-10'>
            <Button
              title='결제하기'
              buttonColor={items.length ? 'black' : 'gray'}
              width='w-full'
              height='h-10'
              loading={loading}
              onClick={createCheckout}
              disabled={!(items.length > 0)}
            />
          </div>

          <p className='my-4 mt-6 text-xs leading-6 tracking-tighter'>
            무료 반품 서비스가 제공되오니 안심하고 구매하십시오. 배송에 대한
            자세한 내용을 확인하십시오
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
