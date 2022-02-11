//@ts-nocheck
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Icon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MotionGridItem } from '../../shared/styles/animation';
import Image from 'next/image';
import Header from '../../shared/components/Header';
import Footer from '../../shared/Footer';
import buttonIcon from '../../../public/images/play-button.svg';
import NextLink from 'next/link';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';

const spotifyData = [
  {
    title: 'EP 00 - MANIFESTO',
    description:
      '"O Poder está em suas mãos” é um podcast para debater assuntos muito importantes com Luana Tavares, mestre em políticas públicas pela Universidade de Oxford. Entre as pautas falaremos sobre carreira com propósito, modernização dos serviços públicos, participação cívica, liderança feminina, além dos principais assuntos que estão sendo debatidos no Congresso Nacional.',
    href: 'https://open.spotify.com/episode/2fFpDxATWAN3NLxTTqSp2f',
    image: '/images/podcastcover.jpeg',
  },
  {
    title: 'EP 01 - Minha história',
    description:
      'Neste episódio, você vai conhecer um pouco mais da minha jornada de vida. Também trago alguns assuntos que falaremos mais profundamente nos próximos episódios como liderança feminina, modernização dos serviços públicos, capacitação e mercado de trabalho para os jovens, dentre outros.',
    href: 'https://open.spotify.com/episode/2AbBkWKi73n4YpPcQth4rF',
    image: '/images/podcastcover.jpeg',
  },
  {
    title: 'EP 02 - Líderança Feminina',
    description:
      'Precisamos de um serviço público mais avançado, mais ágil, com linguagem simples e acessível a todos. A digitalização dos serviços públicos ainda é muito fragmentada, tem pouca integração, transparência e nem todo cidadão consegue acessar. Precisamos avançar para que todos sejam incluídos digitalmente e, que, com apenas com um clique qualquer um consiga acessar os serviços públicos de forma simples e rápida.',
    href: 'https://open.spotify.com/episode/4YIcixrMYvtcVhPXvrisce',
    image: '/images/podcastcover.jpeg',
  },
  {
    title: 'EP 03 - Modernização dos serviços públicos',
    description:
      'Neste episódio eu falo sobre a importância da Modernização dos Serviços Públicos. ',
    href: 'https://open.spotify.com/episode/5NzlfzlTwU964N1fZyC3UD',
    image: '/images/podcastcover.jpeg',
  },

  {
    title: 'EP 04 - Lugar de Mulher é onde ela quiser inclusive na política',
    description:
      'Uma das coisas que mais me incomodam ao olhar para os espaços de poder é a falta de representatividade das mulheres. A democracia só será realmente forte no momento em que nos vermos representados nela - homens, mulheres, negras, negros, ricos, pobres, e assim por diante. ',
    href: 'https://open.spotify.com/episode/73NruUu6kFRIgmlImOWWwn',
    image: '/images/podcastcover.jpeg',
  },
  {
    title:
      'EP 05 - Preparação para o mestrado internacional (Preparação Oxford)',
    description:
      'Estudar fora do Brasil muda muito a nossa perspectiva e capacidade de tomar decisões considerando contextos distintos. Dialogar com pessoas de outras realidades, de outras culturas, nos faz pensar soluções de forma ainda mais inovadora e efetiva. ',
    href: 'https://open.spotify.com/episode/73NruUu6kFRIgmlImOWWwn',
    image: '/images/podcastcover.jpeg',
  },
];

export default function Podcast({ formattedSpotify }) {
  console.log(formattedSpotify, 'testando');

  return (
    <>
      <Header />
      <Flex
        flexDir="column"
        w="100%"
        mx="auto"
        justify="center"
        h="100%"
        py="2rem"
      >
        <Heading
          bgColor="purple.900"
          color="white"
          px="8"
          py="2"
          maxH="60px"
          mx="auto"
          mt={['5.5rem', '5.5rem', '7rem']}
          fontFamily="Raleway"
          boxShadow="sm"
          mb={['1rem', '1rem', '3rem']}
        >
          Podcast
        </Heading>
        <Flex
          mb="2rem"
          py="2rem"
          maxW="1400"
          h="100%"
          mx="auto"
          justify="center"
        >
          <Grid
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
            ]}
            gap="20"
          >
            {formattedSpotify.map(episode => (
              <MotionGridItem
                _hover={{ boxShadow: '2xl', borderRadius: '20px' }}
                cursor="pointer"
                whileHover={{ scale: 1.04 }}
              >
                <NextLink href={episode.href} passHref>
                  <Flex
                    position="relative"
                    flexDir="column"
                    w="260px"
                    borderRadius="20px"
                    position="relative"
                    h="330px"
                    bgColor="rgba(0, 0, 0, 0.221)"
                    bgImage={`url('${episode.image}')`}
                    bgRepeat={'no-repeat'}
                    boxShadow="sm"
                    bgSize="contain"
                    className={'podcastFlex'}
                  >
                    <Box
                      position="absolute"
                      w="100%"
                      h="120px"
                      boxShadow="sm"
                      bottom="0"
                      py="1rem"
                      textOverflow={'ellipsis'}
                      borderRadius="20px"
                      borderTopLeftRadius={'20px'}
                      borderTopRightRadius={'20px'}
                      bgColor="white"
                      display={'block'}
                    >
                      <Heading
                        mb="7px"
                        mt="7px"
                        maxW="220px"
                        mx="auto"
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                        fontSize="14px"
                        color="purple.900"
                        as="h4"
                      >
                        {episode.title}
                      </Heading>
                      <Text
                        textOverflow={'ellipsis'}
                        maxW="220px"
                        mx="auto"
                        fontSize="14px"
                        as="h5"
                        fontFamily={'Raleway'}
                      >
                        {episode.subtitle[0].text}
                      </Text>
                    </Box>
                  </Flex>
                </NextLink>
              </MotionGridItem>
            ))}
          </Grid>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'spotify')],
    {
      pageSize: 10,
      orderings: '[document.first_publication_date desc]',
    }
  );

  console.log(JSON.stringify(postsResponse), null, 2);

  const formattedSpotify = postsResponse.results.map(podcast => {
    return {
      id: podcast.id,
      image: podcast.data.image.url,
      subtitle: podcast.data.subtitle.flatMap(sub => {
        return {
          text: sub.text,
        };
      }),
      href: podcast.data.link.url,
      title: podcast.data.title[0].text,
    };
  });

  console.log(formattedSpotify, 'sera q deu bom?');

  return {
    props: { formattedSpotify },
    revalidate: 1,
  };
};
