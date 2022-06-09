import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAppState } from '@app/providers';

const NavLink = ({ children, href }: { children: ReactNode, href: string }) => (
  <Link
    display={'flex'}
    alignItems={'center'}
    color={'white'}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('green.600', 'green.800'),
    }}
    href={href}>
    {children}
  </Link>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { userState: { user, setUser } } = useAppState();

  return (
    <>
      <Box bg={useColorModeValue('green.500', 'green.900')} px={4} mb={50} w={'100vw'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex>
            <Heading color={'white'} mr={'1rem'}>
              POST YA LIFE
            </Heading>
            {!user && <NavLink href={'/connexion'} ><Text>Connexion</Text></NavLink>}
            {user && <NavLink href={'/board'}><Text>Board</Text></NavLink>}
          </Flex>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {
                user && (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      <Avatar
                        size={'sm'}
                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                      />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                        <Avatar
                          size={'2xl'}
                          src={'https://avatars.dicebear.com/api/male/username.svg'}
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>{user?.name}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem><Link href={'/profil'}>Modifier mon profil</Link></MenuItem>
                      <MenuItem onClick={() => {
                          localStorage.removeItem('token');
                          setUser(undefined);
                        }}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                )
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
