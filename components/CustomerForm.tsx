import React, { MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signIn } from 'next-auth/react';

import Button from './Button';

interface LoginInputs {
	email: string;
	password: string;
}

const schema: yup.SchemaOf<LoginInputs> = yup.object().shape({
	email: yup
		.string()
		.email('이메일 형식으로 입력해주세요!')
		.required('이메일을 입력해주세요!'),
	// .test('domainCheck', 'gmail만 가능합니다.', email => {
	// 	if (!email) return false;
	// 	return email.split('@')[1] === 'gmail.com';
	// })
	password: yup
		.string()
		.required('비밀번호를 입력해주세요!')
		.min(7, '비밀번호는 5글자 이상 이어야 합니다.')
		.max(15, '비밀번호는 10글자 이하 이어야 합니다.')
		.matches(/^[a-zA-Z]*$/, { message: '비밀번호는 영어만 가능합니다.' }),
	// checkPw: yup
	// 	.string()
	// 	.required(),
});

interface FormProps {
	title: '로그인' | '회원가입';
	buttonTitle: string[];
}

function CustomerForm({ title, buttonTitle }: FormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputs>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: LoginInputs) => console.log(data);

	const googleLogin = (e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();

		const { name: ButtonTitle } = e.currentTarget;
		if (ButtonTitle === '구글 로그인') signIn('google');
	};

	return (
		<div className='mb-16 w-full max-w-md md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12'>
			<h2 className='mb-7 text-base font-medium'>{title}</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				{title === '로그인' ? (
					<>
						<div className='mb-6 text-sm'>
							<label htmlFor='login_email' className='mb-2 block text-sm'>
								이메일
							</label>
							<input
								className='loginInput'
								type='email'
								{...register('email')}
							/>
							<p className='mt-2 text-xs'>{errors.email?.message}</p>
						</div>

						<div className='mb-6'>
							<label htmlFor='login_password' className='mb-2 block text-sm'>
								비밀번호
							</label>
							<input
								className='loginInput'
								type='password'
								{...register('password')}
							/>
							<p className='mt-2 text-xs'>{errors.password?.message}</p>
						</div>

						<div className='mb-6 flex items-center justify-between'>
							<a
								href='#!'
								className='border-b border-black text-sm text-gray-800'
							>
								비밀번호 찾기
							</a>
						</div>
					</>
				) : (
					<div className='mb-7  text-left text-sm leading-6 tracking-normal'>
						<p>
							회원가입을 하시면, 주문 조회와 개인정보 관리 및 위시리스트 확인 등
							다양한 혜택을 누리실 수 있습니다.
						</p>
					</div>
				)}

				<div className='grid gap-3 text-center lg:text-left'>
					<Button
						name={buttonTitle[0]}
						title={buttonTitle[0]}
						buttonColor='black'
						width='w-full'
						height='h-10'
						type='submit'
						// loading={loading}
						// onClick={login}
						// disabled={!(items.length > 0)}
					/>
					<div className='g-signin2' data-onsuccess='onSignIn' />
					<Button
						name={buttonTitle[1]}
						title={buttonTitle[1]}
						buttonColor='white'
						width='w-full'
						height='h-10'
						// loading={loading}
						onClick={e => googleLogin(e)}
						// disabled={!(items.length > 0)}
					/>
				</div>
			</form>
		</div>
	);
}

export default CustomerForm;
