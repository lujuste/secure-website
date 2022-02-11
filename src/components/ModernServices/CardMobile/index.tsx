import { Flex, Text, Button, Box } from '@chakra-ui/react';
import { ReactElement } from 'react';
import SpinButton from '../SpinButton';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import SpinButtonWhite from '../SpinButtonWhite';

interface CardMobileProps {
  title: string;
  description: string;
  image: string;
  children: ReactElement;
}

export default function CardMobile({
  title,
  description,
  image,
  children,
  ...rest
}: CardMobileProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleClick() {
    setIsFlipped(!isFlipped);
  }

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Flex
          mx="auto"
          w="100%"
          maxW="270px"
          h="290px"
          bgImage={`/images/${image}.png`}
          bgSize="cover"
          bgRepeat="no-repeat"
          align="center"
          flexDir="column-reverse"
          boxShadow="2xl"
        >
          <Button
            w="auto"
            position="absolute"
            bottom="-4"
            h="auto"
            type="button"
            bgColor="transparent"
            _hover={{ bgColor: 'transparent' }}
            border="none"
            _focus={{
              background: 'transparent',
              borderColor: 'none',
              border: 'none',
            }}
            onClick={() => handleClick()}
            _active={{
              background: 'transparent',
              borderColor: 'none',
              border: 'none',
            }}
            cursor={'pointer'}
          >
            <SpinButton />
          </Button>
          <Text
            mt="2rem"
            mb="4rem"
            color="white"
            maxW="200px"
            fontSize="16px"
            fontFamily="Raleway"
            fontWeight="700"
          >
            {title}
          </Text>
          <Flex mt="8rem"> {children}</Flex>
        </Flex>
        <Flex
          mx="auto"
          w="100%"
          maxW="270px"
          h="290px"
          bgColor="purple.900"
          justify="center"
          align="center"
          flexDir="column-reverse"
          px="2rem"
          boxShadow="2xl"
        >
          <Button
            _hover={{ bgColor: 'transparent' }}
            position="absolute"
            bottom="-4"
            color="transparent"
            onClick={() => handleClick()}
            _active={{
              background: 'transparent',
              borderColor: 'none',
              border: 'none',
            }}
            _focus={{
              background: 'transparent',
              borderColor: 'none',
              border: 'none',
            }}
          >
            <SpinButtonWhite />
          </Button>
          <Text
            color="white"
            fontSize="16px"
            fontFamily="Roboto"
            fontWeight="400"
            mt="-3rem"
          >
            {description}
          </Text>
        </Flex>
      </ReactCardFlip>
    </>
  );
}
