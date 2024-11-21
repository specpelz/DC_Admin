import toast from "react-hot-toast";

const useLogout = () => {
  const logout = async (): Promise<void> => {
    try {
      // Optionally call an API endpoint to invalidate the user session
      // const response = await axios.post(`${BASE_URL}/auth/logout`);

      // Clear user data from local storage
      localStorage.removeItem("DC_User");
      localStorage.removeItem("DC_Token");
      toast.success("Logout successful!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Logout failed!");
      throw err;
    }
  };

  return { logout };
};

export default useLogout;
