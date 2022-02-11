import {
  FormControl,
  Tooltip,
  Flex,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';

import { WarningIcon } from '@chakra-ui/icons';

import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from 'react';

import { toast } from 'react-toastify';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, type, ...rest },
  ref
) => {
  function tostFailure() {
    toast.error('Puxa! Alguma coisa deu errado.', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  return (
    <FormControl>
      {!label && <FormLabel html={name}> {label} </FormLabel>}

      <ChakraInput
        name={name}
        id={name}
        type={name}
        ref={ref}
        {...rest}
        size="lg"
        border="solid 2px"
        borderColor={error ? 'red' : '#690da6'}
        placeholder={label}
        textColor="black"
        fontSize="15px"
        bgColor="white"
        focusBorderColor="white"
        variant="filled"
        _placeholder={{
          color: '#F05B91',
        }}
        _focus={{
          bgColor: 'white',
          textColor: 'black',
          fontSize: '16px',
        }}
      />

      {!!error && (
        <Flex mt="1rem" mb="0.5rem">
          <WarningIcon h={4} w={4} color="red" mr="0.5rem" />
          <Text fontWeight="300" color="purple.900" fontSize="14px">
            {' '}
            {error.message}{' '}
          </Text>
        </Flex>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
