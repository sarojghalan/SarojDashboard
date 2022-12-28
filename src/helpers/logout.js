export const Logout = (setUser, navigate) => {
  setUser(null);
  navigate("/");
};
