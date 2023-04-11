import { Outlet, useLoaderData, useSubmit} from "react-router-dom";
import { getTokenDuration } from "../util/auth";
import { useEffect } from "react";
import MainNavigation from "../components/navbar/MainNavigation";

const Root = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { method: "post", action: "/logout" });
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { method: "post", action: "/logout" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main style={{marginTop: "100px"}}>
        <Outlet />
      </main>
    </>
  );
};

export default Root;