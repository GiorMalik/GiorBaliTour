import { redirect } from 'next/navigation';

// This will redirect to root to default locale
export default function RootPage() {
  redirect('/en');
}