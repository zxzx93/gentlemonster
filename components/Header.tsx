import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
	HiOutlineSearch,
	HiOutlineShoppingBag,
	HiOutlineUser,
} from 'react-icons/hi';

function Header() {
	const session = false;
	return (
		<header className='sticky top-0 z-40 flex w-full items-center justify-between bg-[#fff] p-4'>
			<div className='flex items-center justify-center md:w-1/5 '>
				<Link href='/'>
					<div className='relative h-10 w-48 cursor-pointer opacity-100 transition hover:opacity-75'>
						<Image
							src='https://images.surfacemag.com/app/uploads/2017/06/gentlemonsterlogo-1024x83.png'
							objectFit='contain'
							layout='fill'
						/>
					</div>
				</Link>
			</div>

			<div className='hidden flex-1 items-center justify-center space-x-8 md:flex'>
				<a className='headerLink' href='#!'>
					선글라스
				</a>
				<a className='headerLink' href='#!'>
					안경
				</a>
				<a className='headerLink' href='#!'>
					매장보기
				</a>
				<a className='headerLink' href='#!'>
					수리 서비스
				</a>
			</div>

			<div className='flex items-center justify-center gap-x-4 md:w-1/5'>
				<Link href='/checkout'>
					<div className='relative cursor-pointer'>
						<span className='to-white-300 from-white-500 bg-gradient-to-r absolute -right-2 -top-1.5 z-50 flex h-4 w-4 items-center justify-center rounded-full text-[10px]'>
							5
						</span>
						<HiOutlineShoppingBag className='headerIcon' />
					</div>
				</Link>
				<HiOutlineSearch className='headerIcon' />

				{session ? (
					<Image
						className='cursor-pointer rounded-full'
						src={
							''
							// session.user?.image ||
							// "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
						}
						alt=''
						width={34}
						height={34}
						onClick={() => {}}
					/>
				) : (
					<HiOutlineUser className='headerIcon' />
				)}
			</div>
		</header>
	);
}

export default Header;
