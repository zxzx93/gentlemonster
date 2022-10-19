import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Header from '../../components/Header';
import Button from '../../components/Button';
import CustomerForm from '../../components/CustomerForm';

function Login() {
	const router = useRouter();
	const [authState, setAuthState] = useState({
		username: '',
		password: '',
	});
	const [pageState, setPageState] = useState({
		error: '',
		processing: false,
	});

	const handleFieldChange = e => {
		setAuthState(old => ({ ...old, [e.target.id]: e.target.value }));
	};

	// const simplifyError = error => {
	// const errorMap = {
	// 	CredentialsSignin: 'Invalid username or password',
	// };
	// return errorMap[error] ?? 'Unknown error occurred';
	// };

	// const handleAuth = async () => {
	// 	setPageState(old => ({ ...old, processing: true, error: '' }));
	// signIn('credentials', {
	// 	...authState,
	// 	redirect: false,
	// })
	// 	.then(response => {
	// 		console.log(response);
	// 		if (response.ok) {
	// 			// Authenticate user
	// 			router.push('/');
	// 		} else {
	// 			setPageState(old => ({
	// 				...old,
	// 				processing: false,
	// 				error: response.error,
	// 			}));
	// 		}
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 		setPageState(old => ({
	// 			...old,
	// 			processing: false,
	// 			error: error.message ?? 'Something went wrong!',
	// 		}));
	// 	});
	// };

	return (
		<div className='h-screen font-title'>
			<Head>
				<title>Gentlemonster</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />

			<main className=' mt-5 h-full px-4 text-gray-800'>
				<div className='mb-36 inline-flex w-full flex-col flex-wrap items-center justify-center sm:mt-24 lg:justify-between xl:justify-center'>
					<CustomerForm
						title='로그인'
						buttonTitle={['로그인', '구글 로그인']}
					/>
					<CustomerForm
						title='회원가입'
						buttonTitle={['신규가입', '구글 아이디 가입']}
					/>
				</div>
			</main>
		</div>
	);
}

export default Login;
