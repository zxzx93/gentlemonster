import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CurrencyFormat from 'react-currency-format';

import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Product } from '../typings';
import { urlFor } from '../sanity';

interface Props {
  product: Product;
  addToWishList: (product: Product) => void;
}

function LandingContent({ product, addToWishList }: Props) {
  const HeartIcon = product.like ? BsHeartFill : BsHeart;

  return (
    <div className='flex h-fit w-[280px] select-none flex-col space-y-3 rounded-xl p-8 md:h-full md:w-[300px] md:p-8'>
      <Link href={`/detail/${product._id}`}>
        <div className='relative h-64 w-full cursor-pointer md:h-72'>
          <Image
            alt='상품 이미지'
            src={urlFor(product.image[0]).url()}
            objectFit='contain'
            layout='fill'
          />
        </div>
      </Link>

      <div className='flex flex-1 justify-between px-3'>
        <Link href={`/detail/${product._id}`}>
          <div className='cursor-pointer space-y-1 text-sm text-black md:text-base'>
            <p className='font-normal'>{product.title}</p>
            <p className='text-[0.9em] font-light'>
              <CurrencyFormat
                value={product.price}
                displayType='text'
                thousandSeparator
                suffix='원'
              />
            </p>
          </div>
        </Link>

        <div className='flex cursor-pointer'>
          <HeartIcon
            className={`h-4.5 w-4.5 ${product.like && 'fill-red-500'}`}
            onClick={() => {
              addToWishList(product);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingContent;
