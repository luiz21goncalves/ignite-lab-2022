import type { NextPage, GetServerSideProps } from 'next';

import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';

const App: NextPage = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello Next.js</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default App;
