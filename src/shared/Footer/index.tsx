import {
  Flex,
  Grid,
  GridItem,
  Text,
  Button,
  List,
  ListItem,
  Heading,
  useBreakpointValue,
  Divider,
  Image,
  Spinner,
  Icon,
  Box,
} from '@chakra-ui/react';
import IconCall from './icons/IconCall';
import IconMail from './icons/IconMain';
import { Input } from '../components/Form/Input';
import LocationIcon from './icons/LocationIcon';
import IconInstagram from './icons/IconInstagram';
import IconFacebook from './icons/IconFacebook';
import IconLinkedin from './icons/IconLinkedin';
import IconYoutube from '../../../public/images/iconYoutube.svg';

import spotifyIcon from '../../../public/images/spotify2.svg';

import NextLink from 'next/link';

import headerLogo from '../../../public/images/luanaLogo4.svg';

import { toast } from 'react-toastify';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';

interface InputProps {
  email?: string;
  errors?: FieldError;
}

interface IDataProps {
  contact: {
    email: string;
  };
}

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const simulatorRequest = () => {
    setLoading(true);
    setTimeout(() => {
      toastSucess();
      setLoading(false);
    }, 1000);
  };

  function toastSucess() {
    toast.success('Sucesso! Obrigado pelo contato.', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  function tostFailure() {
    toast.error('Este email já está cadastrado!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  const formSchema = yup.object().shape({
    email: yup.string().required('Email obrigatório.').email('Email inválido.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<InputProps> = async data => {};

  console.log(errors);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
    xl: true,
  });

  return (
    <>
      <Flex
        as="footer"
        w="100%"
        h={['100%', '100%', '100%', '296px']}
        bgColor="purple.900"
        mt={['2rem', '2rem', '0rem']}
        mx="auto"
        justify="center"
        align="center"
        alignItems="center"
      >
        {isWideVersion ? (
          <>
            <Flex
              maxW={1400}
              h="100%"
              w="100%"
              mx="auto"
              alignItems="center"
              flexDir="column"
              justify="center"
              align="center"
            >
              <Grid
                mx="2rem"
                h="80%"
                py="2rem"
                templateColumns="repeat(4, 1fr)"
                gap={20}
              >
                <Flex justify="space-around" flexDir="column">
                  <Flex mt="-3rem" ml="0.7rem">
                    <NextLink href="/" passHref>
                      <Icon cursor="pointer" as={headerLogo} fontSize="10rem" />
                    </NextLink>
                  </Flex>
                  <Flex
                    mt="-4.5rem"
                    maxW="180px"
                    w="100%"
                    justify="space-between"
                  >
                    <NextLink
                      href="https://www.instagram.com/luana.tavaressp/"
                      passHref
                    >
                      <Box _hover={{ opacity: 0.6 }} cursor="pointer">
                        <IconInstagram />
                      </Box>
                    </NextLink>
                    <NextLink
                      passHref
                      href="https://www.facebook.com/luana.tavaressp/"
                    >
                      <Box _hover={{ opacity: 0.6 }} cursor="pointer">
                        <IconFacebook />
                      </Box>
                    </NextLink>
                    <NextLink
                      href="https://www.linkedin.com/in/luana-tavares-/"
                      passHref
                    >
                      <Box _hover={{ opacity: 0.6 }} cursor="pointer">
                        <IconLinkedin />
                      </Box>
                    </NextLink>
                    <NextLink
                      href="https://open.spotify.com/show/1AI4vSnHDfzFnQt5NVy2gn"
                      passHref
                    >
                      <Box _hover={{ opacity: 0.6 }} cursor="pointer">
                        <Icon as={spotifyIcon} fontSize="1.5rem" />
                      </Box>
                    </NextLink>
                    <NextLink
                      href="https://www.youtube.com/channel/UCdRbexOJS7fcvA3OU-8-a0g"
                      passHref
                    >
                      <Box
                        transition="2ms ease"
                        _hover={{ opacity: 0.6 }}
                        cursor="pointer"
                      >
                        <Icon as={IconYoutube} fontSize="1.5rem" />
                      </Box>
                    </NextLink>
                  </Flex>
                </Flex>

                <Flex
                  justify={['center', 'center', 'space-around']}
                  flexDir="column"
                >
                  <List color="white">
                    <ListItem fontFamily="Raleway" fontWeight="700" mb="1rem">
                      Navegação
                    </ListItem>

                    <NextLink href="/novidades" passHref>
                      <ListItem cursor="pointer" mb="1rem">
                        Novidades
                      </ListItem>
                    </NextLink>
                    <NextLink href="/peticoes" passHref>
                      <ListItem cursor="pointer" mb="1rem">
                        Petições
                      </ListItem>
                    </NextLink>
                  </List>
                </Flex>
                <GridItem mt="1.5rem">
                  <List color="white">
                    <ListItem mb="1rem" fontFamily="Raleway" fontWeight="700">
                      Outros
                    </ListItem>
                    <NextLink
                      href="https://conecta.luanatavaressp.com.br/"
                      passHref
                    >
                      <ListItem cursor="pointer" mb="1rem">
                        Conecta
                      </ListItem>
                    </NextLink>
                    <NextLink href="/contato" passHref>
                      <ListItem cursor="pointer" mb="1rem">
                        Contato
                      </ListItem>
                    </NextLink>
                  </List>
                </GridItem>
                <GridItem>
                  <Flex
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    method="post"
                    flexDir="column"
                    mt="1rem"
                  >
                    <Text
                      as="h4"
                      fontSize="16px"
                      fontFamily="Raleway"
                      fontWeight="700"
                      color="white"
                      mb="1rem"
                    >
                      {' '}
                      Inscreva-se em nossa newsletter{' '}
                    </Text>
                    <Input
                      mb="0.5rem"
                      id="email"
                      name="email"
                      type="email"
                      _hover={{
                        bgColor: 'white',
                      }}
                      borderRadius="0"
                      label="Seu email"
                      {...register('email')}
                      error={errors.email}
                    />

                    <Button
                      mb="1rem"
                      border="solid 1px #fff"
                      color="purple.900"
                      h="45px"
                      borderRadius="0"
                      bgColor="white"
                      _hover={{ bgColor: 'purple.900', color: 'white' }}
                      type="submit"
                      onClick={() => simulatorRequest()}
                    >
                      {loading ? <Spinner /> : 'Enviar'}
                    </Button>
                  </Flex>
                </GridItem>
              </Grid>

              <Flex
                justify="center"
                alignItems="center"
                align="center"
                mx="auto"
              >
                <Text fontSize="14px" color="#ffffff">
                  Copyright © 2022 Luana Tavares | developed with 💜 by{' '}
                  <span>
                    {' '}
                    <a href="https://justecnologia.com.br">
                      juste software house
                    </a>{' '}
                  </span>
                </Text>
              </Flex>
            </Flex>
          </>
        ) : (
          <Flex
            maxW={780}
            px="2rem"
            h="100%"
            w="100%"
            my="2rem"
            mx="auto"
            flexDir={['column']}
          >
            <Flex px="1.5rem" mt="1.5rem" justify="space-between">
              <Flex flexDir="column">
                <Heading
                  mb="0.5rem"
                  fontFamily="Raleway"
                  color="white"
                  fontSize="16px"
                >
                  Navegação
                </Heading>
                <Divider
                  color="white"
                  size="10px"
                  mb="0.5rem"
                  orientation="horizontal"
                />
                <List color="white">
                  <NextLink href="/novidades">
                    <ListItem cursor="pointer" mt="1rem">
                      Novidades
                    </ListItem>
                  </NextLink>
                  <NextLink href="https://conecta.luanatavaressp.com.br/">
                    <ListItem cursor="pointer" mt="1rem">
                      Conecta
                    </ListItem>
                  </NextLink>
                </List>
              </Flex>
              <Flex mr={['0.5rem']} flexDir="column">
                <Heading
                  mb="0.5rem"
                  fontFamily="Raleway"
                  color="white"
                  fontSize="16px"
                >
                  Outros
                </Heading>
                <Divider
                  color="white"
                  size="10px"
                  mb="0.5rem"
                  orientation="horizontal"
                />
                <List color="white">
                  <NextLink href="/peticoes" passHref>
                    <ListItem cursor="pointer" mt="1rem">
                      Petições
                    </ListItem>
                  </NextLink>
                  <NextLink passHref href="/contato">
                    <ListItem mt={['1rem', '1rem', 0]} cursor="pointer">
                      Contato
                    </ListItem>
                  </NextLink>
                </List>
              </Flex>
            </Flex>
            <Flex
              px="2rem"
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              flexDir="column"
            >
              <Heading
                mt="3.5rem"
                fontFamily="Raleway"
                color="white"
                fontSize="16px"
                mb="1rem"
              >
                Inscreva-se em nossa newsletter
              </Heading>
              <Input
                mb="0.5rem"
                id="email"
                name="email"
                type="email"
                _hover={{
                  bgColor: 'white',
                }}
                label="Seu email"
                h="60px"
                {...register('email')}
                error={errors.email}
              />
              <Button
                h="60px"
                mb="3rem"
                border="1px solid #fff"
                bgColor="pink.500"
                color="white"
                _hover={{ bgColor: 'transparent', border: '1px solid #FFF' }}
                type="submit"
                onClick={() => simulatorRequest()}
              >
                {loading ? <Spinner /> : 'Enviar'}
              </Button>
            </Flex>
            <Flex
              mx="auto"
              maxW="200px"
              w="100%"
              justifyContent="space-between"
            >
              <NextLink
                href="https://www.instagram.com/luana.tavaressp/"
                passHref
              >
                <Box
                  hover={{
                    opacity: 0.1,
                  }}
                  cursor="pointer"
                >
                  <IconInstagram />
                </Box>
              </NextLink>
              <NextLink
                passHref
                href="https://www.facebook.com/luana.tavaressp/"
              >
                <Box cursor="pointer">
                  <IconFacebook />
                </Box>
              </NextLink>
              <NextLink
                href="https://www.linkedin.com/in/luana-tavares-/"
                passHref
              >
                <Box cursor="pointer">
                  <IconLinkedin />
                </Box>
              </NextLink>
              <NextLink
                href="https://open.spotify.com/show/1AI4vSnHDfzFnQt5NVy2gn"
                passHref
              >
                <Box cursor="pointer">
                  <Icon as={spotifyIcon} fontSize="1.5rem" />
                </Box>
              </NextLink>
              <NextLink
                href="https://www.youtube.com/channel/UCdRbexOJS7fcvA3OU-8-a0g"
                passHref
              >
                <Box cursor="pointer">
                  <Icon as={IconYoutube} fontSize="1.5rem" />
                </Box>
              </NextLink>
            </Flex>
            <Flex mt={['2rem']} maxW="340px" w="100%" color="white" mx="auto">
              <Text
                mb={['2rem', '2rem', '0']}
                fontSize="12px"
                mx="auto"
                textAlign="center"
              >
                Copyright © 2022 Luana Tavares | developed with 💜 by{' '}
                <span>
                  {' '}
                  <a href="https://justecnologia.com.br">
                    juste software house
                  </a>{' '}
                </span>
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
}
