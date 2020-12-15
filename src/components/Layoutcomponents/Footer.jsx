import { Container, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => (
  <Flex as="footer" w="full">
    <Container>
      <Text textAlign="center">Copyright &copy; 2020 Food Truck Trackr</Text>
    </Container>
  </Flex>
);

export default Footer;
