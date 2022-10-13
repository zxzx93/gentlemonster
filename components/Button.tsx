import React from 'react';

interface Props {
	title: string;
	onClick?: () => void;
	width?: string;
	height?: string;
	loading?: boolean;
	padding?: string;
	noIcon?: boolean;
	buttonColor?: 'black' | 'white' | 'gray';
	disabled?: boolean;
}

function Button({
	title,
	onClick,
	width,
	height,
	loading,
	padding,
	noIcon,
	buttonColor,
	disabled,
}: Props) {
	return (
		<button
			className={`relative box-border inline-flex cursor-pointer items-center justify-center overflow-hidden border border-[#000] text-sm  ${
				width || 'w-auto'
			} ${padding} ${
				buttonColor === 'black'
					? `bg-black text-white`
					: 'bg-white text-black'
			}`}
			onClick={onClick}
			type='button'
			disabled={disabled}
		>
			<span
				className={`relative flex ${
					height || 'h-[56px]'
				} items-center font-medium`}
			>
				{loading ? (
					<svg
						className='mr-3 h-5 w-5 animate-spin text-white'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						/>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						/>
					</svg>
				) : (
					title
				)}
			</span>
		</button>
	);
}

export default Button;
