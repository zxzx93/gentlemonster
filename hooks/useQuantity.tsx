import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, incQty, decQty } from '../redux/cartSlice';

type QtyProps = 'decQty' | 'incQty';

const useQuantity = () => {
	const items = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const [initialQty, setInitialQty] = useState(1); // 초기 아이템 수량

	const itemQuantity = (qty: QtyProps, id: string) => {
		if (qty === 'incQty') {
			dispatch(incQty({ id }));
		} else {
			dispatch(decQty({ id }));
		}
	};

	return { initialQty, setInitialQty, itemQuantity };
};

export default useQuantity;
