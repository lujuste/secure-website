import type { GetStaticPaths, NextPage } from 'next';
import FormView from '../components/FormView';
import HomeScreen from '../components/HomeScreen';

import News from '../components/News';
import WhoIsLuana from '../components/WhoIsLuana';
import Header from '../shared/components/Header';
import Footer from '../shared/Footer';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';
import { useState } from 'react';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import ModernServices from '../components/ModernServices';
import { RichText } from 'prismic-dom';
import Head from 'next/head';

interface Biographies {
  uid: string;
  image: string;
  content: {
    description: string;
  }[];
}

interface Post {
  uid?: string;
  first_publication_date?: string;
  data: {
    title: string;
    subtitle: string;
    author: string;
    readTime?: number;
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
}

interface HomeProps {
  postsPagination: PostPagination;
  biographies: Biographies;
  biographiesTwo: Biographies;
  biographiesThree: Biographies;
}

const Home = ({
  postsPagination,
  biographies,
  biographiesTwo,
  biographiesThree,
}: HomeProps): JSX.Element => {
  console.log(biographies, 'testando front prop');
  console.log(biographiesTwo, 'testandoNunNum2');
  console.log(biographiesThree, 'testandoNunNum333!!!!');

  function getReadTime(item: Post): number {
    const totalWords = item.data.content.reduce((total, contentItem) => {
      //@ts-ignore
      total += contentItem.heading.split(' ').length;

      const words = contentItem.body.map(i => i.text.split(' ').length);
      words.map(word => (total += word));
      return total;
    }, 0);

    return Math.ceil(totalWords / 200);
  }

  const formattedPost = postsPagination.results.map(post => {
    const readTime = getReadTime(post);
    return {
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        { locale: ptBR }
      ),
      data: {
        ...post.data,
        readTime,
      },
    };
  });

  const newPosts = postsPagination.results.map((post: Post) => {
    const readTime = getReadTime(post);

    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
        banner: {
          url: post.data.banner.url,
        },
        readTime,
        content: post.data.content.map((content: any) => {
          return {
            heading: content.heading,
            body: [...content.body],
          };
        }),
      },
    };
  });

  return (
    <>
      <Head>
        <title>Luana Tavares - Não podemos desistir do brasil </title>
        <meta
          name="description"
          content="Luana Tavares é especialista em Políticas Públicas e Ativista para modernização do Estado, Administradora, publicitária e desenvolvedora de lideranças."
        />
        <meta charSet="utf-8" />
        <meta
          property="og:title"
          content="Rede de Mulheres Brasileiras Líderes pela Política"
          key="ogtitle"
        />
        +{' '}
        <meta
          property="og:description"
          content="Luana Tavares é especialista em Políticas Públicas e Ativista para modernização do Estado, Administradora, publicitária e desenvolvedora de lideranças."
          key="ogdesc"
        />
        <meta
          property="og:url"
          content={'https://www.luanatavaressp.com.br'}
          key="ogurl"
        />
        <meta
          property="og:site_name"
          content="Luana Tavares é especialista em Políticas Públicas e Ativista para modernização do Estado, Administradora, publicitária e desenvolvedora de lideranças."
          key="ogsitename"
        />
      </Head>
      <Header />
      <HomeScreen />
      <News posts={newPosts} />
      <WhoIsLuana
        bios={biographies}
        biosTwo={biographiesTwo}
        biosThree={biographiesThree}
      />
      <ModernServices />
      <FormView />
      <Footer />
    </>
  );
};

export default Home;

//@ts-ignore
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  //@ts-ignore
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'publications')],
    {
      pageSize: 3,
      orderings: '[document.first_publication_date desc]',
    }
  );

  const postBiography = await prismic.query([
    Prismic.predicates.at('document.type', 'biography'),
  ]);

  const postBiographyTwo = await prismic.query([
    Prismic.predicates.at('document.type', 'biography2'),
  ]);

  const postBiographyThree = await prismic.query([
    Prismic.predicates.at('document.type', 'biography4'),
  ]);

  console.log(JSON.stringify(postBiography.results), null, 2);

  const biographies = postBiography.results.map(bio => {
    return {
      uid: bio.id,
      image: bio.data.image.url,
      content: bio.data.description.map(content => {
        return {
          description: content.text,
        };
      }),
    };
  });

  const biographiesTwo = postBiographyTwo.results.map(bio => {
    return {
      uid: bio.id,
      image: bio.data.image.url,
      content: bio.data.description.map(content => {
        return {
          description: content.text,
        };
      }),
    };
  });

  const biographiesThree = postBiographyThree.results.map(bio => {
    return {
      uid: bio.id,
      image: bio.data.image.url,
      content: bio.data.description.map(content => {
        return {
          description: content.text,
        };
      }),
    };
  });

  console.log(biographiesThree, 'VAMOS VER');

  console.log(JSON.stringify(biographies, null, 2), 'aquiii');
  console.log(biographies);

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
        content: post.data.content.flatMap(content => {
          return {
            heading: content.heading,
            body: [...content.body],
          };
        }),
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
      biographies,
      biographiesTwo,
      biographiesThree,
    },
    revalidate: 1,
  };
};
