import React from 'react';

//import Button from './Button';

function Landing() {
	return (
		<section className='no-repeat sticky top-0 right-0 bottom-0 left-0 flex h-screen items-center justify-center bg-Landing-image bg-cover'>
			<div className='space-y-8 text-center text-[yellow]'>
				<h1 className='text-5xl font-semibold tracking-normal lg:text-6xl xl:text-7xl '>
					<span className='block font-title '>GENTLE MONSTER</span>
					<span className='mb-8 mt-2.5 block font-title '>
						MY MARS COLLECTION
					</span>
					<span className='block font-title text-lg font-normal '>
						A REALM OF SPACE VISIBLE TO THOSE WHO ARE UNAFRAID
					</span>
				</h1>

				<div className='space-x-8'>
					{/* <Button title='구매하기' /> */}
					<a className='link' href='#!'>
						Learn More
					</a>
				</div>
			</div>
		</section>
	);
}

export default Landing;
