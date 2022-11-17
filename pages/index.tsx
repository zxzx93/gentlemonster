import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Tab } from '@headlessui/react';
import { getSession, useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

import Header from '../components/Header';
import Landing from '../components/Landing';
import fetchCategories from '../utils/fetchCategoryies';
import fetchProducts from '../utils/fetchProducts';
import { Category, Product } from '../typings.d';
import LandingContent from '../components/LandingContent';
import FloatCart from '../components/FloatCart';
import useWishList from '../hooks/useWishList';
import {
	addToWishlist,
	removeToWishlist,
	selectWishListItems,
} from '../redux/wishlistSlice';

interface Props {
	categories: Category[];
	products: Product[];
	// session: Session | null;
}

function Home({ categories, products }: Props) {
	const { data: session } = useSession();
	const dispatch = useDispatch();
	// const wisiListItems = useSelector(selectWishListItems);
	const [currentProducts, setCurrentProducts] = useState(products);
	const { wishLists, setWishLists } = useWishList();


	console.log(currentProducts, 'currentProducts');
	console.log(wishLists, 'wishLists');

	// 선택된 wishList 상품의 like 속성값을 true로 변경하는 useEffect
	// useEffect(() => {
	// 	if (wishLists.length > 0) {
	// 		const newProduct = currentProducts.map(element => {
	// 			if (wishLists.includes(element)) {
	// 				return { ...element, like: true };
	// 			}
	// 			return element;
	// 		});
	// 		setCurrentProducts(newProduct);
	// 	}
	// }, [wishLists]);

	const addToWishList = (product: Product) => {
		if (wishLists.includes(product)) {
			const newProduct = currentProducts.map((item, index) => {
				if (item._id === product._id) {
					const unliked = { ...item, like: false, uuid: index };
					dispatch(removeToWishlist(unliked));
					return unliked;
				}
				return item;
			});
			setCurrentProducts(newProduct);
			const unlike = wishLists.filter(elem => elem !== product);
			setWishLists(unlike);
		} else {
			const newProduct = currentProducts.map((item, index) => {
				if (item._id === product._id) {
					const liked = { ...item, like: true, uuid: index };
					setWishLists([...wishLists, liked]);
					dispatch(addToWishlist(liked));
					return liked;
				}
				return item;
			});
			setCurrentProducts(newProduct);
		}
	};

	const newProducts = (category: number) => {
		return currentProducts
			.filter(product => product.category._ref === categories[category]._id)
			.map(product => (
				<LandingContent
					product={product}
					key={product._id}
					addToWishList={addToWishList}
				/>
			));
	};

	return (
		<>
			<Head>
				<title>GENTLEMONSTER</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<FloatCart />

			<main className='relative h-[200vh]'>
				<Landing />
			</main>

			<section className='relative z-40 -mt-[100vh] min-h-screen bg-white'>
				<div className='space-y-10 py-16'>
					<h1 className='text-center text-4xl font-medium tracking-wide text-black md:text-5xl'>
						WHAT'S NEW
					</h1>

					<Tab.Group>
						<Tab.List className='flex justify-center'>
							{categories.map(category => (
								<Tab
									key={category._id}
									id={category._id}
									className={({
										selected,
									}) => `whitespace-nowrap rounded-t-lg py-3 px-3 text-sm outline-none md:py-4 md:px-6 md:text-base 
                   ${
											selected
												? 'borderGradient bg-[#35383C] text-white'
												: 'border-b-2 border-[#35383C] text-[#343434]'
										}`}
								>
									{category.title}
								</Tab>
							))}
						</Tab.List>

						<Tab.Panels className='mx-auto max-w-fit pt-10 pb-24 sm:px-4'>
							<Tab.Panel className='tabPanel'>{newProducts(0)}</Tab.Panel>
							<Tab.Panel className='tabPanel'>{newProducts(1)}</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
	// api call
	const categories = await fetchCategories();
	const products = await fetchProducts();
	const session = await getSession(context);

	return { props: { categories, products, session } };
};

export default Home;
