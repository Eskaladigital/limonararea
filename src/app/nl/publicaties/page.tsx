import { permanentRedirect } from 'next/navigation';

export default async function PublicatiesPage() {
  permanentRedirect('/nl/blog');
}
