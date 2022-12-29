import Script from 'next/script';

function NotFoundPage() {
  return (
    <div className='flex h-[100vh] w-[100vw] flex-col items-center justify-center'>
      <h1 className='mb-2.5 text-3xl'>404</h1>
      <p className='text-sm'>
        페이지를 찾을 수 없습니다. <br />홈 페이지로 이동합니다.
      </p>
      <Script id='redirect'>document.location.href="/"</Script>
    </div>
  );
}

export default NotFoundPage;
