import type { GetServerSideProps, NextPage } from 'next';

import { getSession } from '@auth0/nextjs-auth0';

const Home: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/app',
      permanent: false,
    },
  };
};

export default Home;
