import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <Flex as="header" w="full" py=".5rem" boxShadow="md" zIndex="10">
      <Container m="auto" w="full" maxW="7xl">
        <Center direction="row" w="full">
          <Box w="20%">
            <Link as={RLink} to="/" textDecoration="none">
              <img src={logo} alt="site" height={38} width={142} />
            </Link>
          </Box>
          <Box w="60%">
            <Link as={RLink} to="/" mr="1rem">
              <a>HOME</a>
            </Link>
            <Link
              href="https://github.com/markanator/foodtrucktrackr-frontend"
              isExternal
              mr="1rem"
            >
              <a>Github</a>
            </Link>
            <Link href="https://markambrocio.com" isExternal>
              <a>Mark's Portfolio</a>
            </Link>
          </Box>
          <Box w="20%" textAlign="right">
            <LoginBtnModal />

            <SignUpBtnModal />
          </Box>
        </Center>
      </Container>
    </Flex>
  );
}

const LoginBtnModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        id="loginModal"
        colorScheme="red"
        size="lg"
        margin={2}
        onClick={onOpen}
      >
        Login
      </Button>
      <Modal id="loginModal" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Hello world!</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red">Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const SignUpBtnModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="red"
        size="lg"
        textDecoration="none"
        onClick={onOpen}
      >
        Sign Up
      </Button>
      <Modal id="signUpModal" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Hello there world!</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red">Sign Up</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
