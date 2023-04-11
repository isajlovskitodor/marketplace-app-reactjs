import { json, redirect } from "react-router-dom";
import RegisterForm from "../components/authentication/RegisterForm";

const RegisterPage = () => {
    return (
        <RegisterForm />
    )
}
export default RegisterPage;

export const action = ({ request }) => {
    return request.formData().then((formData) => {
      const authData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
  
      return fetch("http://localhost:8080/signup", {
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
          return redirect("/login");
        });
    });
  };