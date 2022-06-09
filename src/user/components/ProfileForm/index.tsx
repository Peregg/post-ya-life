import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { gql, useMutation } from "@apollo/client";
import { IUser, IUserCredentials, IUserEntity } from "@user/types";
import { useAppState } from "@app/providers";

const schema = yup.object({
  name: yup.string(),
}).required();

const UpdateMutation = gql`
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser(input: $input) {
      id
      name
      email
      token {
        jwt
      }
    }
  }
`;

export default function ProfileForm() {
  const { userState: { user, setUser } } = useAppState();
  const [mutation, { data, loading }] = useMutation<{ updateUser: IUserEntity }, { input: IUserCredentials }>(UpdateMutation, {
    onCompleted: () => {
      if (data?.updateUser) {
        setUser(data.updateUser);
      }
    }
  });
  const { register, handleSubmit, formState:{ errors } } = useForm<IUser>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (input: IUserCredentials) => {
    mutation({ variables: { input } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} justifyContent={'space-between'} height={'15rem'}>
        <FormControl>
          <FormLabel htmlFor="name">Nom</FormLabel>
          <Input placeholder={user?.name} {...register("name")} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" isLoading={loading}>Éditer mon profil</Button>
      </Flex>
    </form>
  );
};
