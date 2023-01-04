import Image from 'next/image';

function Landing() {
  return (
    <section className='relative w-full'>
      <figure className='grid h-screen grid-flow-col overflow-hidden lg:grid-cols-2'>
        <div className='relative h-full w-full lg:w-[100%]'>
          <Image
            src='https://web-resource.gentlemonster.com/assets/stories/22_fall_campaign/image/main/main-1920-1-final.jpg?ver=1.0'
            alt='메인이미지1'
            layout='fill'
            objectPosition='top'
            objectFit='cover'
          />
        </div>
        <div className='relative hidden h-full w-full md:block lg:w-[100%]'>
          <Image
            src='https://web-resource.gentlemonster.com/assets/stories/22_fall_campaign/image/main/main-1920-1-final.jpg?ver=1.0'
            alt='메인이미지2'
            layout='fill'
            objectFit='cover'
            objectPosition='top'
          />
        </div>
      </figure>
    </section>
  );
}

export default Landing;
