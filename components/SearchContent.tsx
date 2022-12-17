import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import CurrencyFormat from 'react-currency-format';
import { Product } from '../typings';
import { urlFor } from '../sanity';

interface Props {
  product: Product;
}

function SearchContent({ product }: Props) {
  return (
    <Link href={`/detail/${product._id}`}>
      <div className='cursor-pointer'>
        <Image src={urlFor(product.image[0]).url()} width='430' height='550' />
        <div className='mt-2'>
          <p className='text-sm font-semibold'>{product.title}</p>
          <p className='font-base text-[0.9em]'>
            <CurrencyFormat
              value={product.price}
              displayType='text'
              thousandSeparator
              suffix='원'
            />
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SearchContent;
