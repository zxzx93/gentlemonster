import Image from 'next/image';
import React from 'react';
import { HiChevronDown } from 'react-icons/hi';
import CurrencyFormat from 'react-currency-format';
import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';
import { Product } from '../typings';
import { urlFor } from '../sanity';
import { removeToCart } from '../redux/cartSlice';

interface Props {
	id: string;
	contents: Product[];
}

function CartContent({ id, contents }: Props) {
	const dispatch = useDispatch();

	const removeContentFromCart = () => {
		dispatch(removeToCart({ id }));

		toast.error(`${contents[0].title}를 삭제했습니다.`, {
			position: 'top-right',
		});
	};
	console.log(contents);

	return (
		<div className='flex flex-row  border-b border-gray-300 py-3.5 lg:flex-row lg:items-center'>
			<div className='relative h-44 w-44'>
				<Image
					src={urlFor(contents[0].image[0]).url()}
					layout='fill'
					objectFit='contain'
				/>
			</div>

			<div className='flex flex-1 items-start lg:items-center'>
				<div className='relative h-full flex-1 space-y-4'>
					<div className='justify-items  flex h-full flex-col items-start gap-x-8 text-sm lg:flex-row lg:text-2xl'>
						<h4 className='font-semibold'>{contents[0].title}</h4>
						<p className='py-1'>
							<CurrencyFormat
								value={contents[0].price}
								displayType='text'
								thousandSeparator
								suffix='원'
							/>
						</p>
						<p className='pt-21 absolute bottom-0 flex gap-x-1 font-semibold'>
							{contents.length}
							<HiChevronDown className='text-black-500 h-6 w-6' />
						</p>
					</div>

					{/* <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
						상품 디테일 보기
						<HiChevronDown className='text-black-500 h-6 w-6' />
					</p> */}
				</div>

				<div className='flex h-full flex-col justify-between text-sm'>
					<h4 className='fonts-semiblod lg:text-2xl'>
						<CurrencyFormat
							value={contents.reduce((total, item) => total + item.price, 0)}
							displayType='text'
							thousandSeparator
							suffix='원'
						/>
					</h4>

					<button
						type='button'
						onClick={removeContentFromCart}
						className='box-border self-end border-b border-black text-black'
					>
						삭제
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartContent;
