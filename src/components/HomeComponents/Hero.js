import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import BgImg from '../../assets/searchBg.jpg';

export default function Hero() {
  const { errors, register } = useForm();

  return (
    <Flex
      className="home__hero"
      w="full"
      h="90vh"
      bgImage={`url(${BgImg})`}
      zIndex="-1"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="50%"
    >
      <Box pos="relative" w="full" m="auto" py="3rem">
        <Container
          display="flex"
          centerContent
          m="auto"
          maxW="7xl"
          textColor="white"
          paddingBottom="2rem"
        >
          <Flex direction="column" mx="auto">
            <Heading as="h2" display="inline" textAlign="center" mb="1rem">
              Find Nearby FoodTrucks
            </Heading>
            <Heading
              as="h4"
              fontSize="xl"
              fontWeight="500"
              textAlign="center"
              my=".5rem"
            >
              Find some of the best joints from around the city from our
              partners and friends.
            </Heading>
            <Flex
              direction="row"
              mt="2rem"
              w="full"
              bg="white"
              border="2px"
              borderColor="gray.400"
              alignItems="stretch"
              rounded="4px"
              p="6px"
              shadow="lg"
            >
              <Flex
                as="form"
                direction="row"
                justifyItems="center"
                alignItems="center"
                w="full"
              >
                <FormControl isInvalid={errors.Search} w="80%">
                  <FormLabel htmlFor="Search" display="none">
                    First name
                  </FormLabel>
                  <Input
                    bg="white"
                    w="full"
                    name="Search"
                    border="none"
                    focusBorderColor="transparent"
                    fontSize="1.125rem"
                    placeholder="What are you in the mood for?"
                    ref={register()}
                  />
                  <FormErrorMessage>
                    {errors.Search && errors.Search.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  w="20%"
                  colorScheme="red"
                  fontSize="1.25rem"
                  fontWeight="400"
                  size="lg"
                >
                  Search
                </Button>
              </Flex>
            </Flex>
            <Box margin="1rem auto 0 auto" textAlign="center">
              <Heading fontSize="lg" fontWeight="500" as="h3" mb="1.125rem">
                Or Browse Popular Categories
              </Heading>
              <List as="ul" m="0 auto" textAlign="center" display="flex">
                <ListItem m="5px" textAlign="center">
                  <Link
                    to="/"
                    as={RLink}
                    pos="relative"
                    _hover={{
                      background: '#ff2222',
                      color: 'white',
                    }}
                    w={150}
                    h={105}
                    display="block"
                    overflow="hidden"
                    rounded=".5rem"
                    p=".5rem"
                    background="rgba(255,255,255,0.07)"
                  >
                    <Box
                      pos="relative"
                      w="full"
                      h="full"
                      rounded=".5rem"
                      pt="1rem"
                      fontWeight="600"
                      textColor="white"
                      background="rgba(255,255,255,0.08)"
                      textAlign="center"
                      justifyItems="center"
                      alignItems="center"
                    >
                      <FaUtensils
                        style={{
                          fontSize: '1.875rem',
                          margin: '0 auto',
                          marginBottom: '.5rem',
                        }}
                      />
                      Category 1
                    </Box>
                  </Link>
                </ListItem>
                {/* Three */}
                <ListItem m="5px" textAlign="center">
                  <Link
                    to="/"
                    as={RLink}
                    pos="relative"
                    _hover={{
                      background: '#ff2222',
                      color: 'white',
                    }}
                    w={150}
                    h={105}
                    display="block"
                    overflow="hidden"
                    rounded=".5rem"
                    p=".5rem"
                    background="rgba(255,255,255,0.07)"
                  >
                    <Box
                      pos="relative"
                      w="full"
                      h="full"
                      rounded=".5rem"
                      pt="1rem"
                      fontWeight="600"
                      textColor="white"
                      background="rgba(255,255,255,0.08)"
                      textAlign="center"
                      justifyItems="center"
                      alignItems="center"
                    >
                      <FaUtensils
                        style={{
                          fontSize: '1.875rem',
                          margin: '0 auto',
                          marginBottom: '.5rem',
                        }}
                      />
                      Category 1
                    </Box>
                  </Link>
                </ListItem>
                {/* three */}
                <ListItem m="5px" textAlign="center">
                  <Link
                    to="/"
                    as={RLink}
                    pos="relative"
                    _hover={{
                      background: '#ff2222',
                      color: 'white',
                    }}
                    w={150}
                    h={105}
                    display="block"
                    overflow="hidden"
                    rounded=".5rem"
                    p=".5rem"
                    background="rgba(255,255,255,0.07)"
                  >
                    <Box
                      pos="relative"
                      w="full"
                      h="full"
                      rounded=".5rem"
                      pt="1rem"
                      fontWeight="600"
                      textColor="white"
                      background="rgba(255,255,255,0.08)"
                      textAlign="center"
                      justifyItems="center"
                      alignItems="center"
                    >
                      <FaUtensils
                        style={{
                          fontSize: '1.875rem',
                          margin: '0 auto',
                          marginBottom: '.5rem',
                        }}
                      />
                      Category 1
                    </Box>
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
