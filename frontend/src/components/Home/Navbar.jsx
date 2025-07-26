// components/Home/Navbar.jsx
import {
  Flex,
  Heading,
  Spacer,
  Link,
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="nav"
      position="sticky"
      top={0}
      zIndex={100}
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="md"
      px={{ base: 4, md: 8 }}
    >
      <Heading fontSize="2xl" color="teal.500">ZenGenius</Heading>
      <Spacer />
      <Flex gap={4} align="center">
        <Link fontWeight="medium" color="teal.400" href="#features">Features</Link>
        <Link fontWeight="medium" color="teal.400" href="#why">Why</Link>
        <Link fontWeight="medium" color="teal.400" href="#bonus">Bonus</Link>
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
        />
        {isAuthenticated ? (
          <Button size="sm" colorScheme="red" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
        ) : (
          <Button size="sm" colorScheme="teal" onClick={() => loginWithRedirect()}>Login</Button>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
