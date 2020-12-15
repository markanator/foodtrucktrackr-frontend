import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/Layout';
import Map from '../components/search/Map';

// mapboxGl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export default function ListingsPage() {
  return (
    <Layout>
      <Flex direction="column">
        <Flex
          w="full"
          pos="relative"
          alignItems="center"
          h="505px"
          direction="column"
        >
          <Map />
          {/* SEARCH */}
          <Container
            maxW="5xl"
            pos="absolute"
            display="block"
            bottom="60px"
            top="atuo"
            transform="none"
            pb="0"
            zIndex="999"
            mt="0"
            mx="auto"
            alignItems="center"
          >
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
                <FormControl w="80%">
                  <FormLabel htmlFor="Search" display="none">
                    First name
                  </FormLabel>
                  <Input
                    bg="white"
                    textColor="black"
                    w="full"
                    name="Search"
                    border="none"
                    focusBorderColor="transparent"
                    fontSize="1.125rem"
                    placeholder="What are you in the mood for?"
                    // ref={register()}
                  />
                  <FormErrorMessage>
                    {/* {errors.Search && errors.Search.message} */}
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
          </Container>
        </Flex>{' '}
        {/* SEARCH */}
        <Container maxW="5xl">
          <Flex direction="column">
            {/* FILTERING */}
            <Box
              padding="1rem"
              background="#f9f9f9"
              rounded="lg"
              my="2rem"
              display="inline-block"
              w="full"
              border="1px solid rgba(0,0,0,.05)"
            >
              FILTERING
            </Box>
            <Text>This is the listings page</Text>
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
}
