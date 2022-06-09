import { useQuery } from "@apollo/client";
import { LOGGED_IN_BLACKLIST } from "@app/constants";
import usePersistedState from "@app/hooks/usePersistedState";
import { useToast } from "@chakra-ui/react";
import { IUserEntity } from "@user/types";
import gql from 'graphql-tag'
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Dispatch, SetStateAction, useState } from "react";

export type UserStateType = {
  user?: IUserEntity;
  token?: string;
  isLoggedIn: boolean;
  setUser: Dispatch<SetStateAction<IUserEntity | undefined>>;
};

export const defaultUserState: UserStateType = {
  user: undefined,
  token: undefined,
  isLoggedIn: false,
  setUser: () => undefined,
};

const GetUserByToken = gql`
  query getUserByToken {
    getUserByToken {
      id
      name
      email
    }
  }
`

export default function useUserState(): UserStateType {
  const [user, setUser] = useState<IUserEntity | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (window !== undefined) {
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
      }
    }
  }, [user])

  console.log(token);
  const { data: userData } = useQuery(GetUserByToken);

  useEffect(() => {
    if (!user && userData && userData.getUserByToken) {
      setUser(userData.getUserByToken);
    }
  }, [userData, user]);

  useEffect(() => {
    // if (LOGGED_IN_BLACKLIST.includes(router.pathname) && !user || !token) {
    //   setIsLoggedIn(false);
    //   router.push('/connexion');
    // } else if (user) {
    //   setIsLoggedIn(true);
    // }
  }, [router, toast, token, user]);

  return {
    user,
    token,
    isLoggedIn,
    setUser,
  }
};

