import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoCloseOutline } from 'react-icons/io5';
import CurrencyFormat from 'react-currency-format';

import Button from './Button';
import Content from './Content';
import { Product } from '../typings';

interface ModalProps {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	items: Product[];
	groupedItemsInCart: { [key: string]: Product[] };
	allTotalPrice: number;
}

function Modal({
	showModal,
	setShowModal,
	items,
	groupedItemsInCart,
	allTotalPrice,
}: ModalProps) {
	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={showModal} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-[999]'
				initialFocus={cancelButtonRef}
				onClose={() => setShowModal(false)}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 z-[999] overflow-y-auto'>
					<div className='flex h-full min-h-full items-end justify-end sm:items-center sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						>
							<Dialog.Panel className='relative flex h-full w-[350px] max-w-sm transform flex-col overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8'>
								<div className='basis-5/6 bg-white px-5 pt-5'>
									<div className='mt-3 text-left  sm:mt-0'>
										<Dialog.Title
											as='h3'
											className='flex flex-row items-center justify-between font-title text-base font-medium leading-6 text-gray-900'
										>
											<p>쇼핑백</p>
											<button type='button' onClick={() => setShowModal(false)}>
												<IoCloseOutline className='h-5 w-5' />
											</button>
										</Dialog.Title>

										<div className='no-scrollbar mt-7 h-[calc(100vh-290px)] min-h-[calc(100vh-290px)] overflow-y-auto'>
											<p className='text-sm text-gray-500'>
												{items.length > 0 ? (
													<div className=''>
														{Object.entries(groupedItemsInCart).map(
															([key, contents]) => (
																<Content
																	key={key}
																	id={key}
																	contents={contents}
																	location='cartModal'
																/>
															)
														)}
													</div>
												) : (
													<div className='mt-5 text-sm'>
														쇼핑백에 담긴 제품이 없습니다
													</div>
												)}
											</p>
										</div>
									</div>
								</div>

								<div className='flex w-full basis-1/6 flex-col px-4 py-5 font-title text-sm'>
									<ul className='flex list-none flex-col justify-between gap-2 border-t py-6'>
										<li className='checkoutSummary'>
											<span>배송비</span>
											<span>무료</span>
										</li>
										<li className='checkoutSummary'>
											<span>합계</span>
											<span>
												<CurrencyFormat
													value={allTotalPrice}
													displayType='text'
													thousandSeparator
													suffix='원'
												/>
											</span>
										</li>
									</ul>

									<div className='flex flex-col gap-2'>
										<Button
											title='결제하기'
											width='w-full'
											height='h-[35px]'
											buttonColor='black'
											onClick={() => setShowModal(false)}
										/>
										<Button
											title='자세히 보기'
											width='w-full'
											height='h-[35px]'
											onClick={() => setShowModal(false)}
										/>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default Modal;
