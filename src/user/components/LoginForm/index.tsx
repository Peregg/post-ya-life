import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { gql, useMutation } from "@apollo/client";
import { IUser, IUserCredentials, IUserEntity } from "@user/types";
import { useRouter } from "next/router";
import { useAppState } from "@app/providers";

const schema = yup.object({
  email: yup.string().email("Veuillez entrer un email valide").required(),
  password: yup
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
    .max(20, 'Le mot de passe doit contenir au maximum 20 caractères.')
    .required()
    .matches(/^[a-zA-Z0-9]/, 'Le mot de passe ne doit contenir que des caracètres alpha-numériques.'),
  },
).required();

const LoginMutation = gql`
  mutation Login($signinInput: SigninInput) {
    signin(input: $signinInput) {
      id
      name
      email
      token {
        jwt
      }
    }
  }
`;

export default function LoginForm() {
  const router = useRouter();
  const { userState: { setUser } } = useAppState();
  const [mutation, { data, loading }] = useMutation<{ signin: IUserEntity }, { signinInput: IUserCredentials }>(LoginMutation, {
    onCompleted: () => {
      if (data?.signin) {
        setUser(data.signin);
        localStorage.setItem('token', data.signin.token.jwt);
        router.push("/board");
      }
    }
  });
  const { register, handleSubmit, formState:{ errors } } = useForm<IUserCredentials>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (signinInput: IUserCredentials) => {
    mutation({ variables: { signinInput } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} justifyContent={'space-between'} height={'15rem'}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input placeholder={'Jean-eude@laposte.net'} {...register("email")} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type={'password'} {...register("password")} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" isLoading={loading}>Se connecter</Button>
      </Flex>
    </form>
  );
};
