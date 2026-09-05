import Link from 'next/link';
import { copy } from '@/content/copy';
import { withBasePath } from '@/lib/base-path';

export default function Entry() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${withBasePath('/ar/')}`} />
      <p><Link href="/ar/">{copy.home.ar}</Link></p>
    </>
  );
}