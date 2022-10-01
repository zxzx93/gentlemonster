import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import { selectCartItems } from '../../redux/cartSlice';
import Button from '../../components/Button';
import { Product } from '../../typings';
import CartContent from '../../components/CartContent';

function Cart() {
	const items = useSelector(selectCartItems);
	const router = useRouter();

	const [groupedItemsInCart, setGroupedItemsInCart] = useState(
		{} as { [key: string]: Product[] }
	);

	useEffect(() => {
		const groupedItems = items.reduce((results, item) => {
			(results[item._id] = results[item._id] || []).push(item);
			return results;
		}, {} as { [key: string]: Product[] }); // 초기엔 빈 객체, 타입 정의

		setGroupedItemsInCart(groupedItems);
	}, [items]);

	return (
		<div>
			<Head>
				<title>Gentlemonster</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />

			<main>
				<div>
					<h1 className='mb-10 font-title text-base font-semibold text-black lg:text-4xl'>
						{items.length > 0 ? '쇼핑백' : '쇼핑백이 비어 있습니다.'}
					</h1>
					{/* <p className='my-4'>배송은 무료입니다.</p> */}
					<div className='flex flex-row justify-between border-b pb-6 font-title text-[13px] font-normal'>
						<p>상품</p>
						<p>가격</p>
					</div>

					{items.length === 0 && (
						<Button title='쇼핑 계속하기' onClick={() => router.push('/')} />
					)}
				</div>

				{items.length > 0 ? (
					<div>
						{Object.entries(groupedItemsInCart).map(([key, contents]) => (
							<CartContent key={key} id={key} contents={contents} />
						))}
					</div>
				) : null}
			</main>
		</div>
	);
}

export default Cart;
