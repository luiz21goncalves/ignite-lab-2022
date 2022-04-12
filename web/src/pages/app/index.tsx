import type { NextPage, GetServerSideProps } from 'next';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { withApollo } from '../../lib/withApollo';
import { ssrGetProducts, useMe } from '../../graphql/generated/page';

const App: NextPage = (props) => {
  const { data: me } = useMe();

  return (
    <div>
      <h1>Hello Next.js</h1>
      <pre>{JSON.stringify(props?.data?.products, null, 2)}</pre>
      <pre>{JSON.stringify(me, null, 2)}</pre>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default withApollo(ssrGetProducts.withPage()(App));
