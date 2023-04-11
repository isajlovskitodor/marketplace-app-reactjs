import Home from "../components/Home";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
  const data = useLoaderData();
  const products = data.products
    .sort((productA, productB) => productB.rating - productA.rating)
    .slice(0, 3);

  return <Home products={products} />;
};

export default HomePage;