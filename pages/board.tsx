import { useQuery, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import type { NextPage } from 'next'
import { IPopulatedPost, IPost, IPostBody } from '@post/types'
import PostCard from 'src/post/components/PostCard'
import { Box, Button, Flex, Heading, Spinner } from '@chakra-ui/react'
import HookForm from 'src/post/components/PostForm'
import { useAppState } from '@app/providers'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useModal } from '@app/components/fragments/Modal'

const PostQuery = gql`
  query getPosts {
    getPosts {
      id
      title
      body
      author {
        name
      }
      theme {
        name
      }
    }
  }
`;

const PostMutation = gql`
  mutation createPost($post: PostInput!) {
    createPost(input: $post) {
      id
      title
      body
      author {
        name
      }
    }
  }`

const Home: NextPage = () => {
  const {
    data,
    refetch,
  } = useQuery<{ getPosts?: IPopulatedPost[] }>(PostQuery);
  const { userState: { token, user } } = useAppState();
  const { open, close } = useModal();
  const router = useRouter();
  const [mutateFunction, { data: posts, loading, error }] = useMutation<IPost, { post: IPostBody }>(PostMutation, {
    onCompleted: () => {
      refetch();
      close();
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push('/connexion');
    }
  }, [router, token, user]);

  const handleNewPostClick = () => {
    open({
      header: 'tain, tu crois que ta life intéresse les gens ?',
      body: <HookForm onSubmit={(post: IPostBody) => mutateFunction({ variables: { post }})} />,
      footer: undefined,
    });
  }

  if (!user) {
    return (
      <Flex justifyContent={'center'} alignItems={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }

  return (
    <Flex>
      <Box>
        <Flex alignItems={'center'}>
          <Heading ml={50}>Dernières publications :</Heading>
          <Button ml={30}onClick={handleNewPostClick}>Poser une nouvelle merde</Button>
        </Flex>
        <Flex wrap={'wrap'} ml={50}>
            {data?.getPosts?.map((post) => (
              <Box key={post.id} p='4'>
                <PostCard {...post} />
              </Box>
            ))}
        </Flex>
      </Box>
    </Flex>
  );
}

export default Home;
