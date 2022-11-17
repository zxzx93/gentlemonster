import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, incQty, decQty } from '../redux/cartSlice';

type QtyProps = 'decQty' | 'incQty';

const useQuantity = () => {
	const items = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const [itemQty, setItemQty] = useState(1); // 상품 수량
	const [cartQuantity, setCartQuantity] = useState(0); // 헤더아이콘 상품 수량

	useEffect(() => {
		const cartQuantity = items.reduce(
			(totalQty, item) => (totalQty += item.quantity),
			0
		);
		setCartQuantity(cartQuantity);
	}, [items]);

	const itemQuantity = (qty: QtyProps, id: string) => {
		if (qty === 'incQty') {
			dispatch(incQty({ id }));
		} else {
			dispatch(decQty({ id }));
		}
	};

	return { itemQty, setItemQty, itemQuantity, cartQuantity };
};

export default useQuantity;
