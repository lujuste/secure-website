import { Flex, Heading, Text, Grid, GridItem, Box } from '@chakra-ui/react';
import BiographyItem from '../BiographyItem';
import Reveal from 'react-reveal/Reveal';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';

interface Biographies {
  uid: string;
  image: string;
  content: {
    description: string;
  }[];
}

export default function WhoIsLuana({ bios, biosTwo, biosThree }: any) {
  console.log(bios, 'este é bios');

  console.log(biosThree, 'TEAQUI TESTEAQUI');

  console.log(biosTwo, 'biosTwoooo!!!');
  const obj = bios.map(item => {
    return {
      uid: item.uid,
    };
  });

  const formattedText2 = biosTwo[0].content[0];
  const formattedText3 = biosThree[0].content[0];
  const formattedText = bios[0].content[0];

  console.log(bios, 'aqui inicia');

  console.log(formattedText3, 'texto funfa?!?!');

  const image3 = biosThree[0].image;
  const image1 = bios[0].image;
  const image2 = biosTwo[0].image;

  console.log(image1, 'bate a image?');
  console.log(image2, 'bate a image?');

  return (
    <>
      <Flex
        mx="auto"
        textAlign="center"
        justify="center"
        w="100%"
        h="100%"
        bgColor="purple.900"
        flexDir="column"
        py="1rem"
        pt="4rem"
      >
        <Reveal>
          <Heading
            mt={['0', '0', '2rem']}
            fontSize={['28px', '28px', '32px', '48px']}
            color="white"
            fontWeight="400"
            fontFamily="Raleway"
            mb="4rem"
          >
            Conheça{' '}
            <Text as="span" px="1rem" fontWeight="600" bgColor="pink.300">
              Luana Tavares
            </Text>
          </Heading>
        </Reveal>

        <Reveal>
          <BiographyItem
            image={image1}
            flexDir={['column', 'column', 'column', 'row']}
            paragraph={formattedText.description}
          />
        </Reveal>

        <Reveal>
          <BiographyItem
            image={image2}
            flexDir={['column', 'column', 'column', 'row-reverse']}
            paragraph={formattedText2.description}
          />
        </Reveal>

        <Reveal>
          <BiographyItem
            image={image3}
            flexDir={['column', 'column', 'column', 'row']}
            paragraph={formattedText3.description}
          />
        </Reveal>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postBiography = await prismic.query([
    Prismic.predicates.at('document.type', 'biography'),
  ]);

  console.log(postBiography);

  return {
    props: {},
  };
};
