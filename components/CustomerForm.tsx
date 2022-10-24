import React, { MouseEvent, ChangeEvent, FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signIn, useSession } from 'next-auth/react';
import { signUp } from 'next-auth-sanity/client';
import { useRouter } from 'next/router';

import Button from './Button';
import { LoginInputsForm, SignupInputsForm } from '../typings';
import { Input } from '../hooks/useForm';

type Provider = 'google' | 'kakao';

interface FormProps {
	title: '로그인' | '회원가입' | '신규가입';
	buttonTitle: string[];
	schema?: yup.SchemaOf<LoginInputsForm> | yup.SchemaOf<SignupInputsForm>;
	// loginForm: LoginInputs;
	// handleFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CustomerForm({
	title,
	buttonTitle,
	schema,
}: // loginForm,
// handleFieldChange,
FormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputsForm & SignupInputsForm>({
		resolver: yupResolver(schema!),
	});
	const router = useRouter();
	const { status } = useSession();

	// 이메일, 패스워드 로그인
	const credentialsSignIn: SubmitHandler<LoginInputsForm> = async data => {
		await signIn('sanity-login', {
			redirect: true,
			email: data.email,
			password: data.password,
			callbackUrl: '/',
		});
	};

	// 카카오, 구글 oauth 로그인
	const oauthSignIn = async (
		e: MouseEvent<HTMLButtonElement>,
		provider: Provider
	) => {
		e.preventDefault();
		const { name: ButtonTitle } = e.currentTarget;
		if (ButtonTitle === '취소') return router.push('/');

		if (provider)
			await signIn(`${provider}`, {
				callbackUrl: '/',
			});
	};

	// 회원가입 or 이메일,패스워드 로그인
	const handleSubmitForm: SubmitHandler<SignupInputsForm> = async data => {
		if (title === '신규가입') {
			await signUp({
				email: data.email,
				password: data.password,
				name: data.name,
			});
			credentialsSignIn(data);
		}

		await credentialsSignIn(data);
	};

	if (status === 'loading') return <p>Loading...</p>;

	const formContents = () => {
		if (title === '로그인') {
			return (
				<>
					<div className='mb-6 text-sm'>
						<Input label_kr='이메일' label_en='email' register={register} />
						<p className='mt-2 text-xs'>{errors.email?.message}</p>
					</div>
					<div className='mb-6 text-sm'>
						<Input
							label_kr='비밀번호'
							label_en='password'
							register={register}
						/>
						<p className='mt-2 text-xs'>{errors.password?.message}</p>
					</div>
				</>
			);
		}
		if (title === '신규가입') {
			return (
				<>
					<div className='mb-6 text-sm'>
						<Input label_kr='이름' label_en='name' register={register} />
						<p className='mt-2 text-xs'>{errors.name?.message}</p>
					</div>
					<div className='mb-6 text-sm'>
						<Input label_kr='이메일' label_en='email' register={register} />
						<p className='mt-2 text-xs'>{errors.email?.message}</p>
					</div>
					<div className='mb-6 text-sm'>
						<Input
							label_kr='비밀번호'
							label_en='password'
							register={register}
						/>
						<p className='mt-2 text-xs'>{errors.password?.message}</p>
					</div>
					<div className='mb-6 text-sm'>
						<Input
							label_kr='비밀번호 확인'
							label_en='confirmPassword'
							register={register}
						/>
						<p className='mt-2 text-xs'>{errors.confirmPassword?.message}</p>
					</div>
				</>
			);
		}
		return (
			<div className='mb-7 text-left text-sm leading-6 tracking-normal'>
				회원가입을 하시면, 주문 조회와 개인정보 관리 및 위시리스트 확인 등
				다양한 혜택을 누리실 수 있습니다.
			</div>
		);
	};

	return (
		<div className='mb-16 w-full max-w-md md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12'>
			<h2 className='mb-7 text-base font-medium'>{title}</h2>
			<form onSubmit={handleSubmit(handleSubmitForm)}>
				{formContents()}
				<div className='grid gap-3 text-center lg:text-left'>
					<Button
						name={buttonTitle[0]}
						title={buttonTitle[0]}
						buttonColor='black'
						width='w-full'
						height='h-10'
						type={
							title === '로그인' || title === '신규가입' ? 'submit' : 'button'
						}
						onClick={() => title === '회원가입' && router.push('/signup')}
						// loading={loading}
						// disabled={!(items.length > 0)}
					/>
					<Button
						name={buttonTitle[1]}
						title={buttonTitle[1]}
						buttonColor='white'
						width='w-full'
						height='h-10'
						onClick={e => oauthSignIn(e, 'google')}
						// loading={loading}
						// disabled={!(items.length > 0)}
					/>

					{buttonTitle[2] && (
						<Button
							name={buttonTitle[2]}
							title={buttonTitle[2]}
							buttonColor='white'
							width='w-full'
							height='h-10'
							onClick={e => oauthSignIn(e, 'kakao')}
							// loading={loading}
							// disabled={!(items.length > 0)}
						/>
					)}
				</div>
			</form>
		</div>
	);
}

export default CustomerForm;
