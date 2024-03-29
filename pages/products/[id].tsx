import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Button from '@components/button';
import Layout from '@components/layout';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import Link from 'next/link';
import { ChatRoom, Product, User } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import { cls, getImageSrc } from '@libs/client/utils';
import useUser from '@libs/client/useUser';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { isUint16Array } from 'util/types';
import { useEffect } from 'react';
import client from '@libs/server/client';

interface ProductWithUser extends Product {
  user: User;
}
interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

interface ChatRoomResponse {
  ok: boolean;
  chatRoom: ChatRoom;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({
  product,
  relatedProducts,
  isLiked,
}) => {
  const { user } = useUser();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { handleSubmit } = useForm();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query?.id}` : null,
  );

  const [getRoom, { loading, data: chatRoomData }] =
    useMutation<ChatRoomResponse>('/api/chats');

  const [toggleFavorite] = useMutation(
    `/api/products/${router.query?.id}/favorite`,
  );

  const onFavoriteClick = () => {
    toggleFavorite({});
    if (!data) return;
    boundMutate({ ...data, isLiked: !isLiked }, false);
    // mutate('/api/users/me', (prev:any) => ({ok:!prev.ok}), false); <-- another component data cache change
    // mutate('/api/users/me') <-- just refetch
  };

  const onValid = () => {
    if (loading) return;
    getRoom({ productId: router.query.id, id: product?.user?.id });
  };

  useEffect(() => {
    if (chatRoomData?.ok) {
      router.push(`/chats/${chatRoomData?.chatRoom?.id}`);
    }
  }, [chatRoomData]);

  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          {product?.image ? (
            <div className="relative pb-80">
              <Image
                src={getImageSrc(product?.image, 'public')}
                className="object-cover bg-slate-300"
                layout="fill"
              />
            </div>
          ) : (
            <div className="h-96 bg-slate-300" />
          )}
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <Image
              src={getImageSrc(product?.user?.avatar, 'avatar')}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full bg-slate-300"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {product?.user?.name}
              </p>
              <Link href={`/users/profiles/${product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  프로필 &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              \ {product?.price}
            </span>
            <p className=" my-6 text-gray-700">{product?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <form className="w-full" onSubmit={handleSubmit(onValid)}>
                <Button large text="채팅으로 거래하기" />
              </form>
              <button
                onClick={onFavoriteClick}
                className={cls(
                  'p-3 rounded-md flex items-center justify-center ',
                  isLiked
                    ? 'text-red-500 hover:bg-red-100 hover:text-red-600'
                    : 'text-gray-400 hover:bg-gray-100 hover:text-gray-500',
                )}
              >
                {isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">비슷한 상품</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {relatedProducts?.map(product => (
              <Link href={`/api/product/${product.id}`}>
                <a>
                  <div key={product.id}>
                    <div className="h-56 w-full mb-4 bg-slate-300" />
                    <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      \{product.price}
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// paths를 빈 array로 만들고 fallback을 blocking으로 해두면 미리 html을 안만들어 둠.
// 대신 사용자가 getStaticProps나 getStaticPaths로 만들어진 페이지에 접근하게 되면,
// 해당 변수로 들어온 [id] 의 페이지의 html을 즉시 만들어 줌.
// path안에 몇개의 파일들이 있을지 모르기 때문에 사용하는 방법 ( 변수가 얼마나 많을지 모르기 때문에 )

// fallback: false 일 경우는 빌드 시점에만 만들고 없는데 접근하게 되면 404 뱉음
// fallback: true 최초 요청 때 리퀘스트를 보내는 시간동안 어떤걸 볼 수 있게 해 줌. ( 스켈레톤 같은거다~~~~~ )
// blocking 하고 비슷하게 최초 요청 때 새로 HTML을 만들텐데 TRUE는 UI를 보여 줌
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }

  const product = await client.product.findUnique({
    where: {
      id: +ctx?.params?.id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const isLiked = false;

  const terms = product?.name.split(' ').map(word => ({
    name: {
      contains: word,
    },
  }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      isLiked: JSON.parse(JSON.stringify(isLiked)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
    },
  };
};

export default ItemDetail;

/**
 * Mutation

useSWRConfig() hook으로부터 mutate 함수를 얻을 수 있으며, 
mutate(key)를 호출하여 동일한 키를 사용하는 
다른 SWR hook*에게 revalidation 메시지를 전역으로 브로드 캐스팅할 수 있습니다.
mutate를 사용하면 로컬 데이터를 업데이트하는 동시에 유효성을 다시 검사하고 최종적으로 최신 데이터로 바꿀 수 있습니다.
```
const { mutate } = useSWRConfig();

// 로컬 데이터를 즉시 업데이트하지만, revalidation은 비활성화
mutate('/api/user', { ...data, name: newName }, false)

// 이 키가 있는 모든 SWR에 revalidate하도록 하고,
 로컬 데이터가 올바른지 확인하기 위해 갱신(refetch) 트리거 ("/api/user"에 refetch를 함)
mutate('/api/user');
```
https://swr.vercel.app/docs/mutation
 */
