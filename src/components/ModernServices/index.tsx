import {
  Flex,
  Heading,
  Grid,
  GridItem,
  Box,
  Text,
  Button,
  useBreakpointValue,
  SlideFade,
} from '@chakra-ui/react';

import Reveal from 'react-reveal';

import { useState, useEffect } from 'react';

import NextLink from 'next/link';

import CardDigital from './CardDigital';
import CardInstitucional from './CardInstitucional';
import CardRebuild from './CardRebuild';
import CardPoupaTempo from './CardPoupaTempo';
import ButtonCards from './ButtonCards';
import CardMobile from './CardMobile';
import ConsultancyIcon from './CardDigital/IconDigital';
import IconTrainning from './CardInstitucional/IconInstitucional';
import IconCourses from './CardRebuild/IconCardRebuild';
import IconContract from './CardPoupaTempo/IconPoupaTempo';
import IconInstitucional from './CardInstitucional/IconInstitucional';

export default function ModernServices() {
  const [shouldShowActions, setShouldShowActions] = useState(false);

  const [lastYPos, setLastYPos] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const yPos = window.scrollY;
      const isScrollingUp = yPos > 40;

      setShouldShowActions(isScrollingUp);
    }

    window.addEventListener('scroll', handleScroll, false);

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, [lastYPos]);

  const isWideVersion = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
    lg: true,
    xl: true,
  });

  const [isFlipped, setIsFlipped] = useState(false);

  function handleClick() {
    setIsFlipped(!isFlipped);
  }

  return (
    <Flex
      as="main"
      flexDir="column"
      mx="auto"
      py={['0', '0', '5rem']}
      maxW={1400}
      mt={['-5rem', '1rem', '0']}
      justify="center"
      alignItems="center"
      alignSelf="center"
      h="100%"
    >
      {!isWideVersion ? (
        <>
          <Flex
            textAlign="center"
            mx="auto"
            maxW="280px"
            w="100%"
            justify="center"
            flexDir="column"
            mt={['9rem', '2rem', '0']}
          >
            <Reveal>
              <Heading mb="3rem" fontFamily="Raleway">
                Modernização dos
                {isWideVersion ? (
                  <Text color="white" bgColor="purple.900" as={'span'}>
                    Serviços Públicos{' '}
                  </Text>
                ) : (
                  <Text color="white" bgColor="purple.900">
                    Serviços Públicos{' '}
                  </Text>
                )}
                <Text mt="2.5rem" fontWeight="400" fontSize="20px">
                  ⚠️ O que isso significa?
                </Text>
              </Heading>
            </Reveal>
            <Reveal>
              <Flex flexDir="column">
                <CardMobile
                  image="digital-transformation"
                  title="Transformação digital de serviços"
                  description="Uma economia voltada para o futuro, mais digital. Governo comprometido com a prestação de serviços de forma dinâmica, segura, desburocratizada, totalmente digital e inclusiva."
                >
                  <ConsultancyIcon />
                </CardMobile>
              </Flex>{' '}
            </Reveal>

            <Reveal>
              <Flex mt="3rem" flexDir="column">
                <CardMobile
                  image="congresso"
                  title="Oportunidade e Renda para os Jovens"
                  description="Jovens priorizados como motor para inserção econômica e social das famílias, por meio de um ensino técnico conectado ao mercado da nova economia."
                >
                  <IconCourses />
                </CardMobile>
              </Flex>
            </Reveal>
            <Reveal>
              <Flex mb="3rem" mt="3rem" flexDir="column">
                <CardMobile
                  image="group"
                  title="Representatividade Feminina"
                  description="Maior participação das mulheres na política, como ferramenta para aumentar a representatividade da democracia e a qualidade das políticas públicas de modo geral."
                >
                  <IconContract />
                </CardMobile>

                {/*<ButtonCards
                  href="https://api.whatsapp.com/send?phone=5511939430303&text=Ol%C3%A1%20Luana,%20quero%20participar%20da%20mudan%C3%A7a%20na%20pol%C3%ADtica!"
                  callToAction="Quero participar da mudança"
                />*/}
              </Flex>
            </Reveal>
          </Flex>
        </>
      ) : (
        <>
          {shouldShowActions && (
            <>
              <Heading
                mb="3rem"
                mt={['-2rem', '-2rem', '0rem', '0rem']}
                textAlign="center"
                fontFamily="Raleway"
                fontSize={['30px', '30px', '38px', '42px', '48px']}
                maxW={['700px', '700px', '700px', '800px']}
              >
                Modernização dos
                <Text color="white" bgColor="purple.900">
                  Serviços Públicos
                </Text>
                <Text
                  mt="3rem"
                  fontFamily="Roboto"
                  fontSize="32px"
                  fontWeight="light"
                  mx="auto"
                >
                  {' '}
                  ⚠️ O que isso significa?
                </Text>
              </Heading>
            </>
          )}

          <Flex
            flex="1"
            maxW="1400px"
            mx="auto"
            justify="center"
            align="center"
          >
            <Grid
              mt="2rem"
              templateColumns={[
                'repeat(1, 1fr)',
                'repeat(1, 1fr)',
                'repeat(2, 1fr)',
                'repeat(3, 1fr)',
                'repeat(3, 1fr)',
              ]}
              w="100%"
              mx="auto"
              maxW={1200}
              justifyContent="center"
              alignItems="center"
              alignSelf="center"
              flexWrap="wrap"
              gap={20}
            >
              <Reveal>
                <GridItem mb="2rem">
                  <CardDigital
                    title="Um governo mais Digital e menos Desigual"
                    description="Uma economia voltada para o futuro, mais digital. Governo comprometido com a prestação de serviços de forma dinâmica, segura, desburocratizada, totalmente digital e inclusiva."
                  />
                  <Flex></Flex>
                </GridItem>
              </Reveal>

              <Reveal>
                <GridItem mb="2rem">
                  <CardRebuild
                    title="Oportunidade e Renda para os Jovens"
                    description="Jovens priorizados como motor para inserção econômica e social das famílias, por meio de um ensino técnico conectado ao mercado da nova economia."
                  />
                  <Flex></Flex>
                </GridItem>
              </Reveal>

              <Reveal>
                <GridItem mb="2rem">
                  <CardInstitucional
                    title="Representatividade Feminina"
                    description="Maior participação das mulheres na política, como ferramenta para aumentar a representatividade da democracia e a qualidade das políticas públicas de modo geral."
                  />
                  <Flex></Flex>
                </GridItem>
              </Reveal>

              {/*   <Reveal>
                <GridItem mb="2rem">
                  <CardRebuild
                    title="Reforma do Estado"
                    description="Lorem isp Ipsum has been the industry's standard dummy text ever since the 1500s, when,"
                  />
                  <Flex>
                    <ButtonCards
                      href="https://api.whatsapp.com/send?phone=5511939430303&text=Ol%C3%A1%20Luana,%20quero%20participar%20da%20mudan%C3%A7a%20na%20pol%C3%ADtica!"
                      callToAction="Quero participar da reforma"
                    />
                  </Flex>
                </GridItem>
              </Reveal>  */}
            </Grid>
          </Flex>
        </>
      )}
    </Flex>
  );
}
