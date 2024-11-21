import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@api/index";
import { LoginData, LoginResponse } from "../types/LoginData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginData): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const response = await axios.post<LoginResponse>(
        `${BASE_URL}/auth/login`,
        data
      );
      setIsLoading(false);
      console.log("login", response);

      if (response.data.status === "success") {
        const { token, user } = response.data.data;
        toast.success("Login successful!");
        localStorage.setItem("DC_User", JSON.stringify(user));
        localStorage.setItem("DC_Token", token);
        navigate("/admin");
        return {
          status: response.data.status,
          statusCode: response.data.statusCode,
          message: response.data.message,
          data: { token, user },
        };
      } else {
        throw new Error(response.data.message || "Login failed!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.response?.data?.message || "Login failed!");
      throw err;
    }
  };

  return { login, isLoading };
};

export default useLogin;
