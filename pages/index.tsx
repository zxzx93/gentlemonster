import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { GetServerSideProps } from 'next';
import { Tab } from '@headlessui/react';
import { getSession, useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import uuid from 'react-uuid';

import Landing from '../components/Landing';
import fetchCategories from '../utils/fetchCategoryies';
import fetchProducts from '../utils/fetchProducts';
import { Category, Product } from '../typings.d';
import LandingContent from '../components/LandingContent';
import FloatCart from '../components/FloatCart';
import useWishList from '../hooks/useWishList';
import {
  addToWishlist,
  removeToWishlist,
  selectWishListItems,
} from '../redux/wishlistSlice';
import Layout from '../components/Layout';

interface Props {
  categories: Category[];
  products: Product[];
  // session: Session | null;
}

function Home({ categories, products }: Props) {
  // const { data: session } = useSession();
  const { updateProducts, addToWishList } = useWishList({ products });

  const newProducts = (category: number) => {
    return updateProducts
      .filter(product => product.category._ref === categories[category]._id)
      .map(product => (
        <LandingContent
          product={product}
          key={product._id}
          addToWishList={addToWishList}
        />
      ));
  };

  return (
    <Layout>
      <div className='relative h-[200vh]'>
        <Landing />
      </div>

      <section className='relative z-40 -mt-[100vh] min-h-screen bg-white'>
        <div className='space-y-10 py-16'>
          <h1 className='text-center text-4xl font-medium tracking-wide text-black md:text-5xl'>
            WHAT'S NEW
          </h1>

          <Tab.Group>
            <Tab.List className='flex justify-center'>
              {categories.map(category => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({
                    selected,
                  }) => `whitespace-nowrap rounded-t-lg py-3 px-3 text-sm outline-none md:py-4 md:px-6 md:text-base 
                   ${
                     selected
                       ? 'borderGradient bg-[#35383C] text-white'
                       : 'border-b-2 border-[#35383C] text-[#343434]'
                   }`}
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className='mx-auto max-w-fit pt-10 pb-24 sm:px-4'>
              <Tab.Panel className='tabPanel'>{newProducts(0)}</Tab.Panel>
              <Tab.Panel className='tabPanel'>{newProducts(1)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  // api call
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession(context);

  return { props: { categories, products, session } };
};

export default Home;
