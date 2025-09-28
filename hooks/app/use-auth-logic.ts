import { client } from "@/core/api/client";
import useAuth from "@/core/auth";
import { WS_URL } from "@/core/constants";
import { useWebSocketStore } from "@/core/store";
import { AxiosError, isAxiosError } from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { toast } from "sonner-native";
import { useShallow } from "zustand/shallow";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [{ name, email, password }, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signIn, setUser } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      toast.error("Please verify the form inputs");
      return;
    }
    setLoading(true);
    try {
      await client.post("users", {
        email,
        password,
        name,
      });

      const { data } = await client.post("users/login", { email, password });

      setUser(data.user);
      signIn({ access: data.token });
      setLoading(false);

      router.push("/");
      toast.success("Welcome to holidays!");
    } catch (error) {
      const err = error as Error | AxiosError;
      if (isAxiosError(err)) {
        const message = err?.response?.data?.error
          ? err?.response?.data?.error
          : err?.response?.data;
        toast.error(message);
      } else {
        toast.error(err.message);
      }
      setLoading(false);
    }
  };

  return {
    name,
    email,
    password,
    handleRegister,
    loading,
    handleNameChange: (name: string) =>
      setForm((values) => ({ ...values, name })),
    handleEmailChange: (email: string) =>
      setForm((values) => ({ ...values, email })),
    handlePasswordChange: (password: string) =>
      setForm((values) => ({ ...values, password })),
  };
};

export const useLoginLogic = () => {
  const connect = useWebSocketStore(useShallow((state) => state.connect));
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, setUser } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please verify the form inputs");
      return;
    }
    setLoading(true);
    try {
      const { data } = await client.post("users/login", {
        email,
        password,
      });
      setUser(data.user);
      signIn({ access: data.token });
      connect(`${WS_URL}?token=${encodeURIComponent(data.token)}`);
      setLoading(false);
      router.push("/");
    } catch (error) {
      const err = error as Error | AxiosError;
      if (isAxiosError(err)) {
        const message = err?.response?.data?.error
          ? err?.response?.data?.error
          : err?.response?.data;
        toast.error(message);
      } else {
        toast.error(err.message);
      }
      setLoading(false);
    }
  };

  return {
    email,
    password,
    loading,
    setEmail,
    setPassword,
    handleLogin,
  };
};
