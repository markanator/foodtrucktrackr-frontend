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
  FormControl,
  Input,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import Axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RLink, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { prodCheck } from '../../utils/prodCheck';
import { isLoggedIn } from '../../utils/isLoggedIn';

export default function Header() {
  let RightSide;
  // useEffect(() => {
  //   isLoggedIn();
  // }, []);

  if (isLoggedIn()) {
    RightSide = (
      <>
        <Link as={RLink} to="/dashboard" mr="1rem">
          Dashboard
        </Link>
        Logged in
      </>
    );
  } else {
    RightSide = (
      <>
        <LoginBtnModal />
        <SignUpBtnModal />
      </>
    );
  }

  return (
    <Flex as="header" w="full" py=".5rem" boxShadow="md" zIndex="10">
      <Container m="auto" w="full" maxW="7xl">
        <Center direction="row" w="full">
          <Box w="20%">
            <Link as={RLink} to="/" textDecoration="none">
              <img src={logo} alt="site" height={38} width={142} />
            </Link>
          </Box>
          <Box w="40%">
            {/* <Link as={RLink} to="/" mr="4rem">
              HOME
            </Link> */}
            <Link
              href="https://github.com/markanator/foodtrucktrackr-frontend"
              isExternal
              mr="1rem"
            >
              Project Github
            </Link>
            <Link href="https://markambrocio.com" isExternal>
              Mark's Portfolio
            </Link>
          </Box>
          <Box w="40%" textAlign="right">
            {RightSide}
          </Box>
        </Center>
      </Container>
    </Flex>
  );
}

const LoginBtnModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, errors, register, formState } = useForm();
  const history = useHistory();

  function onSubmit(values) {
    // console.log('login: ', values);
    Axios.post(`${process.env.REACT_APP_HOSTED_BACKEND}/user/auth/login`, {
      ...values,
      user_email: values.email,
    })
      .then(({ data }) => {
        if (prodCheck) {
          console.log('SERVER RESPONSE:: ', data);
        }
        window.localStorage.setItem('token', data.token);
        onClose();
        history.push(`/dashboard/${data.user.username}`);
      })
      .catch((err) => {
        onClose();
        console.error(err);
      });
  }

  function validateField(value) {
    if (!value) {
      return false;
    }
    return true;
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isRequired mb=".5rem">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="mark@example.com"
                  ref={register({ required: true, validate: validateField })}
                />
                <Text color="tomato">{errors.email && 'Required!'}</Text>
              </FormControl>
              {/* PASSWORD */}
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="*********"
                  ref={register({
                    required: true,
                    minLength: 6,
                    validate: validateField,
                  })}
                />
                <Text color="tomato">
                  {errors.password && 'Required and/or too short!'}
                </Text>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                colorScheme="red"
                disabled={formState.isSubmitting}
              >
                Login
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

const SignUpBtnModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, errors, register, formState } = useForm();
  const history = useHistory();

  function onSubmit(values) {
    console.log('SIGN UP VALS: ', values);
    Axios.post(`${process.env.REACT_APP_HOSTED_BACKEND}/user`, { ...values })
      .then(({ data }) => {
        if (!prodCheck) {
          console.log('SERVER RESPONSE:: ', data);
        }
        window.localStorage.setItem('token', data.token);
        onClose();
        history.push(`/dashboard/${data.user.username}`);
      })
      .catch((err) => {
        onClose();
        console.error(err);
      });
  }

  function validateField(value) {
    if (!value) {
      return false;
    }
    return true;
  }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              {/* ACCOUNT TYPE */}
              <FormControl isRequired mb=".5rem">
                <FormLabel htmlFor="user_role">Account Type</FormLabel>
                <RadioGroup name="user_role">
                  <Stack direction="row">
                    <Radio
                      id="diner"
                      value="diner"
                      ref={register({ required: true })}
                    >
                      Diner
                    </Radio>
                    <Radio
                      id="operator"
                      value="operator"
                      ref={register({ required: true })}
                    >
                      Operator
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Text color="tomato">{errors.user_role && 'Required!'}</Text>
              </FormControl>
              {/* USERNAME */}
              <FormControl isRequired mb=".5rem">
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="ilovefood97"
                  ref={register({ required: true, validate: validateField })}
                />
                <Text color="tomato">{errors.username && 'Required!'}</Text>
              </FormControl>
              {/* EMAIL */}
              <FormControl isRequired mb=".5rem">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  name="user_email"
                  placeholder="mark@example.com"
                  ref={register({ required: true, validate: validateField })}
                />
                <Text color="tomato">{errors.user_email && 'Required!'}</Text>
              </FormControl>
              {/* PASSWORD */}
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="*********"
                  ref={register({
                    required: true,
                    minLength: 6,
                    validate: validateField,
                  })}
                />
                <Text color="tomato">
                  {errors.password && 'Required and/or too short!'}
                </Text>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                colorScheme="red"
                disabled={formState.isSubmitting}
              >
                Login
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
