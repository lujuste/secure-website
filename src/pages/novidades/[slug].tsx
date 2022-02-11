import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
} from '@chakra-ui/react';
import timerIcon from '../../../public/images/time.svg';
import eyeIcon from '../../../public/images/eye.svg';
import Header from '../../shared/components/Header';
import Footer from '../../shared/Footer';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

interface Post {
  first_publication_date?: string;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  navigation: {
    prevPost: {
      uid: string;
      data: {
        title: string;
      };
    }[];
    nextPost: {
      uid?: string;
      data: {
        title: string;
      };
    }[];
  };
}

export default function Post({ post, navigation }: PostProps) {
  const humanWordsPerMinute = 200;
  const titleWords = post?.data.title.split(' ').length;

  const totalWords = post?.data.content.reduce((acc, content) => {
    const headingWords = content?.heading
      ? content?.heading.split(' ').length
      : 0;
    const bodyWords = RichText.asText(content.body).split(' ').length;
    // eslint-disable-next-line no-param-reassign
    acc += headingWords + bodyWords;
    return acc;
  }, 0);

  const timeToRead = Math.ceil((titleWords + totalWords) / humanWordsPerMinute);

  console.log('tempo de leitura', timeToRead);

  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Header />
        <Flex
          w="100%"
          maxW="1400px"
          h="100vh"
          color="pink.500"
          align="center"
          justify={'center'}
          alignSelf={'center'}
          mx="auto"
        >
          <Spinner />
        </Flex>
        <Footer />
      </>
    );
  }

  console.log(post);
  return (
    <>
      <Head>
        <title> {`${post.data.title} - Luana Tavares`} </title>
      </Head>
      <Header />
      <Flex
        flexDir="column"
        maxW="1400"
        w="100%"
        h="100%"
        mx="auto"
        align="center"
        py="7rem"
        pb={['-4rem', '-4rem', 0]}
      >
        <Flex maxW={['500px', '500px', '1010px']} w="100%" h="463px">
          <Image
            src={post.data.banner.url}
            width={1010}
            height={463}
            objectFit="cover"
            quality={75}
          />
        </Flex>

        <Heading
          fontFamily="Raleway"
          maxW="1010px"
          textAlign={['center', 'center', 'left']}
          mt={['4rem', '4rem', '2rem']}
          px={['1rem', '1rem', '0']}
        >
          {post?.data.title ? post.data.title : <Spinner color="pink.900" />}
        </Heading>

        <Flex
          px="1rem"
          w="100%"
          maxW="1010px"
          py="2rem"
          justify="space-between"
          flexWrap={['wrap', 'wrap', 'nowrap']}
        >
          <Flex mx={['auto', 'auto', '0']} mr="auto" align="center">
            <Icon fontSize="1.2rem" as={timerIcon} />
            <Text mx="2"> {post?.first_publication_date} </Text>
            <Divider
              mx="1rem"
              height="1rem"
              borderColor="black"
              border="1px"
              orientation="vertical"
            ></Divider>
            <Icon fontSize="1.2rem" as={eyeIcon} />
            <Text ml="2"> {`${timeToRead} min de leitura`} </Text>
          </Flex>
          <Flex
            mt={['2rem', '2rem', '0']}
            mx={['auto', 'auto', '0']}
            mb={['-1rem']}
            align="center"
          >
            <Avatar mx="3" name="Luana Tavares" src="/images/luanaAvatar.jpg" />
            <Text color="purple.900">Luana Tavares</Text>
          </Flex>
        </Flex>

        <Text
          fontSize="1.125rem"
          lineHeight={1.8}
          px={['1rem', '1rem', '0']}
          textAlign={['left', 'left', 'justify']}
          maxW="1010px"
          h="100%"
        >
          {post.data.content.map(content => {
            return (
              <Flex flexDir="column" mx="auto" h="100%" w="100%" maxW="1010px">
                <Heading
                  my="5"
                  mb={['2rem', '1rem', '0rem']}
                  mt={['2rem', '2rem', '3rem']}
                  px={['1.5rem', '1.5rem', '0']}
                  textAlign={['center', 'center', 'left']}
                  fontSize="1.5rem"
                  color="black"
                  fontFamily={'Roboto'}
                >
                  {content.heading}
                </Heading>
                <Flex
                  className={'containerBlog'}
                  my="2"
                  w="100%"
                  px={['1.5rem', '1.5rem', '0']}
                  maxW="1010px"
                  h="100%"
                  fontSize="1.125rem"
                  lineHeight={1.8}
                  flexDir="column"
                  mx="auto"
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </Flex>
            );
          })}
        </Text>

        <Flex
          mt={['3rem', '3rem', '3rem']}
          justify="center"
          align="center"
          maxW="1200px"
          mx="auto"
          w="100%"
        >
          <Flex
            ml="1rem"
            flexWrap="wrap"
            justify={['center', 'center', 'space-between']}
            w="100%"
          >
            {navigation?.prevPost.length > 0 && (
              <Flex
                mx={['auto', 'auto', 0]}
                mb={['2rem', '2rem', '1rem']}
                px={['1rem', '1rem', '0']}
                flexDir="column"
              >
                <Link href={`/novidades/${navigation.prevPost[0].uid}`}>
                  <Heading
                    cursor="pointer"
                    textAlign={['center', 'center', 'left']}
                    textOverflow="ellipsis"
                    maxW="360px"
                    fontSize="20px"
                    color="purple.900"
                  >
                    {' '}
                    {navigation.prevPost[0].data.title}{' '}
                  </Heading>
                </Link>
                <Link href={`/novidades/${navigation.prevPost[0].uid}`}>
                  <Text
                    mt="1rem"
                    color="black"
                    textAlign={['center', 'center', 'left']}
                    fontWeight="bold"
                  >
                    <Icon mr="0.26rem" as={ChevronLeftIcon} />
                    Post anterior{' '}
                  </Text>
                </Link>
              </Flex>
            )}

            {navigation?.nextPost.length > 0 &&
              navigation?.prevPost.length !== 0 && (
                <Flex
                  mt="-1rem"
                  mr="1rem"
                  px={['1rem', '1rem', '0']}
                  flexDir="column"
                  justify="space-around"
                >
                  <Link href={`/novidades/${navigation.nextPost[0].uid}`}>
                    <Heading
                      color="purple.900"
                      cursor="pointer"
                      mr="auto"
                      mt={['2rem', '3rem', '0rem', '0', '0']}
                      textAlign={['center', 'center', 'center', 'right']}
                      maxW="360px"
                      textOverflow="ellipsis"
                      fontSize="20px"
                    >
                      {' '}
                      {navigation.nextPost[0].data.title}{' '}
                    </Heading>
                  </Link>
                  <Link href={`/novidades/${navigation.nextPost[0].uid}`}>
                    <Text
                      mt="1rem"
                      color="black"
                      fontWeight="bold"
                      cursor="pointer"
                      textAlign={['center', 'center', 'right']}
                    >
                      Próximo post <Icon as={ChevronRightIcon} />
                    </Text>
                  </Link>
                </Flex>
              )}

            {navigation?.nextPost.length > 0 &&
              navigation?.prevPost.length === 0 && (
                <Flex
                  mt="-1rem"
                  ml="auto"
                  px={['1rem', '1rem', '0']}
                  flexDir="column"
                  justify="space-around"
                >
                  <Link href={`/novidades/${navigation.nextPost[0].uid}`}>
                    <Heading
                      color="purple.900"
                      cursor="pointer"
                      mr="auto"
                      mt={['2rem', '3rem', '0rem', '0', '0']}
                      textAlign={['center', 'center', 'center', 'right']}
                      maxW="360px"
                      textOverflow="ellipsis"
                      fontSize="20px"
                    >
                      {' '}
                      {navigation.nextPost[0].data.title}{' '}
                    </Heading>
                  </Link>
                  <Link href={`/novidades/${navigation.nextPost[0].uid}`}>
                    <Text
                      mt="1rem"
                      color="black"
                      fontWeight="bold"
                      cursor="pointer"
                      textAlign={['center', 'center', 'right']}
                    >
                      Próximo post <Icon as={ChevronRightIcon} />
                    </Text>
                  </Link>
                </Flex>
              )}
          </Flex>
        </Flex>

        <Divider
          mt="3rem"
          maxW="980px"
          mx="auto"
          color="transparent"
          bgColor="transparent"
          borderColor="transparent"
          w="100%"
          orientation="horizontal"
        />
      </Flex>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'publications'),
  ]);

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });
  return {
    paths: [],
    fallback: true,
  };
};

//@ts-ignore
export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  //@ts-ignore
  const response = await prismic.getByUID('publications', String(slug), {});

  const prevPost = await prismic.query(
    [Prismic.Predicates.at('document.type', 'publications')],
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.first_publication_date]',
    }
  );

  const nextPost = await prismic.query(
    [Prismic.Predicates.at('document.type', 'publications')],
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.last_publication_date desc]',
    }
  );

  console.log(nextPost, 'proximo post');
  console.log(prevPost, 'anterior post');

  const post = {
    uid: response.uid,
    first_publication_date: format(
      new Date(response.first_publication_date),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    ),
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map((content: any) => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {
      post,
      navigation: {
        prevPost: prevPost?.results,
        nextPost: nextPost?.results,
      },
    },
    revalidate: 1,
  };
};
