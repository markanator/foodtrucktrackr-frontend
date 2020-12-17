import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPizzaSlice } from 'react-icons/fa';
import { Link as RLink, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { isLoggedIn } from '../../utils/isLoggedIn';

export default function Header() {
  let RightSide;
  const { userState } = useUserContext();

  if (userState.isLoggedIn && isLoggedIn()) {
    RightSide = (
      <>
        <Button as={RLink} to="/search-trucks" mr="1rem" colorScheme="red">
          Find Food
        </Button>
        <Menu>
          <MenuButton as={Button} colorScheme="red">
            Dashboard
          </MenuButton>
          <MenuList>
            <MenuGroup
              textAlign="left"
              title={`Sign in as: ${userState.userInfo.username}`}
            >
              <MenuItem
                as={RLink}
                to={`/dashboard/${userState.userInfo.username}`}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                as={RLink}
                to={`/dashboard/${userState.userInfo.username}/settings`}
              >
                Settings
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  } else {
    RightSide = (
      <>
        <Button
          rightIcon={<FaPizzaSlice />}
          as={RLink}
          to="/search-trucks"
          mr=".5rem"
          colorScheme="red"
          size="lg"
        >
          Find Food
        </Button>
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
            <Link as={RLink} to="/" textDecoration="none" color="#ff0129">
              {/* <img src={logo} alt="site" height={38} width={142} /> */}
              <Text fontSize="1.5rem" fontWeight="700" color="#ff0129">
                Food Truck Tracker
              </Text>
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
  const router = useHistory();
  const { setUserState } = useUserContext();

  function onSubmit(values) {
    // mutate({ ...values, user_email: values.email });
    Axios.post(`${process.env.REACT_APP_HOSTED_BACKEND}/user/auth/login`, {
      ...values,
      user_email: values.email,
    })
      .then(({ data }) => {
        console.log(data);
        window.localStorage.setItem('token', data.token);
        setUserState({
          isLoggedIn: true,
          userInfo: {
            ...data.user,
          },
          token: data.token,
        });
        // push user
        router.push(`/dashboard/${data.user.username}`);
      })
      .catch((err) => console.error(err));
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
  const router = useHistory();
  const { setUserState } = useUserContext();

  function onSubmit(values) {
    Axios.post(`${process.env.REACT_APP_HOSTED_BACKEND}/user`, {
      ...values,
    })
      .then(({ data }) => {
        console.log('signup data:', data);
        // set localstorage token
        window.localStorage.setItem('token', data.token);
        setUserState({
          isLoggedIn: true,
          userInfo: {
            ...data.user,
          },
          token: data.token,
        });
        // push user
        router.push(`/dashboard/${data.user.username}`);
      })
      .catch((err) => console.log(err));
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
