// components/Common/AppNavbar.jsx
import {
  Flex,
  Heading,
  Spacer,
  Link,
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";

function AppNavbar() {
  const { logout } = useAuth0();
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
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="md"
      px={{ base: 4, md: 8 }}
    >
      <Heading fontSize="2xl" color="teal.500">
        ZenGenius
      </Heading>

      <Spacer />

      <Flex gap={4} align="center">
        <Link href="/study" fontWeight="medium" color="teal.400">
          Study
        </Link>
        <Link href="/dashboard" fontWeight="medium" color="teal.400">
          Dashboard
        </Link>
        <Link href="/profile" fontWeight="medium" color="teal.400">
          Profile
        </Link>

        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
        />
        <Button
          size="sm"
          colorScheme="red"
          onClick={() =>
            logout({ returnTo: window.location.origin })
          }
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}

export default AppNavbar;
