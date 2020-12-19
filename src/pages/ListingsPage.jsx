/* eslint-disable no-lone-blocks */
import {
  Box,
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaChevronDown, FaMapMarkedAlt } from 'react-icons/fa';
// locals
import Layout from '../components/Layout';
import GMap from '../components/Search/GMap';
import { useTrucksQuery } from '../query/useTrucksQuery';
import { TruckListingCard } from '../components/Search/TruckListingCard';

export default function ListingsPage() {
  const { data: truckList, isLoading, isError } = useTrucksQuery();

  console.log('das trucks', truckList);
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
          {/* MAP & SEARCH */}
          <GMap />
        </Flex>{' '}
        <Container maxW="6xl">
          {/* FILTERING */}
          <Flex direction="column">
            <Box
              padding="1rem"
              background="#f9f9f9"
              rounded="lg"
              my="2rem"
              display="inline-block"
              w="full"
              border="1px solid rgba(0,0,0,.05)"
            >
              {/* NEAR ME */}
              <Button leftIcon={<FaMapMarkedAlt />} colorScheme="red" mr="1rem">
                Near Me
              </Button>
              {/* CATEGORIES */}
              <Menu>
                <MenuButton
                  colorScheme="red"
                  mr="1rem"
                  as={Button}
                  rightIcon={<FaChevronDown />}
                >
                  Categories
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
              {/* SORT LISTINGS */}
              <Menu>
                <MenuButton
                  colorScheme="red"
                  mr="1rem"
                  as={Button}
                  rightIcon={<FaChevronDown />}
                >
                  Sort
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
              {/* LOCATION RADIUS */}
              <Menu>
                <MenuButton
                  colorScheme="red"
                  mr="1rem"
                  as={Button}
                  rightIcon={<FaChevronDown />}
                >
                  Radius
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
          {/* LISTINGS */}
          <Box mx="-1rem" className="row">
            {isLoading ? <Text>Loading...</Text> : null}
            {isError ? (
              <Text>Oops, an error occured try again later...</Text>
            ) : null}
            {truckList &&
              truckList.map((truck, idx) => (
                <TruckListingCard key={`${idx}-${truck.slug}`} info={truck} />
              ))}
          </Box>
          <Text>This is the listings page</Text>
        </Container>
      </Flex>
    </Layout>
  );
}

{
  /* <Container
            maxW="6xl"
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
          */
}
