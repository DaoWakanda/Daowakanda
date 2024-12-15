import { Detail } from '@/features/governance/pages/detail';
import { IProposalContract } from '@/interfaces/proposal.interface';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Suspense } from 'react';

interface PageProps {
  proposal?: IProposalContract;
}

export async function getServerSideProps(content: GetServerSidePropsContext) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const proposalId = content.params?.title;

  try {
    const response = await fetch(`${baseUrl}/proposal/${proposalId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch proposal SEO: ${response.status}`);
    }

    const proposal = await response.json();

    return {
      props: {
        proposal,
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

export default function Page(props: PageProps) {
  const title = `${props.proposal?.title || ''} | Governance | DaoWakanda`;
  const description = props.proposal?.description || '';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <Suspense>
        <Detail />
      </Suspense>
    </>
  );
}
