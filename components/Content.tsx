import Image from 'next/image';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';
import { Product } from '../typings';
import { urlFor } from '../sanity';
import { incQty, decQty, removeAllToCart } from '../redux/cartSlice';

interface Props {
	id: string;
	contents: Product[];
	location: 'cartModal' | 'cart';
}

type QtyProps = 'decQty' | 'incQty';

function Content({ id, contents, location }: Props) {
	const dispatch = useDispatch();

	const removeAllContentFromCart = () => {
		const removeConfirm = window.confirm('해당 상품을 삭제하시겠습니까?');

		if (removeConfirm) {
			dispatch(removeAllToCart({ id }));

			toast.error(`${contents[0].title}를 삭제했습니다.`, {
				position: 'bottom-center',
			});
		}
	};

	const itemQuantity = (qty: QtyProps) => {
		if (qty === 'incQty') {
			dispatch(incQty(contents[0]));
		} else {
			dispatch(decQty({ id }));
		}
	};

	return (
		<div className='flex flex-row  border-b py-3.5 lg:flex-row '>
			<div
				className={`relative ${
					location === 'cartModal' ? 'h-24 w-24' : 'h-44 w-44'
				}`}
			>
				<Image
					src={urlFor(contents[0].image[0]).url()}
					layout='fill'
					objectFit='contain'
				/>
			</div>

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
									onClick={() => itemQuantity('decQty')}
									disabled={contents.length === 1}
								>
									-
								</button>
								<span className='quantity'>{contents.length}</span>
								<button
									type='button'
									className='quantity'
									onClick={() => itemQuantity('incQty')}
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
							value={contents.reduce((total, item) => total + item.price, 0)}
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
