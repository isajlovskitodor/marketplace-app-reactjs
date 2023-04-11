import { json, redirect } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";

const LoginPage = () => {
  return <LoginForm />;
};
export default LoginPage;

export const action = ({ request }) => {
  return request.formData().then((formData) => {
    const authData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    return fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    })
      .then((response) => {
        if (!response.ok) {
          throw json(
            { message: "Could not authenticate user!" },
            { status: 500 }
          );
        }

        return response.json();
      })
      .then((response) => {
        localStorage.setItem("email", authData.email);
        localStorage.setItem("cart", JSON.stringify([]));
        const token = response.token;
        localStorage.setItem("token", token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());
        return redirect("/");
      });
  });
};