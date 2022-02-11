import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Progress,
  Text,
  useBreakpoint,
  useBreakpointValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Header from '../../shared/components/Header';
import Footer from '../../shared/Footer';
import { Input } from '../../shared/components/Form/Input';
import { FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

interface InputProps {
  name: string;
  email?: string;
  errors?: FieldError;
}

export default function PetitionAmazonia() {
  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
    md: false,
    xl: false,
  });

  function toastSucess() {
    toast.success('Sucesso! Assinatura registrada.', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  const toastNew = useToast();

  function tostFailure() {
    toast.error('Este email já está registrado!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  function toastWarning() {
    toast.warning('Você antes precisa autorizar o LGPD.', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);

  const formSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório.'),
    email: yup.string().required('Email obrigatório.').email('Email inválido.'),
    telefone: yup
      .number()
      .typeError('Deve ser um número')
      .required('Seu número é obrigatório.'),
  });

  const [signatureData, setSignatureData] = useState([]);
  const [countSignature, setCountSignature] = useState(0);
  const [assign, setAssign] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit: SubmitHandler<InputProps> = async data => {
    console.log(data);
    try {
      setLoading(true);
      await fetch('/api/getUndersigned', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response =>
          toastNew({
            title: response.message,
            duration: 3000,
            isClosable: true,
          })
        )

        .catch(error => {
          console.log(error);
          tostFailure();
        });

      setLoading(false);
      getDataSignature();
    } catch (err) {
      console.log(err);
      tostFailure();
    }
  };

  const getDataSignature = async () => {
    setLoading(true);
    const { data } = await axios.get('/api/getSignatures');
    const newCount = await data.length;
    console.log(newCount);

    setCountSignature(newCount);
    setLoading(false);
  };

  useEffect(() => {
    getDataSignature();
  }, []);

  console.log(countSignature, 'teste de assinaturas');

  const targetSignature = 100;

  const valueSignatures = (targetSignature * countSignature) / 100;

  console.log('calc assinatura', valueSignatures);

  return (
    <>
      <Header />

      <Flex
        onSubmit={handleSubmit(onSubmit)}
        mx="auto"
        w="100%"
        h="100%"
        flexDir="column"
      >
        <Flex mt="4rem" mx="auto">
          {isMobile ? (
            <Image
              src="/images/amazonia.jpeg"
              width={1200}
              objectFit="cover"
              height={1000}
              quality={100}
            />
          ) : (
            <Image
              src="/images/amazonia.jpeg"
              width={1245}
              objectFit="cover"
              height={463}
              quality={100}
            />
          )}
        </Flex>
        <Flex
          flexDir={['column', 'column', 'row']}
          maxW="1400"
          mx="auto"
          as="form"
          mt={['0rem', '0rem', '0']}
        >
          <Grid
            templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', '1fr, 2fr']}
          >
            <Flex flexDir={['column', 'column', 'row']} flex="1" mx="auto">
              <GridItem
                position={['relative', 'relative', 'sticky']}
                h="100%"
                w="100%"
                maxW={['500px', '500px', '400px']}
                bgColor="pink.500"
              >
                <Flex py="8" px="2rem" flexDir="column">
                  <Text
                    mx="auto"
                    textAlign={'center'}
                    my="2"
                    fontSize="1rem"
                    color="white"
                    fontFamily={'Raleway'}
                    maxW="280px"
                    fontWeight={'700'}
                  >
                    {`${countSignature} pessoas já assinaram, ajude-nos a chegar em ${targetSignature} assinaturas`}
                  </Text>
                  <Progress
                    my="0.5rem"
                    hasStripe
                    value={valueSignatures}
                    colorScheme="blue"
                    isIndeterminate={loading ? true : false}
                  />
                  <Flex mt="1rem" justify="space-around" flexDir="column">
                    <Input
                      {...register('name')}
                      error={errors.name}
                      my="2"
                      name="name"
                      label="Seu nome"
                      _hover={{ bgColor: 'white' }}
                    />
                    <Input
                      {...register('email')}
                      error={errors.email}
                      my="2"
                      name="email"
                      label="Seu email"
                      _hover={{ bgColor: 'white' }}
                    />
                    <Input
                      {...register('telefone')}
                      error={errors.telefone}
                      my="2"
                      name="telefone"
                      label="Seu telefone"
                      _hover={{ bgColor: 'white' }}
                    />
                  </Flex>
                </Flex>
                <Flex mt="-1rem">
                  <Button
                    bgColor="purple.900"
                    px="5"
                    mb={['3rem', '3rem', '0']}
                    color="white"
                    borderRadius="0"
                    border={'1px solid #fff '}
                    h="43px"
                    mx="auto"
                    type="submit"
                  >
                    Assinar petição!
                  </Button>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex my="2rem" px="2rem" maxW="900px" flexDir="column">
                  <Heading mb="1rem">
                    Assine para ajudar a salvar o meio ambiente e acabar com os
                    desmatamentos na amazônia
                  </Heading>
                  <Text mb="1rem">Publicado em 12 mar de 2022</Text>
                  <Text textAlign="justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam dolor sapien, vulputate eu diam at, condimentum
                    hendrerit tellus. Nam facilisis sodales felis, pharetra
                    pharetra lectus auctor sed. Ut venenatis mauris vel libero
                    pretium, et pretium ligula faucibus. Morbi nibh felis,
                    elementum a posuere et, vulputate et erat. Nam venenatis.
                    Nulla auctor sit amet quam vitae commodo. Sed risus justo,
                    vulputate quis neque eget, dictum sodales sem. In eget felis
                    finibus, mattis magna a, efficitur ex. Curabitur vitae justo
                    consequat sapien gravida auctor a non risus. Sed malesuada
                    mauris nec orci congue, interdum efficitur urna dignissim.
                    Vivamus cursus elit sem, vel facilisis nulla pretium
                    consectetur. Nunc congue. Class aptent taciti sociosqu ad
                    litora torquent per conubia nostra, per inceptos himenaeos.
                    Aliquam consectetur massa nec metus condimentum, sed
                    tincidunt enim tincidunt. Vestibulum fringilla risus sit
                    amet massa suscipit eleifend. Duis eget metus cursus,
                    suscipit ante ac, iaculis est. Donec accumsan enim sit amet
                    lorem placerat, eu dapibus ex porta. Etiam a est in leo
                    pulvinar auctor. Praesent sed vestibulum elit, consectetur
                    egestas libero. Ut varius quis velit sed cursus. Nunc libero
                    ante, hendrerit eget consectetur vel, viverra quis lectus.
                    Sed vulputate id quam nec tristique. Etiam lorem purus,
                    imperdiet et porta in, placerat non turpis. Cras pharetra
                    nibh eu libero ullamcorper, at convallis orci egestas. Fusce
                    ut est tellus. Donec ac consectetur magna, nec facilisis
                    enim. Sed vel tortor consectetur, facilisis felis non,
                    accumsan risus. Integer vel nibh et turpis. Nam eu
                    sollicitudin neque, vel blandit dui. Aliquam luctus aliquet
                    ligula, sed: Suspendisse ac facilisis leo. Sed nulla odio,
                    aliquam ut lobortis vitae, viverra quis risus. Vivamus
                    pulvinar enim sit amet elit porttitor bibendum. Nulla
                    facilisi. Aliquam libero libero, porta ac justo vitae,
                    dapibus convallis sapien. Praesent a nibh pretium, ultrices
                    urna eget, vulputate felis. Phasellus ac sagittis ipsum, a
                    congue lectus. Integer interdum ut velit vehicula volutpat.
                    Nulla facilisi. Nulla rhoncus metus lorem, sit amet
                    facilisis ipsum faucibus et. Lorem ipsum. Pellentesque et
                    consequat arcu, ac laoreet ante. Nam non.
                  </Text>
                  <Text mt="1rem" textAlign="justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam dolor sapien, vulputate eu diam at, condimentum
                    hendrerit tellus. Nam facilisis sodales felis, pharetra
                    pharetra lectus auctor sed. Ut venenatis mauris vel libero
                    pretium, et pretium ligula faucibus. Morbi nibh felis,
                    elementum a posuere et, vulputate et erat. Nam venenatis.
                    Nulla auctor sit amet quam vitae commodo. Sed risus justo,
                    vulputate quis neque eget, dictum sodales sem. In eget felis
                    finibus, mattis magna a, efficitur ex. Curabitur vitae justo
                    consequat sapien gravida auctor a non risus. Sed malesuada
                    mauris nec orci congue, interdum efficitur urna dignissim.
                    Vivamus cursus elit sem, vel facilisis nulla pretium
                    consectetur. Nunc congue. Class aptent taciti sociosqu ad
                    litora torquent per conubia nostra, per inceptos himenaeos.
                    Aliquam consectetur massa nec metus condimentum, sed
                    tincidunt enim tincidunt. Vestibulum fringilla risus sit
                    amet massa suscipit eleifend. Duis eget metus cursus,
                    suscipit ante ac, iaculis est. Donec accumsan enim sit amet
                    lorem placerat, eu dapibus ex porta. Etiam a est in leo
                    pulvinar auctor. Praesent sed vestibulum elit, consectetur
                    egestas libero. Ut varius quis velit sed cursus. Nunc libero
                    ante, hendrerit eget consectetur vel, viverra quis lectus.
                    Sed vulputate id quam nec tristique. Etiam lorem purus,
                    imperdiet et porta in, placerat non turpis. Cras pharetra
                    nibh eu libero ullamcorper, at convallis orci egestas. Fusce
                    ut est tellus. Donec ac consectetur magna, nec facilisis
                    enim. Sed vel tortor consectetur, facilisis felis non,
                    accumsan risus. Integer vel nibh et turpis. Nam eu
                    sollicitudin neque, vel blandit dui. Aliquam luctus aliquet
                    ligula, sed: Suspendisse ac facilisis leo. Sed nulla odio,
                    aliquam ut lobortis vitae, viverra quis risus. Vivamus
                    pulvinar enim sit amet elit porttitor bibendum. Nulla
                    facilisi. Aliquam libero libero, porta ac justo vitae,
                    dapibus convallis sapien. Praesent a nibh pretium, ultrices
                    urna eget, vulputate felis. Phasellus ac sagittis ipsum, a
                    congue lectus. Integer interdum ut velit vehicula volutpat.
                    Nulla facilisi. Nulla rhoncus metus lorem, sit amet
                    facilisis ipsum faucibus et. Lorem ipsum. Pellentesque et
                    consequat arcu, ac laoreet ante. Nam non.
                  </Text>
                </Flex>
              </GridItem>
            </Flex>
          </Grid>
        </Flex>
      </Flex>

      <Footer />
    </>
  );
}
