"use client";
import useApiClient from "@/hooks/useAxios";
import { User, UserLoginResponse } from "@/model/user";
import { useAtom } from "jotai";
import { userAtom } from "..";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export const useAuthSession = () => {
  const [user, setUser] = useAtom(userAtom);
  const { axios, setBearerToken, removeBearerToken, token } = useApiClient();
  const [error, setError] = useState<string>("");

  const login = async (userData: User) => {
    try {
      const response = await axios.post<UserLoginResponse>(
        "auth/login",
        userData
      );

      setBearerToken(response.data.token);

      return await me();
    } catch (error: any) {
      const errorMessage =
        error.response.status === 401
          ? "Invalid credentials"
          : "An error ocurred, try again";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const signup = async (userData: User) => {
    try {
      await axios.post<User>("user/register", userData);
    } catch (error) {
      setError("An error ocurred, try again");
    }
  };

  const me = async () => {
    try {
      const meResponse = await axios.get<User>("user/me");
      setUser(meResponse.data);
      return meResponse.data;
    } catch (error) {
      setError("An error ocurred, try again");
    }
  };

  const logout = () => {
    setUser(null);
    removeBearerToken();
  };

  const deleteAccount = async () => {
    try {
      await axios.delete("user/delete");

      logout();
    } catch (error) {
      setError("An error ocurred, try again");
    }
  };

  useEffect(() => {
    if (token && !user) {
      me();
    }
  }, [token]);

  return {
    error,
    user,
    login,
    logout,
    signup,
    deleteAccount,
  };
};
