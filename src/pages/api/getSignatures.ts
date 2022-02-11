// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from '../../services/fauna';
import { Client, query as q, Ref } from 'faunadb';

export default async function GetUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }

  try {
    const dbs = await fauna.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('Undersigned')), { size: 500 }),
        q.Lambda(x => q.Get(x))
      )
    );

    //@ts-ignore
    return res.status(200).json(dbs.data);
  } catch (err) {
    console.log(err.message, 'deu erro');
  }
}
