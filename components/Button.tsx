import { ButtonHTMLAttributes } from 'react';
import Loading from './Loading';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  name?: string;
  width?: string;
  height?: string;
  loading?: boolean;
  padding?: string;
  noIcon?: boolean;
  buttonColor: 'kakao' | 'google' | 'black' | 'gray' | 'white';
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}

function Button({
  title,
  name,
  width,
  height,
  loading,
  padding,
  disabled,
  type,
  buttonColor: color,
  ...props
}: Props) {
  const buttonColor = {
    black: 'bg-black text-white',
    gray: 'bg-[#858585] text-white border-none',
    white: 'bg-white text-black',
    kakao: 'bg-[#f7e14c] text-black border-none',
    google: 'bg-[#3f81ec] text-white border-none',
  };

  return (
    <button
      className={`relative box-border inline-flex cursor-pointer items-center justify-center overflow-hidden border border-[#000] text-sm ${
        width || 'w-auto'
      } ${padding} ${buttonColor[color]}`}
      type={type || 'button'}
      disabled={disabled}
      name={name}
      {...props}
    >
      <span
        className={`relative flex ${
          height || 'h-[56px]'
        } items-center font-medium`}
      >
        {loading ? <Loading color='white' /> : title}
      </span>
    </button>
  );
}

export default Button;
