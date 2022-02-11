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
    const spotifyData = [
      {
        title: 'EP 00 - MANIFESTO',
        description:
          '"O Poder está em suas mãos” é um podcast para debater assuntos muito importantes com Luana Tavares, mestre em políticas públicas pela Universidade de Oxford. Entre as pautas falaremos sobre carreira com propósito, modernização dos serviços públicos, participação cívica, liderança feminina, além dos principais assuntos que estão sendo debatidos no Congresso Nacional.',
        href: 'https://open.spotify.com/episode/2fFpDxATWAN3NLxTTqSp2f',
        image: '/images/',
      },
      {
        title: 'EP 01 - Minha história',
        description:
          'Neste episódio, você vai conhecer um pouco mais da minha jornada de vida. Também trago alguns assuntos que falaremos mais profundamente nos próximos episódios como liderança feminina, modernização dos serviços públicos, capacitação e mercado de trabalho para os jovens, dentre outros.',
        href: 'https://open.spotify.com/episode/2AbBkWKi73n4YpPcQth4rF',
        image: '/images/',
      },
      {
        title: 'EP 02 - Líderança Feminina',
        description:
          'Precisamos de um serviço público mais avançado, mais ágil, com linguagem simples e acessível a todos. A digitalização dos serviços públicos ainda é muito fragmentada, tem pouca integração, transparência e nem todo cidadão consegue acessar. Precisamos avançar para que todos sejam incluídos digitalmente e, que, com apenas com um clique qualquer um consiga acessar os serviços públicos de forma simples e rápida.',
        href: 'https://open.spotify.com/episode/4YIcixrMYvtcVhPXvrisce',
        image: '/images/',
      },
      {
        title: 'EP 03 - Modernização dos serviços públicos',
        description:
          'Neste episódio eu falo sobre a importância da Modernização dos Serviços Públicos. ',
        href: 'https://open.spotify.com/episode/5NzlfzlTwU964N1fZyC3UD',
        image: '/images/',
      },

      {
        title:
          'EP 04 - Lugar de Mulher é onde ela quiser inclusive na política',
        description:
          'Uma das coisas que mais me incomodam ao olhar para os espaços de poder é a falta de representatividade das mulheres. A democracia só será realmente forte no momento em que nos vermos representados nela - homens, mulheres, negras, negros, ricos, pobres, e assim por diante. ',
        href: 'https://open.spotify.com/episode/73NruUu6kFRIgmlImOWWwn',
        image: '/images/',
      },
      {
        title:
          'EP 05 - Preparação para o mestrado internacional (Preparação Oxford)',
        description:
          'Estudar fora do Brasil muda muito a nossa perspectiva e capacidade de tomar decisões considerando contextos distintos. Dialogar com pessoas de outras realidades, de outras culturas, nos faz pensar soluções de forma ainda mais inovadora e efetiva. ',
        href: 'https://open.spotify.com/episode/73NruUu6kFRIgmlImOWWwn',
        image: '/images/',
      },
    ];

    //@ts-ignore
    return res.status(200).send(spotifyData);
  } catch (err) {
    console.log(err.message, 'deu erro');
  }
}
