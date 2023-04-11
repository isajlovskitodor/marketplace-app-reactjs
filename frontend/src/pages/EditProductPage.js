import { useRouteLoaderData } from "react-router-dom";
import ProductForm from "../components/form/ProductForm";

const EditProductPage = () => {
  const data = useRouteLoaderData("product-details");
  return <ProductForm method="patch" product={data.product} />;
};

export default EditProductPage;