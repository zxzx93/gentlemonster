import Image from 'next/image';
import React, { useState, useEffect, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VscChromeClose } from 'react-icons/vsc';
import CurrencyFormat from 'react-currency-format';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { urlFor } from '../sanity';
import { Product } from '../typings';
import Button from './Button';
import { removeToWishlist } from '../redux/wishlistSlice';
import { addToCart, selectCartItems } from '../redux/cartSlice';

interface Props {
	item: Product;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

function WishlistContent({ item, setShowModal }: Props) {
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const removeWishlistItem = (
		e: MouseEvent<HTMLDivElement>,
		content: Product
	) => {
		e.preventDefault();

		dispatch(removeToWishlist(content));
		toast.error(`${content.title} 이/가 관심상품에서 삭제 됐습니다.`, {
			position: 'bottom-center',
		});
	};

	const addItemToCart = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// if (contentDetail.quantity <= contentDetail.instock) {
		// 	setShowModal(false);
		// }
		const duplicateItemsCheck = cartItems.some(
			content => content._id === item._id
		);
		if (!duplicateItemsCheck) {
			dispatch(addToCart(item));
			toast.success(`${item.title}가 카트에 담겼습니다.`, {
				position: 'bottom-center',
			});
		}
		// else {
		// 	itemQuantity('incQty', contentDetail._id);
		// }
	};

	return (
		<Link href={`/detail/${item._id}`}>
			<div className='text-sm'>
				<div className='cursor-pointer'>
					<Image
						src={urlFor(item.image[0]).url()}
						width={500}
						height={650}
						key={item.image[0]._key}
					/>
				</div>

				<div className='w-full pb-4 pt-1'>
					<div className='cursor-pointer'>
						<p className='mb-1 font-semibold'>{item.title}</p>
						<div className='mb-4 font-normal'>
							<CurrencyFormat
								value={item.price}
								displayType='text'
								thousandSeparator
								suffix='원'
							/>
						</div>
					</div>

					<div>
						<Button
							title='쇼핑백에 추가'
							buttonColor='black'
							width='w-full'
							height='h-7'
							onClick={e => {
								addItemToCart(e);
								setShowModal(true);
							}}
							// loading={loading}
							// disabled={!(items.length > 0)}
						/>
					</div>

					<div
						className='mt-3 flex cursor-pointer items-center justify-center gap-2'
						onClick={e => removeWishlistItem(e, item)}
						role='button'
						tabIndex={0}
					>
						<span>삭제</span>
						<span>
							<VscChromeClose />
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default WishlistContent;
