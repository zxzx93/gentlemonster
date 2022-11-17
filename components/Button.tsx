import React, { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLButtonElement> {
	title: string;
	name?: string;
	width?: string;
	height?: string;
	loading?: boolean;
	padding?: string;
	noIcon?: boolean;
	buttonColor?: string;
	disabled?: boolean;
	type?: 'submit' | 'reset' | 'button';
	// onClick?: () => void;
}

function Button({
	title,
	name,
	// onClick,
	width,
	height,
	loading,
	padding,
	noIcon,
	buttonColor,
	disabled,
	type,
	...props
}: Props) {
	const buttonBgColor =
		buttonColor === 'black'
			? 'bg-black text-white'
			: buttonColor === '#f7e14c'
			? 'bg-[#f7e14c] text-black border-none'
			: 'bg-white text-black';

	return (
		<button
			className={`relative box-border inline-flex cursor-pointer items-center justify-center overflow-hidden border border-[#000] text-sm  ${
				width || 'w-auto'
			} ${padding} ${buttonBgColor}`}
			// onClick={onClick}
			type={type}
			disabled={disabled}
			name={name}
			{...props}
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
