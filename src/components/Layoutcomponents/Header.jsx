import { Box, Button, Center, Container, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import { Link as RLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <Flex as="header" w="full" bg="blue.200" boxShadow="md">
      <Container m="auto" w="full" maxW="7xl">
        <Center direction="row" w="full">
          <Box w="20%">
            <img src={logo} alt="site" height={38} width={142} />
          </Box>
          <Box w="60%">
            <Link as={RLink} to="/" mr="1rem">
              <a>HOME</a>
            </Link>
            <Link as={RLink} to="/">
              <a>HOME</a>
            </Link>
          </Box>
          <Box w="20%" textAlign="right">
            <Link to="/">
              <Button colorScheme="red" size="lg" margin={2}>
                Login
              </Button>
            </Link>
            <Link to="/">
              <Button colorScheme="red" size="lg">
                Sign Up
              </Button>
            </Link>
          </Box>
        </Center>
      </Container>
    </Flex>
  );
}
