import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { IPopulatedPost, IPost, ITheme } from '@post/types';
import dayjs from 'dayjs';


export default function PostCard({ title, body, author, createdAt, theme }: IPopulatedPost) {
  return (
      <Flex
        flexDirection={'column'}
        w={'440px'}
        maxW={'400px'}
        h={'500px'}
        maxH={'500px'}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            alt={'od'}
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            priority
            layout={'fill'}
          />
        </Box>
        <Stack w={'440px'} maxW={'400px'} flex={1}>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}>
            {theme?.name}
          </Text>
          <Heading
            fontSize={'2xl'}
            fontFamily={'body'}>
            {title}
          </Heading>
          <Text color={'gray.500'} pr={30}>
            {body}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4}>
          <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{author.name}</Text>
            <Text color={'gray.500'}>{dayjs(createdAt).format('MMM DD, YYYY')}</Text>
          </Stack>
        </Stack>
      </Flex>
  );
}
