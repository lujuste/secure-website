import {
  Grid,
  GridProps,
  GridItem,
  GridItemProps,
  Drawer,
  DrawerProps,
  VStack,
  StackProps,
  Text,
  TextProps,
  Flex,
  FlexProps,
  Icon,
  IconProps,
  DrawerCloseButton,
  Button,
  ButtonProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const animationFlex = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const MotionGrid = motion<GridProps>(Grid);
export const MotionGridItem = motion<GridItemProps>(GridItem);
export const MotionDrawer = motion<DrawerProps>(Drawer);
export const MotionVStack = motion<StackProps>(VStack);
export const MotionText = motion<TextProps>(Text);
export const MotionFlex = motion<FlexProps>(Flex);
export const MotionButton = motion<ButtonProps>(Button);
