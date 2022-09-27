import React from 'react';

interface Props {
	title: string;
	onClick?: () => void;
	width?: string;
	loading?: boolean;
	padding?: string;
	noIcon?: boolean;
	buttonType?: 'cart';
}

function Button({
	title,
	onClick,
	width,
	loading,
	padding,
	noIcon,
	buttonType,
}: Props) {
	return (
		<button
			className={`relative box-border inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[#000] text-sm  ${
				width || 'w-auto'
			} ${padding} ${
				buttonType === 'cart' ? 'bg-black text-white' : 'bg-white text-black'
			}`}
			onClick={onClick}
			type='button'
		>
			<span className='relative  flex h-[56px] items-center font-medium '>
				{/* {noIcon && (
					<svg
						className='relative mr-2 h-5 w-5 flex-shrink-0 text-white'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M13 10V3L4 14h7v7l9-11h-7z'
						/>
					</svg>
				)} */}

				{loading ? 'Loading...' : title}
			</span>
		</button>
	);
}

export default Button;
