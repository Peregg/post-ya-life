import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useModal } from '@app/components/fragments/Modal';

interface IProps {
  onSubmit: (data: any) => void;
}

export default function HookForm({
  onSubmit
}: IProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { close } = useModal();

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(onSubmit)();
      }}>
      <Box w={'100%'}>
        <FormControl isInvalid={errors.title}>
          <FormLabel htmlFor='title'>Titre du post</FormLabel>
          <Input
            id='title'
            placeholder='Titre'
            {...register('title', {
              required: 'This is required',
              minLength: { value: 4, message: 'Le message doit au moins être composé de 4 caracètres' },
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.body}>
          <FormLabel htmlFor='body'>Titre du post</FormLabel>
          <Textarea
            id='body'
            placeholder='Raconte ta life salope'
            {...register('body', {
              required: 'This is required',
              minLength: { value: 4, message: 'Le message doit au moins être composé de 4 caracètres' },
              maxLength: { value: 200, message: 'Le message doit au max être composé de 200 caracètres' },
            })}
          />
          <FormErrorMessage>
            {errors.body && errors.body.message}
          </FormErrorMessage>
        </FormControl>

        <Flex justifyContent={'space-around'}>
          <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
            Envoyer
          </Button>
          <Button mt={4} colorScheme='red' onClick={close}>
            Ok, j&apos;me dégonfle
          </Button>
        </Flex>
      </Box>
    </form>
  )
}
