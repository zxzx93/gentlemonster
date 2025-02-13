import React from 'react';
import Image from 'next/image';
import CurrencyFormat from 'react-currency-format';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { Product } from '../typings';
import { urlFor } from '../sanity';
import { removeToCart } from '../redux/cartSlice';
import useQuantity from '../hooks/useQuantity';

interface Props {
  id: string;
  contents: Product[];
  location: 'cartModal' | 'cart';
}

function Content({ id, contents, location }: Props) {
  const dispatch = useDispatch();
  const { itemQuantity } = useQuantity();

  const removeAllContentFromCart = () => {
    const removeConfirm = window.confirm('해당 상품을 삭제하시겠습니까?');

    if (removeConfirm) {
      dispatch(removeToCart({ id }));

      toast.error(`${contents[0].title}를 삭제했습니다.`, {
        position: 'bottom-center',
      });
    }
  };

  return (
    <div className='flex flex-row border-b py-3.5 lg:flex-row'>
      <Link href={`/detail/${id}`}>
        <div
          className={`relative cursor-pointer ${
            location === 'cartModal' ? 'h-24 w-24' : 'h-44 w-44'
          }`}
        >
          <Image
            src={urlFor(contents[0].image[0]).url()}
            alt='상품 이미지'
            layout='fill'
            objectFit='contain'
          />
        </div>
      </Link>

      <div className='flex flex-1 items-start'>
        <div className='relative h-full flex-1 space-y-4'>
          <div className='justify-items  flex h-full flex-col items-start gap-x-8 text-sm'>
            <h4 className='font-semibold'>{contents[0].title}</h4>
            <p className='py-1'>
              <CurrencyFormat
                value={contents[0].price}
                displayType='text'
                thousandSeparator
                suffix='원'
              />
            </p>
            <div className='pt-21 absolute bottom-0 flex gap-x-1 font-title'>
              <div className='flex w-[80px] items-center justify-between border-[0.5px] border-zinc-600/75 px-2 py-1 text-center text-black'>
                <button
                  type='button'
                  className='quantity'
                  onClick={() => itemQuantity('decQty', id)}
                  disabled={contents[0].quantity === 1}
                >
                  -
                </button>
                <span className='quantity'>{contents[0].quantity}</span>
                <button
                  type='button'
                  className='quantity'
                  onClick={() => itemQuantity('incQty', id)}
                  disabled={contents[0].quantity === contents[0].instock}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex h-full flex-col justify-between text-sm'>
          <h4 className='fonts-semiblod'>
            <CurrencyFormat
              value={contents.reduce((total, item) => {
                let TotalPrice: number = total;
                return (TotalPrice += item.price * item.quantity);
              }, 0)}
              displayType='text'
              thousandSeparator
              suffix='원'
            />
          </h4>

          <button
            type='button'
            onClick={removeAllContentFromCart}
            className='box-border self-end border-b border-black text-black'
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default Content;
