import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { BsCheckCircle } from 'react-icons/bs';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import CurrencyFormat from 'react-currency-format';
import { GetServerSideProps } from 'next';

import Button from '../../components/Button';
import { StripeProducts } from '../../typings';

interface Props {
	products: StripeProducts[];
}

function Success({ products }: Props) {
	const router = useRouter();
	const { session_id } = router.query;

	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	const [showOrderSummary, setShowOrderSummary] = useState(false);

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
	const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

	const handleShowOrderSummary = () => {
		setShowOrderSummary(!showOrderSummary);
	};

	const ShowOrderSummaryIcon = showOrderSummaryCondition
		? HiChevronUp
		: HiChevronDown;

	return (
		<div>
			<Head>
				<title>GENTLEMONSTER</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<header className='mx-auto max-w-xl'>
				<Link href='/'>
					<div className='relative ml-4 h-16 w-48 cursor-pointer transition lg:hidden'>
						<Image
							src='https://images.surfacemag.com/app/uploads/2017/06/gentlemonsterlogo-1024x83.png'
							objectFit='contain'
							layout='fill'
						/>
					</div>
				</Link>
			</header>

			<main className='grid grid-cols-1 font-title lg:grid-cols-9'>
				<section className='order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44'>
					<Link href='/'>
						<div className='relative ml-14 hidden h-24 w-12 cursor-pointer transition lg:inline-flex'>
							<Image
								src='https://images.surfacemag.com/app/uploads/2017/06/gentlemonsterlogo-1024x83.png'
								objectFit='contain'
								layout='fill'
							/>
						</div>
					</Link>

					<div className='my-8 ml-4 flex space-x-4 lg:ml-14 xl:ml-0'>
						<div className='flex h-11 w-11 items-center justify-center rounded-full  border-black'>
							<BsCheckCircle className='h-8 w-8' />
						</div>
						<div>
							<p className='text-sm text-gray-500'>
								Order #{session_id?.slice(-5)}
							</p>
							<h4 className='text-lg'>
								Thank you{' '}
								{/* {session ? session.user?.name?.split(' ')[0] : 'Guest'} */}
							</h4>
						</div>
					</div>

					<div className='mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14'>
						<div className='space-y-2 pb-3'>
							<p>Your order is confirmed</p>
							<p className='text-sm text-gray-600'>
								We’ve accepted your order, and we’re getting it ready. Come back
								to this page for updates on your shipment status.
							</p>
						</div>
						<div className='pt-3 text-sm'>
							<p className='font-medium text-gray-600'>
								Other tracking number:
							</p>
							<p>CNB21441622</p>
						</div>
					</div>

					<div className='my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14'>
						<p>Order updates</p>
						<p className='text-sm text-gray-600'>
							You’ll get shipping and delivery updates by email and text.
						</p>
					</div>
					<div className='mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row'>
						<p className='hidden lg:inline'>Need help? Contact us</p>
						{mounted && (
							<Button
								title='쇼핑 계속하기'
								onClick={() => router.push('/')}
								width={isTabletOrMobile ? 'w-full' : undefined}
								buttonColor='black'
							/>
						)}
					</div>
				</section>

				{mounted && (
					<section className='overflow-y-scroll border-y border-l border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0'>
						<div
							className={`w-full ${
								showOrderSummaryCondition && 'border-b'
							} border-gray-300 text-sm lg:hidden`}
						>
							<div className='mx-auto flex max-w-xl items-center justify-between px-4 py-6'>
								<button type='button' onClick={handleShowOrderSummary}>
									<p>주문 상세내역</p>
									<ShowOrderSummaryIcon className='text-black-500 h-4 w-4' />
								</button>

								<p className='text-xl font-medium'>
									<CurrencyFormat
										value={123}
										displayType='text'
										thousandSeparator
										suffix='원'
									/>
								</p>
							</div>
						</div>
					</section>
				)}
			</main>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
	query,
}) => {
	const sessionId = query.session_id as string;
	// const products = await fetchLineItems(sessionId);

	return {
		props: {
			// products,
		},
	};
};

export default Success;
