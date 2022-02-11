import type { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from '../../services/fauna';
import { query as q } from 'faunadb';

type Data = {
  name: string;
};

export default async function GetNewsletter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }

  try {
    const body = req.body;

    await fauna.query(
      q.Create(q.Collection('newsletter'), {
        data: {
          name: body.name,
          email: body.email,
          whatsapp: body.whatsapp,
          state: body.state,
        },
      })
    );

    return res.status(200).json({ message: 'Sucesso: assinatura registrada!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro: email existente!' });
  }
}
