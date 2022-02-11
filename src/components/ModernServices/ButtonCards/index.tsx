import { MotionButton } from '../../../shared/styles/animation';
import NextLink from 'next/link';

interface callToActionProps {
  callToAction: string;
  href?: string;
}

export default function ButtonCards({ callToAction, href }: callToActionProps) {
  return (
    <>
      <NextLink href={href} passHref>
        <MotionButton
          w="264px"
          h="50px"
          mt={['2rem', '2rem', '0']}
          fontFamily="Roboto"
          fontWeight="700"
          fontSize="14px"
          bgColor="#690da6"
          color="white"
          mx="auto"
          boxShadow="2xl"
          borderRadius="0"
          _focus={{ border: 'none' }}
          _hover={{
            bgColor: '#fff',
            color: 'pink.900',
            border: '1px solid #690da6',
          }}
          whileTap={{ scale: 1.04 }}
          whileHover={{ scale: 1.04 }}
        >
          {callToAction}
        </MotionButton>
      </NextLink>
    </>
  );
}
