import React from 'react';
import { Box, Flex, Heading, BoxProps } from '@chakra-ui/react';

interface TopNavbarProps extends BoxProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  title: string;
  isFixed?: boolean;
}

const Navbar = ({ 
  leftContent, 
  rightContent, 
  title, 
  isFixed = false, 
  ...rest 
}: TopNavbarProps) => {
  return (
    <Box
      as="nav"
      bg="white"
      boxShadow="md"
      width="100%"
      zIndex={1000}
      {...(isFixed ? {
        position: "fixed",
        top: 0,
        left: 0,
      } : {})}
      {...rest}
    >
      <Flex 
        justify="space-between" 
        align="center" 
        maxWidth="container.xl" 
        margin="0 auto"
        height="44px"
        px={4}
      >
        <Box width="80px">
          {leftContent}
        </Box>
        <Heading size="md" textAlign="center" flex={1} color="black">
          {title}
        </Heading>
        <Box width="80px" textAlign="right">
          {rightContent}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;