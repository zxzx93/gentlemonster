import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectWishListItems } from '../../redux/wishlistSlice';
import { selectCartItems, selectCartTotal } from '../../redux/cartSlice';
import WishlistContent from '../../components/WishlistContent';
import { Product } from '../../typings';
import Modal from '../../components/Modal';
import useCreateCheckout from '../../hooks/useCreateCheckout';
import Layout from '../../components/Layout';

function WishList() {
  const cartItems = useSelector(selectCartItems);
  const wisiListItems = useSelector(selectWishListItems);
  const allTotalPrice = useSelector(selectCartTotal); // 전체 상품 금액
  const { createCheckout, loading } = useCreateCheckout(); // 결제 hook

  const [showModal, setShowModal] = useState(false); // 모달 show

  const [groupedItemsInCart, setGroupedItemsInCart] = useState(
    {} as { [key: string]: Product[] }
  );

  useEffect(() => {
    const groupedItems = cartItems.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      // if (!results[item._id]) {
      // 	results[item._id] = []; // 빈 배열로 초기화
      // }
      // results[item._id].push(item);
      return results;
    }, {} as { [key: string]: Product[] }); // 초기엔 빈 객체, 타입 정의

    setGroupedItemsInCart(groupedItems);
  }, [cartItems]);

  return (
    <Layout>
      <div className='flex h-[100vh] max-w-[1419px] flex-col gap-8 px-4 pt-5 pb-44 font-title lg:gap-20 xl:mx-auto xl:my-0'>
        <div>
          <p className='font-bold'>위시리스트({wisiListItems.length})</p>
        </div>

        <div className='grid grid-cols-2 gap-4 gap-y-10 md:grid-cols-3 md:gap-x-14 lg:grid-cols-4'>
          {wisiListItems.map(item => (
            <WishlistContent
              key={item._uuid}
              item={item}
              setShowModal={setShowModal}
            />
          ))}

          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            items={cartItems}
            groupedItemsInCart={groupedItemsInCart}
            allTotalPrice={allTotalPrice}
            checkout={{ createCheckout, loading }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default WishList;
