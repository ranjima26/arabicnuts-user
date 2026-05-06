import { Cart } from '@/components/Cart';

export const metadata = {
  title: 'Your Bag - Arabic Nuts',
  description: 'View and manage items in your shopping bag.',
};

export default function CartPage() {
  return (
    <main>
      <Cart />
    </main>
  );
}
