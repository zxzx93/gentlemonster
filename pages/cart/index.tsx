import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

import Header from '../../components/Header';
import { selectCartItems } from '../../redux/cartSlice';
import Button from '../../components/Button';
import { Product } from '../../typings';
import CartContent from '../../components/CartContent';

function Cart() {
	const items = useSelector(selectCartItems);
	const router = useRouter();

	const [subTotal, setSubtotal] = useState(0);
	const [allTotal, setAlltotal] = useState(0);

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

			<main className='flex max-w-[1419px] flex-col gap-8 px-4 pt-5 font-title md:flex-row md:px-12 md:pb-12 md:pt-[150px] lg:gap-20 xl:mx-auto xl:my-0'>
				{/* 쇼핑백 */}
				<div className='basis-2/3'>
					<h1 className='mb-10 text-base font-semibold text-black'>쇼핑백</h1>

					<div className='flex flex-row justify-between border-b pb-6 text-[13px] font-normal'>
						<p>상품</p>
						<p>가격</p>
					</div>
					{/* 
					{items.length === 0 && (
						<Button title='쇼핑 계속하기' onClick={() => router.push('/')} />
					)} */}

					{items.length > 0 ? (
						<div className=''>
							{Object.entries(groupedItemsInCart).map(([key, contents]) => (
								<CartContent key={key} id={key} contents={contents} />
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
									value={subTotal}
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
						<Button title='결제하기' buttonType='cart' width='w-full' />
					</div>

					<p className='my-4 mt-6 text-xs leading-6 tracking-tighter'>
						무료 반품 서비스가 제공되오니 안심하고 구매하십시오. 배송에 대한
						자세한 내용을 확인하십시오
					</p>
				</div>
			</main>
		</div>
	);
}

export default Cart;
