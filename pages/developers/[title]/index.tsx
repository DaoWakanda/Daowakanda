import { DeveloperDetail } from '@/features/developers/pages/detail';
import { ITrivia } from '@/interfaces/developer.interface';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

interface PageProps {
  trivia?: ITrivia;
}

export async function getServerSideProps(content: GetServerSidePropsContext) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const triviaId = content.params?.title;

  try {
    const response = await fetch(`${baseUrl}/user-trivia/${triviaId}/detail`);

    if (!response.ok) {
      throw new Error(`Failed to fetch challenge SEO: ${response.status}`);
    }

    const trivia = await response.json();

    return {
      props: {
        trivia,
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

export default function Page(props: PageProps) {
  const title = `${
    props.trivia?.title || ''
  } | Developer Challenges | DaoWakanda`;
  const description = props.trivia?.description || '';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <DeveloperDetail />
    </>
  );
}
