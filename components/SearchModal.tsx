import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoCloseOutline } from 'react-icons/io5';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useDebounce from '../hooks/useDebounce';
import fetchSearchProducts from '../utils/fetchSearchProducts';
import { Product } from '../typings';
import { urlFor } from '../sanity';
import Loading from './Loading';

interface SearchModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function SearchModal({ showModal, setShowModal }: SearchModalProps) {
  const router = useRouter();
  const cancelButtonRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchProducts, setSearchProducts] = useState<Product[] | null>();

  const debouncedSearch = useDebounce({ value: searchQuery, delay: 800 });

  useEffect(() => {
    const fetchSearch = async () => {
      if (debouncedSearch) {
        setLoading(true);
        const products = await fetchSearchProducts(debouncedSearch);
        setSearchProducts(products);
        setLoading(false);
      }
    };

    fetchSearch();
  }, [debouncedSearch]);

  const searchInputOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value.trim());
    },
    [setSearchQuery]
  );

  const goToSearchPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?term=${searchQuery}`);
    setShowModal(false);
  };

  const resetSearchValue = () => {
    setSearchQuery(''); // 검색하는 input value
    setSearchProducts(null); // 검색해서 가져온 데이터 비워줌
  };

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-[999]'
        initialFocus={cancelButtonRef}
        onClose={() => {
          setShowModal(false);
          resetSearchValue();
        }}
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
          <div className='flex h-[50%] min-h-[50%]'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative flex h-full w-full transform flex-col items-center overflow-hidden bg-white text-left text-sm shadow-xl transition-all'>
                <div className='relative flex w-full basis-1/6 items-center md:justify-center'>
                  <form
                    className='box-border w-[100%] items-center overflow-hidden rounded-2xl border border-black md:max-w-xl'
                    acceptCharset='utf-8'
                    autoComplete='off'
                    onSubmit={goToSearchPage}
                  >
                    <input
                      type='text'
                      placeholder='검색어를 입력해주세요.'
                      className='h-[32px] w-[90%] indent-2 text-slate-900 placeholder:text-sm placeholder:text-slate-700 focus:outline-none md:w-full'
                      onChange={searchInputOnChange}
                    />
                  </form>
                  <button
                    className='absolute right-[1%] z-50 h-6 w-6 rounded-full bg-black'
                    type='button'
                    onClick={() => {
                      setShowModal(false);
                      resetSearchValue();
                    }}
                  >
                    <IoCloseOutline
                      className='inline-block h-5 w-5'
                      color='white'
                    />
                  </button>
                </div>

                <div className='flex w-full max-w-xl basis-5/6 flex-col gap-4 px-5 pb-14 pt-6 md:px-0'>
                  <h5 className='text-[#acacac]'>연관제품</h5>
                  {loading ? (
                    <span className='m-auto'>
                      <Loading color='black' />
                    </span>
                  ) : (
                    <div className='no-scroll flex min-w-[500px] flex-row gap-4 overflow-x-auto'>
                      {searchProducts?.map(product => (
                        <Link
                          className='flex h-full cursor-pointer flex-col gap-3'
                          key={product._id}
                          href={`/detail/${product._id}`}
                        >
                          <div className='z-10 cursor-pointer'>
                            <Image
                              alt='검색 모달 상품 이미지'
                              src={urlFor(product.image[0]).url()}
                              width={110}
                              height={150}
                            />
                            <p className='mt-2 font-medium'>{product.title}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default SearchModal;
