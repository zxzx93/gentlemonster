import Link from 'next/link';
import { useSelector } from 'react-redux';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { selectCartItems } from '../redux/cartSlice';

function FloatCart() {
	const items = useSelector(selectCartItems);

  if (items.length === 0) return null;

	return (
		<Link href='/cart'>
			<div className='fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300'>
				{items.length > 0 && (
					<span className='absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full text-[10px] text-black'>
						{items.length}
					</span>
				)}
				<HiOutlineShoppingBag className='headerIcon  h-8 w-8' />
			</div>
		</Link>
	);
}

export default FloatCart;
