import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../typings';

const useWishList = () => {
	const dispatch = useDispatch();

	const [liked, setLiked] = useState(false); // 관심상품 하트 아이콘 클릭 여부 확인
	const [wishLists, setWishLists] = useState<Product[]>([]); // select한 상품
	// console.log(wishLists,"관심상품 리스트")

	// const addToWishList = product => {
	// 	if (wishLists.includes(product)) {
	// 		const unlike = wishLists.filter(elem => elem !== product);
	// 		setWishLists(unlike);
	// 	} else {
	// 		setWishLists([...wishLists, product]);
	// 	}
	// };

	return { liked, setLiked, wishLists, setWishLists };
};

export default useWishList;
