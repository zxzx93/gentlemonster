import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Tab } from '@headlessui/react';

import Header from '../components/Header';
import Landing from '../components/Landing';
import fetchCategories from '../utils/fetchCategoryies';
import fetchProducts from '../utils/fetchProducts';
import { Category, Product } from '../typings.d';
import Content from '../components/Content';

interface Props {
	categories: Category[];
	products: Product[];
}

function Home({ categories, products }: Props) {
	const newProducts = (category: number) => {
		return products
			.filter(product => product.category._ref === categories[category]._id)
			.map(product => <Content product={product} key={product._id} />);
	};

	return (
		<div className=''>
			<Head>
				<title>GENTLEMONSTER</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />

			<main className='relative h-[200vh] '>
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
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
	// api call
	const categories = await fetchCategories();
	const products = await fetchProducts();

	return { props: { categories, products } };
};

export default Home;
