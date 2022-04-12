import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

import { getAccessToken } from '@auth0/nextjs-auth0';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { accessToken } = await getAccessToken(request, response);

  return httpProxyMiddleware(request, response, {
    target: 'http://localhost:3332/graphql',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
