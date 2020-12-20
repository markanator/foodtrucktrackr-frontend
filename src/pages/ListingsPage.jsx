/* eslint-disable no-lone-blocks */
import {
  Box,
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
// locals
import Layout from '../components/Layout';
import GMap from '../components/Search/GMap';
import { TruckListingCard } from '../components/Search/TruckListingCard';
import { useTrucksQuery } from '../query/useTrucksQuery';

export default function ListingsPage() {
  const { data: truckList, isLoading, isError } = useTrucksQuery();
  const [searchDistance, setSearchDistance] = useState(1);

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
                <MenuList
                  maxH="200px"
                  overflow="hidden"
                  overflowY="scroll"
                  p=".125rem"
                >
                  <MenuItem>American</MenuItem>
                  <MenuItem>Barbeque</MenuItem>
                  <MenuItem>Chinese</MenuItem>
                  <MenuItem>Dessert</MenuItem>
                  <MenuItem>Filipino</MenuItem>
                  <MenuItem>Greek</MenuItem>
                  <MenuItem>Italian</MenuItem>
                  <MenuItem>Kosher</MenuItem>
                  <MenuItem>Mexican</MenuItem>
                  <MenuItem>Pizza</MenuItem>
                  <MenuItem>Sea Food</MenuItem>
                  <MenuItem>Thai</MenuItem>
                  <MenuItem>Vegan</MenuItem>
                  <MenuItem>Vegetarian</MenuItem>
                  <MenuItem>Other</MenuItem>
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
                  <MenuGroup title="Distance:" fontSize="lg">
                    <MenuItem>
                      <Slider aria-label="slider-ex-1" defaultValue={30}>
                        <SliderTrack bg="red.100">
                          <SliderFilledTrack bg="red.500" />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </MenuItem>
                    <MenuItem fontWeight="600">Search</MenuItem>
                  </MenuGroup>
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
