// components/Common/AppNavbar.jsx - Modern 2025 Design
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Badge,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaBrain, FaChartLine, FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

function AppNavbar() {
  const { user, logout } = useAuth0();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const navBg = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(26, 32, 44, 0.8)'
  );

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ href, icon, children, ...props }) => (
    <Link
      href={href}
      display="flex"
      alignItems="center"
      gap={2}
      px={4}
      py={2}
      borderRadius="xl"
      fontWeight="600"
      fontSize="sm"
      transition="all 0.2s"
      bg={isActive(href) ? 'brand.500' : 'transparent'}
      color={isActive(href) ? 'white' : useColorModeValue('gray.700', 'gray.200')}
      _hover={{
        bg: isActive(href) ? 'brand.600' : useColorModeValue('gray.100', 'gray.700'),
        transform: 'translateY(-1px)',
      }}
      {...props}
    >
      {icon}
      {children}
    </Link>
  );

  return (
    <>
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={navBg}
        backdropFilter="blur(20px)"
        borderBottom="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        boxShadow="sm"
      >
        <Flex
          align="center"
          justify="space-between"
          maxW="7xl"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={4}
        >
          {/* Logo */}
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            <HStack spacing={3}>
              <Box
                p={2}
                borderRadius="xl"
                bgGradient="linear(to-r, brand.400, neural.400)"
                color="white"
              >
                <FaBrain size="20" />
              </Box>
              <VStack spacing={0} align="start">
                <Heading 
                  fontSize="xl" 
                  bgGradient="linear(to-r, brand.500, neural.500)"
                  bgClip="text"
                  fontWeight="800"
                >
                  ZenGenius
                </Heading>
                <Text fontSize="xs" color="gray.500" fontWeight="500">
                  AI Study Assistant
                </Text>
              </VStack>
            </HStack>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
            <NavLink href="/study" icon={<FaBrain size="14" />}>
              Study
            </NavLink>
            <NavLink href="/dashboard" icon={<FaChartLine size="14" />}>
              Dashboard
            </NavLink>
            <NavLink href="/profile" icon={<FaUser size="14" />}>
              Profile
            </NavLink>
          </HStack>

          {/* Right Side */}
          <HStack spacing={3}>
            {/* Theme Toggle */}
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              borderRadius="xl"
              aria-label="Toggle color mode"
              _hover={{
                bg: useColorModeValue('gray.100', 'gray.700'),
                transform: 'translateY(-1px)',
              }}
            />

            {/* User Menu */}
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                size="sm"
                borderRadius="xl"
                _hover={{
                  bg: useColorModeValue('gray.100', 'gray.700'),
                  transform: 'translateY(-1px)',
                }}
              >
                <HStack spacing={2}>
                  <Avatar size="sm" src={user?.picture} name={user?.name} />
                  <VStack spacing={0} align="start" display={{ base: 'none', md: 'flex' }}>
                    <Text fontSize="sm" fontWeight="600">
                      {user?.name?.split(' ')[0] || 'User'}
                    </Text>
                    <Badge size="xs" colorScheme="green" variant="subtle">
                      Pro
                    </Badge>
                  </VStack>
                </HStack>
              </MenuButton>
              <MenuList
                borderRadius="xl"
                border="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                boxShadow="xl"
              >
                <MenuItem
                  icon={<FaUser />}
                  borderRadius="lg"
                  _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                >
                  Profile Settings
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  icon={<FaSignOutAlt />}
                  borderRadius="lg"
                  color="red.500"
                  _hover={{ bg: 'red.50' }}
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>

            {/* Mobile Menu Button */}
            <IconButton
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="ghost"
              size="sm"
              borderRadius="xl"
              display={{ base: 'flex', md: 'none' }}
              aria-label="Open menu"
            />
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent borderRadius="2xl" m={2} h="calc(100vh - 16px)">
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack spacing={3}>
              <Box
                p={2}
                borderRadius="xl"
                bgGradient="linear(to-r, brand.400, neural.400)"
                color="white"
              >
                <FaBrain size="16" />
              </Box>
              <Text>ZenGenius</Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <NavLink href="/" icon={<FaHome size="16" />} onClick={onClose}>
                Home
              </NavLink>
              <NavLink href="/study" icon={<FaBrain size="16" />} onClick={onClose}>
                Study Space
              </NavLink>
              <NavLink href="/dashboard" icon={<FaChartLine size="16" />} onClick={onClose}>
                Dashboard
              </NavLink>
              <NavLink href="/profile" icon={<FaUser size="16" />} onClick={onClose}>
                Profile
              </NavLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Box h="80px" />
    </>
  );
}

export default AppNavbar;
