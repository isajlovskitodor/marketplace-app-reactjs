import { redirect } from "react-router-dom";

export const action = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("email");
  localStorage.removeItem("cart");
  return redirect("/login");
};
