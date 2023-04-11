import ProductsList from "../components/products-list/ProductsList";
import { useLoaderData, json, useRouteLoaderData } from "react-router-dom";

const ProductsPage = () => {
  const data = useLoaderData();
  const token = useRouteLoaderData("root");
  const products = data.products;

  return <ProductsList products={products} token={token} />;
};
export default ProductsPage;

export const loader = () => {
  return fetch("http://localhost:8080/products").then((response) => {
    if (!response.ok) {
      throw json({ message: "Could not fetch products!" }, { status: 500 });
    } else {
      return response;
    }
  });
};