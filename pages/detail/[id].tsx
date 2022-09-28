import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { Product } from '../../typings';
import fetchContentDetail from '../../utils/fetchContentDetail';
import { urlFor } from '../../sanity';

interface Params extends ParsedUrlQuery {
	id: string;
}

interface Props {
	contentDetail: Product;
}

function ContentDetail({ contentDetail }: Props) {
	return (
		<>
			<Head>
				<title>GENTLEMONSTER</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />

			<section className='relative'>
				<div className='flex flex-col justify-between md:flex-row md:pl-5 lg:flex-row'>
					<div className='basis-2/3'>
						<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
							{contentDetail.image.map(image => (
								<Image
									src={urlFor(image).url()}
									width={500}
									height={750}
									key={image._key}
								/>
							))}
						</div>
					</div>

					<div className='mx-4 basis-1/3 md:mx-8 lg:mx-10 2xl:basis-2/12'>
						<div className='flex flex-col justify-between py-11 md:flex-row md:items-center md:pt-28'>
							<span className='mb-2.5 font-title text-xl font-bold md:mb-0'>
								{contentDetail.title}
							</span>
							<span className='text-sm font-medium'>
								{contentDetail.price}원
							</span>
						</div>

						<div className='mb-9 break-all text-sm leading-6'>
							{contentDetail.description}
						</div>

						<div className='flex flex-col gap-3'>
							<Button title='쇼핑백에 추가' buttonType='cart' />
							<Button title='관심상품 추가' />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async context => {
	const { id } = context.params as Params;

	// api call
	const detail = await fetchContentDetail(id);

	return { props: { contentDetail: detail } };
};

export default ContentDetail;
