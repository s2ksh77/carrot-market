import { ProductWithCount } from 'pages';
import useSWR from 'swr';
import Item from './item';

interface ProductListProps {
  kind: 'favorites' | 'sales' | 'purchases';
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);

  return data ? (
    <>
      {data[kind]?.map(item => (
        <Item
          id={item.product.id}
          key={item.id}
          title={item.product.name}
          price={item.product.price}
          comments={1}
          hearts={item.product._count.favorites}
        />
      ))}
    </>
  ) : null;
}
