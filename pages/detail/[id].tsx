import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import CurrencyFormat from 'react-currency-format';
import toast from 'react-hot-toast';

import Button from '../../components/Button';
import { Product } from '../../typings';
import fetchContentDetail from '../../utils/fetchContentDetail';
import { urlFor } from '../../sanity';
import {
  addToCart,
  selectCartItems,
  selectCartTotal,
} from '../../redux/cartSlice';
import Modal from '../../components/Modal';
import useCreateCheckout from '../../hooks/useCreateCheckout';
import fetchProducts from '../../utils/fetchProducts';
import useWishList from '../../hooks/useWishList';
import Layout from '../../components/Layout';

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  products: Product[];
  contentDetail: Product;
}

function ContentDetail({ products, contentDetail }: Props) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const allTotalPrice = useSelector(selectCartTotal);

  const { createCheckout, loading } = useCreateCheckout(); // 결제 hook
  const { addToWishList } = useWishList({ products }); // 관심상품 추가 hook

  const [showModal, setShowModal] = useState(false); // cart 모달 show

  const addItemToCart = () => {
    // if (contentDetail.quantity <= contentDetail.instock) {
    // 	setShowModal(false);
    // }
    const duplicateItemsCheck = items.some(
      item => item._id === contentDetail._id
    );
    if (!duplicateItemsCheck) {
      dispatch(addToCart(contentDetail));
      toast.success(`${contentDetail.title}가 카트에 담겼습니다.`, {
        position: 'bottom-center',
      });
    }
    // else {
    // 	itemQuantity('incQty', contentDetail._id);
    // }
  };

  const [groupedItemsInCart, setGroupedItemsInCart] = useState(
    {} as { [key: string]: Product[] }
  );

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      // if (!results[item._id]) {
      // 	results[item._id] = []; // 빈 배열로 초기화
      // }
      // results[item._id].push(item);
      return results;
    }, {} as { [key: string]: Product[] }); // 초기엔 빈 객체, 타입 정의

    setGroupedItemsInCart(groupedItems);
  }, [items]);

  return (
    <Layout>
      <div className='relative flex flex-col justify-between pb-44 md:flex-row md:pl-5 lg:flex-row'>
        <div className='basis-2/3'>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            {contentDetail.image.map(image => (
              <Image
                src={urlFor(image).url()}
                width={500}
                height={750}
                key={image._key}
              />
            ))}
          </div>
        </div>

        <div className='mx-4 basis-1/3 md:mx-8 lg:mx-10 2xl:basis-2/12'>
          <div className='flex flex-col justify-between py-11 md:flex-row md:items-center md:pt-28'>
            <span className='mb-2.5 font-title text-xl font-bold md:mb-0'>
              {contentDetail.title}
            </span>
            <span className='text-sm font-medium'>
              <CurrencyFormat
                value={contentDetail.price}
                displayType='text'
                thousandSeparator
                suffix='원'
              />
            </span>
          </div>

          <div className='mb-9 break-all text-sm leading-6'>
            {contentDetail.description}
          </div>

          <div className='flex flex-col gap-3'>
            <Button
              title='쇼핑백에 추가'
              buttonColor='black'
              onClick={() => {
                addItemToCart();
                setShowModal(true);
              }}
            />
            <Button
              title='관심상품 추가'
              onClick={() => {
                // TODO 상품 디테일에서 관심상품 추가시에 중복 금지. 지금은 uuid가 새로 생성되기 때문에 중복 체크가 안되고 있음.
                // addToWishList(contentDetail);
              }}
            />
          </div>

          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            items={items}
            groupedItemsInCart={groupedItemsInCart}
            allTotalPrice={allTotalPrice}
            checkout={{ createCheckout, loading }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params as Params;

  // api call
  const products = await fetchProducts();
  const detail = await fetchContentDetail(id);

  return { props: { contentDetail: detail, products } };
};

export default ContentDetail;
