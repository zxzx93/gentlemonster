import React, { useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignupInputsForm } from '../../typings';
import CustomerForm from '../../components/CustomerForm';
import Layout from '../../components/Layout';

const schema: yup.SchemaOf<SignupInputsForm> = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요.'),
  email: yup
    .string()
    .email('이메일 형식으로 입력해주세요.')
    .required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .required('영문, 숫자포함 8자리를 입력해주세요.')
    .min(8, '최소 8자 이상 가능합니다.')
    .max(15, '최대 15자 까지만 가능합니다.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
      '영문 숫자포함 8자리를 입력해주세요.'
    ),
  confirmPassword: yup
    .string()
    .required('비밀번호를 재입력 바랍니다.')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputsForm>({
    resolver: yupResolver(schema),
  });

  const [signUpForm, setSignUpForm] = useState<SignupInputsForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      <div className='mt-5 h-screen h-full px-4 font-title text-gray-800'>
        <div className='mb-36 inline-flex w-full flex-col flex-wrap items-center justify-center sm:mt-24 lg:justify-between xl:justify-center'>
          <CustomerForm
            title='신규가입'
            buttonTitle={['계정생성', '취소']}
            schema={schema}
            handleFieldChange={handleFieldChange}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Signup;
