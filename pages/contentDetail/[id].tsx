import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Header from '../../components/Header';
import Button from '../../components/Button';

function ContentDetail() {
	const images = ['/le_iv1_1.jpg', '/le_iv1_2.jpg', '/le_iv1_3.jpg'];

	return (
		<div>
			<Head>
				<title>GENTLEMONSTER </title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />

			<section>
				<div className='flex flex-col justify-between md:flex-row md:pl-5 lg:flex-row'>
					<div className='basis-2/3'>
						<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
							{images.map(image => (
								<Image src={image} width={500} height={750} />
							))}
						</div>
					</div>

					<div className='mx-4 basis-1/3 md:mx-8 lg:mx-10'>
						<div className='flex flex-col justify-between py-11 md:flex-row md:items-center'>
							<span className='mb-2.5 font-title text-xl font-bold md:mb-0'>
								디디온 GRC1
							</span>
							<span className='text-sm font-medium'>270,000원</span>
						</div>

						<div className='mb-9 break-all text-sm leading-6'>
							<p>
								디디온 GRC1은 슬림한 직사각형태의 그린 클리어 아세테이트
								선글라스입니다. 직선 느낌의 프런트와 템플에 두께감이 부드럽고
								세련된 느낌을 연출합니다. 99.9% UV차단이 되는 레드 그라디언트
								렌즈를 사용하였습니다.
							</p>
						</div>

						<div className='flex flex-col gap-3'>
							<Button title='쇼핑백에 추가' />
							<Button title='관심상품 추가' />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default ContentDetail;
