import {
  Flex,
  Heading,
  Button,
  useBreakpointValue,
  Spinner,
  Icon,
  InputProps,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Input } from '../../shared/components/Form/Input';
import luanaFoto from '../../../public/images/luana-foto.jpg';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ChatIcon } from '@chakra-ui/icons';

import Reveal from 'react-reveal/Reveal';

import NextLink from 'next/link';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

export default function FormView() {
  const formSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório.'),
    email: yup.string().required('Email obrigatório.').email('Email inválido.'),
    whatsapp: yup
      .number()
      .typeError('Deve ser um número')
      .required('Whatsapp é obrigatório.'),

    state: yup.string().required('Seu estado é obrigatório'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

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

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<InputProps> = async data => {
    try {
      setLoading(true);
      await fetch('/api/getNewsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => console.log(response))

        .catch(error => {
          console.log(error);
          tostFailure();
        });
      toastSucess();
      setLoading(false);
    } catch (err) {
      console.log(err);
      tostFailure();
    }
  };
  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    xl: false,
    lg: false,
  });

  return (
    <Flex
      maxW="1440px"
      h={['100%', '100%', '100%', '100%', '600px']}
      mb={['5rem', '5rem', '7rem']}
      mx="auto"
      mt={['0', '0', '2rem']}
      align="center"
      justify="center"
      flexDir={['column', 'column', 'row']}
      px={['2.5rem']}
    >
      <Flex
        bgImage="url('/images/luana-foto.jpg')"
        bgRepeat="no-repeat"
        bgPosition={['-60px', '-60px', '0']}
        bgSize={['cover', 'cover', 'cover', 'cover']}
        mr="auto"
        borderRadius="15px"
        boxShadow="2xl"
        h={['400px', '400px', '400px', '600px']}
        w="100%"
        maxW={['700px']}
        flexDir="column"
        mt={['3rem', '3rem', '0']}
      >
        <Reveal>
          <Heading
            fontFamily="Raleway"
            fontSize={['28px', '28px', '32px', '42px']}
            maxW={['250px', '250px', '390px']}
            fontWeight="700"
            px="2rem"
            color="white"
            mt={['2.6rem', '2.6rem', '5rem']}
          >
            Quer ajudar a modernizar o Brasil?
          </Heading>
        </Reveal>
        <Reveal>
          <NextLink
            href="https://api.whatsapp.com/send?phone=5511939430303&text=Ol%C3%A1%20Luana,%20quero%20participar%20da%20mudan%C3%A7a%20na%20pol%C3%ADtica!"
            passHref
          >
            <Button
              id="form-control"
              mt="3rem"
              mx="2rem"
              w={['160px', '160px', '200px']}
              h={['45px', '45px', '60px', '60px']}
              fontFamily="Raleway"
              bgColor="#690da6"
              color="white"
              borderRadius="0"
              boxShadow="2xl"
              _hover={{
                background: 'white',
                color: '#690da6',
                border: '1px solid #690da6',
              }}
              _focus={{
                border: 'none',
                outline: 'transparent',
              }}
              _active={{
                border: 'none',
                outline: 'transparent',
              }}
            >
              <Icon mr="10px" as={ChatIcon} /> Fale comigo!
            </Button>
          </NextLink>
        </Reveal>
      </Flex>
      <Flex
        mt={['4rem', '4rem', '0']}
        mx="auto"
        px={['1rem', '1rem', '4rem']}
        flex="1"
        ml="auto"
        flexDir="column"
        w="100%"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading
          mt={['0.5rem', '0.5rem', '1.5rem']}
          fontSize={['32px', '32px', '48px']}
          fontWeight="bold"
          mx="auto"
        >
          Inscreva-se
        </Heading>

        <Reveal>
          <Input
            mt={['1.5rem', '1.5rem', '4rem']}
            h="60px"
            label="Seu nome"
            name="name"
            {...register('name')}
            error={errors.name}
          />
          <Input
            mt="1rem"
            h="60px"
            {...register('email')}
            error={errors.email}
            label="Seu email"
            name="email"
          />
          <Input
            mt="1rem"
            h="60px"
            {...register('whatsapp')}
            error={errors.whatsapp}
            label="Seu WhatsApp"
            name="whatsapp"
          />
          <Input
            mt="1rem"
            h="60px"
            {...register('state')}
            error={errors.state}
            label="Seu Estado"
            name="state"
          />
          <Button
            bgColor="purple.900"
            color="white"
            w="200px"
            h="60px"
            ml={isMobile ? '' : 'auto'}
            mx={isMobile ? 'auto' : ''}
            mt={['10', '10', '4rem']}
            borderRadius="0"
            type="submit"
            boxShadow="2xl"
            _hover={{
              background: 'white',
              color: '#690da6',
              border: '1px solid #690da6',
            }}
            _focus={{
              border: 'none',
              outline: 'transparent',
            }}
            _active={{
              border: 'none',
              outline: 'transparent',
            }}
          >
            {loading ? <Spinner /> : 'Enviar'}
          </Button>
        </Reveal>
      </Flex>
    </Flex>
  );
}
