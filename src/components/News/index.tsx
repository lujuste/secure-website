import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Icon,
  Button,
  Avatar,
  Spinner,
  Divider,
} from '@chakra-ui/react';

import { MotionGridItem } from '../../shared/styles/animation';

import Reveal from 'react-reveal/Reveal';

import NextLink from 'next/link';
import eyeIcon from '../../../public/images/eye.svg';
import timerIcon from '../../../public/images/time.svg';

import Image from 'next/image';
import arrowIcon from '../../../public/images/arrow.svg';
import { useRouter } from 'next/router';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import { GetStaticPaths } from 'next';
import Header from '../../shared/components/Header';
import Footer from '../../shared/Footer';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface Post {
  uid?: string;
  first_publication_date?: string;
  data: {
    title: string;
    subtitle: string;
    author: string;
    banner: {
      url: string;
    };
    content?: {
      heading?: string;
      body?: {
        text?: string;
      }[];
    }[];
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
  slugRes?: {
    data: {
      content?: {
        heading?: string;
        body?: {
          text?: string;
        }[];
      }[];
    };
  };
}

interface HomeProps {
  posts: Post[];
}

export default function News({ posts }: any) {
  console.log('postagens', posts);

  const formattedPosts = posts.map(post => {
    return {
      uid: post.uid,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        banner: {
          url: post.data.banner.url,
        },
        content: post.data.content.map(content => {
          return {
            heading: content.heading,
            body: [...content.body],
          };
        }),
      },
    };
  });

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

  return (
    <>
      <Reveal>
        <Flex
          id="section-home"
          p="10"
          flexDir="column"
          w="100%"
          mx="auto"
          maxW={1400}
          h="100%"
        >
          <Heading
            bgColor="purple.900"
            color="white"
            px="5"
            py="2"
            mx="auto"
            mt={['1rem', '1rem', '3rem']}
            fontFamily="Raleway"
            boxShadow="sm"
            mb="4rem"
          >
            <Reveal>Novidades</Reveal>
          </Heading>

          <Grid
            mx="auto"
            mb="2rem"
            gap={10}
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
            ]}
          >
            <Reveal>
              {posts.map(post => (
                <MotionGridItem whileHover={{ scale: 1.04 }}>
                  <NextLink href={`/novidades/${post.uid}`}>
                    <Flex cursor={'pointer'} mx="auto" flexDir="column">
                      <Flex
                        flexDir="column"
                        bgColor="#C4C4C4"
                        w="100%"
                        maxW="443px"
                        h="441px"
                        boxShadow="sm"
                        _hover={{ boxShadow: '2xl' }}
                      >
                        <Image
                          src={post.data.banner.url}
                          width={443}
                          height={441}
                          layout="responsive"
                          objectFit="cover"
                          quality={75}
                        />
                        <Box
                          px="5"
                          w="100%"
                          h="197px"
                          justifyContent="flex-end"
                          bgColor="white"
                        >
                          <Heading
                            mt="1rem"
                            fontSize="22px"
                            fontFamily="Roboto"
                            textAlign="left"
                          >
                            {post.data.title}
                          </Heading>

                          <Flex w="100%" mb="1rem" alignSelf="initial">
                            <Flex mt="2rem" align="center">
                              <Icon fontSize="1.2rem" as={timerIcon} />
                              <Text fontSize={['12px', '12px', '15px']} ml="2">
                                {' '}
                                {post.first_publication_date}{' '}
                              </Text>
                              <Divider
                                ml="1.4rem"
                                borderColor="purple.900"
                                orientation="vertical"
                                mr={['-1rem']}
                              />
                            </Flex>

                            <Flex ml="2rem" mt="2rem" align="center">
                              <Icon fontSize="1.2rem" as={eyeIcon} />
                              <Text fontSize={['12px', '12px', '15px']} ml="2">
                                {post.data.readTime} min de leitura
                              </Text>
                            </Flex>
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex
                        mt="1rem"
                        bgColor="white"
                        width="100%"
                        boxShadow="sm"
                        h="80px"
                        justify="space-between"
                        align="center"
                        px="1rem"
                        _hover={{ boxShadow: '2xl' }}
                      >
                        <Flex align="center">
                          <Avatar
                            name="Luana Tavares"
                            src="/images/luanaAvatar.jpg"
                          />
                          <Text
                            fontSize={['12px', '12px', '15px']}
                            ml="5"
                            color="purple.500"
                          >
                            {' '}
                            Luana Tavares{' '}
                          </Text>
                        </Flex>
                        <Flex align="center">
                          <Text
                            fontSize={['12px', '12px', '15px']}
                            ml="auto"
                            color="purple.500"
                            fontWeight="700"
                          >
                            Ler artigo
                          </Text>
                          <Icon
                            mt="2"
                            ml="1rem"
                            fontSize="1.3rem"
                            as={arrowIcon}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </NextLink>
                </MotionGridItem>
              ))}
            </Reveal>
          </Grid>
          <Flex ml="auto" align="center">
            <NextLink href="/novidades" passHref>
              <Button
                color="white"
                mt="1rem"
                mb="1.5rem"
                w="100%"
                px="5"
                borderRadius="0"
                h="60px"
                bgColor="purple.900"
                _hover={{
                  backgroundColor: 'transparent',
                  color: 'purple.900',
                  border: 'solid 1px #690da6',
                }}
                _active={{
                  border: 'transparent',
                  outline: 'transparent',
                }}
                _focus={{
                  border: 'transparent',
                  outline: 'transparent',
                }}
              >
                {' '}
                Ver todos os posts <Icon ml="1rem" as={ChevronRightIcon} />{' '}
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Reveal>
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
  const { slug } = context.params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('publications', String(slug), {});

  //@ts-ignore
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'publications')],
    {
      pageSize: 2,
      orderings: '[document.first_publication_date desc]',
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
        banner: {
          url: post.data.banner.url,
        },
        content: post.data.content.map(content => {
          return {
            heading: content.heading,
            body: [...content.body],
          };
        }),
      },
    };
  });

  const slugResponse = {
    data: {
      content: response.data.content.map((content: any) => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  console.log(JSON.stringify(posts), null, 2, 'postagens');

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
    slugRes: slugResponse,
  };

  console.log(JSON.stringify(postsResponse.results), null, 2);

  return {
    props: {
      postsPagination,
    },
  };
};
