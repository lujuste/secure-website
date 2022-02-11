import { Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Header from '../../shared/components/Header';
import Footer from '../../shared/Footer';
import NextLink from 'next/link';
import { TimeIcon } from '@chakra-ui/icons';
import Head from 'next/head';

export default function Petitions() {
  return (
    <>
      <Head>
        <title>Petições - Luana Tavares </title>
        <meta
          name="description"
          content="Luana Tavares é especialista em Políticas Públicas e Ativista para modernização do Estado, Administradora, publicitária e desenvolvedora de lideranças."
        />
        <meta charSet="utf-8" />
        <meta
          property="og:title"
          content="Luana Tavares - Não podemos desistir do brasil"
          key="ogtitle"
        />
        +{' '}
        <meta
          property="og:description"
          content="Luana Tavar  es é especialista em Políticas Públicas e Ativista para modernização do Estado, Administradora, publicitária e desenvolvedora de lideranças."
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
      <Flex flexDir="column" w="100%" h="80vh" maxW="1400" mx="auto" mb="2rem">
        <Flex
          mx="auto"
          flexDir="column"
          w="100%"
          maxW="1400"
          h="100%"
          px={['1rem', '1rem', '0']}
          mb="2rem"
        >
          <Heading
            bgColor="purple.900"
            color="white"
            px="8"
            py="2"
            maxH="60px"
            mx="auto"
            mt={['8rem', '8rem', '9rem']}
            fontFamily="Raleway"
            boxShadow="2xl"
            mb={['1rem', '1rem', '2rem']}
          >
            Petições
          </Heading>

          <NextLink href="https://conecta.luanatavaressp.com.br/">
            <Flex
              align="center"
              my="1.5rem"
              mx="auto"
              flexDir="column"
              maxW={['300px', '300px', '800px']}
            >
              <Text
                maxW="1000px"
                fontWeight={'bold'}
                fontSize={['1.2rem', '1.2rem', '2rem']}
                fontFamily={'Raleway'}
                mx="auto"
                textAlign="left"
                _hover={{ color: 'pink.500' }}
                cursor="pointer"
              >
                Inscreva-se para participar da Conecta: aceleradora de mulheres
                na política.
              </Text>
              <Text
                fontSize={['14px', '14px', '16px']}
                align="center"
                mt="0.5rem"
                mr="auto"
              >
                <Icon mt="-0.3rem" mr="0.2rem" align="center" as={TimeIcon} />{' '}
                17 de jan de 2022
              </Text>
            </Flex>
          </NextLink>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
