import React, { useState } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header';
import { selectWishListItems } from '../../redux/wishlistSlice';
import WishlistContent from '../../components/WishlistContent';
import { Product } from '../../typings';

function WishList() {
	const dispatch = useDispatch();
	const wisiListItems = useSelector(selectWishListItems);

	const [showModal, setShowModal] = useState(false); // 모달 show

	return (
		<div>
			<Head>
				<title>Gentlemonster</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />

			<main className='flex max-w-[1419px] flex-col gap-8 px-4 pt-5 font-title md:pb-12 lg:gap-20 xl:mx-auto xl:my-0'>
				<div>
					<p>위시리스트({wisiListItems.length})</p>
				</div>

				<div className='grid grid-cols-2 gap-4 gap-y-10 md:grid-cols-3 md:gap-x-14 lg:grid-cols-4'>
					{wisiListItems.map(item => (
						<WishlistContent key={item._id} item={item} />
					))}

					{/* <Modal
						showModal={showModal}
						setShowModal={setShowModal}
						items={items}
						groupedItemsInCart={groupedItemsInCart}
						allTotalPrice={allTotalPrice}
						checkout={{ createCheckout, loading }}
					/> */}
				</div>
			</main>
		</div>
	);
}

export default WishList;
