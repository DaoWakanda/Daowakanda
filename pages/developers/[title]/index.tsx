import { DeveloperDetail } from '@/features/developers/pages/detail';
import { useRouter } from 'next/router';
import { Suspense } from 'react';

export default function Page() {

  const router = useRouter();

  const { id } = router.query;

  // const titleDash = id.spilt(' ').join('-')
  console.log(id);
  return (
      <DeveloperDetail />
  );
}
