import { Checkout } from '@/components/Checkout';

export const metadata = {
  title: 'Checkout - Arabic Nuts',
  description: 'Complete your purchase securely.',
};

export default function CheckoutPage() {
  return (
    <main>
      <Checkout />
    </main>
  );
}
