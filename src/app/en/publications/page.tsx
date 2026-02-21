import { permanentRedirect } from 'next/navigation';

export default async function PublicationsPage() {
  permanentRedirect('/en/blog');
}
