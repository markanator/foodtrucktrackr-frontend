/* eslint-disable react/jsx-props-no-spreading */
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
  FormErrorMessage,
} from '@chakra-ui/react';
import Axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPizzaSlice } from 'react-icons/fa';
import { Link as RLink, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useUserContext } from '../../context/UserContext';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { LoginSchema } from '../Forms/Schemas/LoginSchema';
import { SignUpSchema } from '../Forms/Schemas/SignUpSchema';

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
  const router = useHistory();
  const { setUserState } = useUserContext();

  function onSubmit(values) {
    Axios.post(`${process.env.REACT_APP_HOSTED_BACKEND}/user/auth/login`, {
      ...values,
      email: values.email,
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
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <ModalBody>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">email</FormLabel>
                        <Input
                          {...field}
                          type="email"
                          id="email"
                          placeholder="email@example.com"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* PASSWORD */}
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password">password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="password"
                          name="password"
                          placeholder="password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="red"
                    // disabled={formState.isSubmitting}
                  >
                    Login
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

const SignUpBtnModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { handleSubmit, errors, register, formState } = useForm();
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
          <Formik
            initialValues={{
              user_role: '',
              username: '',
              email: '',
              password: '',
              first_name: '',
              last_name: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <ModalBody>
                  {/* ACCOUNT TYPE */}
                  <Field name="user_role">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        mb=".5rem"
                        isInvalid={
                          form.errors.user_role && form.touched.user_role
                        }
                      >
                        <FormLabel htmlFor="user_role">Account Type</FormLabel>
                        <RadioGroup {...field} name="user_role">
                          <Stack direction="row">
                            <Radio id="diner" value="diner">
                              Diner
                            </Radio>
                            <Radio id="operator" value="operator">
                              Operator
                            </Radio>
                          </Stack>
                        </RadioGroup>
                        <FormErrorMessage>
                          {form.errors.user_role}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* USERNAME */}
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <FormLabel htmlFor="username">username</FormLabel>
                        <Input
                          {...field}
                          type="text"
                          name="username"
                          id="username"
                          placeholder="username"
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* EMAIL */}
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">email</FormLabel>
                        <Input
                          {...field}
                          type="email"
                          id="email"
                          name="email"
                          placeholder="email@example.com"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* PASSWORD */}
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password">password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="password"
                          name="password"
                          placeholder="password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="red"
                    // disabled={formState.isSubmitting}
                  >
                    Login
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
