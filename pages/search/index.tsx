import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import SearchContent from '../../components/SearchContent';
import { Product } from '../../typings';
import fetchSearchProducts from '../../utils/fetchSearchProducts';

interface Props {
  products: Product[];
}

function Search({ products }: Props) {
  const { query } = useRouter();

  return (
    <Layout>
      <div className='flex h-full min-h-[780px] max-w-[1419px] flex-col gap-8 px-4 pb-44 pt-5 font-title md:pb-12 xl:mx-auto xl:my-0'>
        <div>
          <p className='font-bold'>
            "{query && query.term}"({products.length})
          </p>
        </div>

        <div className='grid  grid-cols-2 flex-col gap-2 gap-y-14 md:grid-cols-3 md:gap-x-2 lg:grid-cols-4'>
          {products.map(product => (
            <SearchContent key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryResults = query.term as string;
  const products = await fetchSearchProducts(queryResults);

  return {
    props: {
      products,
    },
  };
};

export default Search;
