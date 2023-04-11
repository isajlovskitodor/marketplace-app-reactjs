import { json, useRouteLoaderData, redirect } from "react-router-dom";
import ProductItemDetails from "../components/product-details/ProductItemDetails";
import { getAuthToken } from "../util/auth";

const ProductDetailsPage = () => {
  const data = useRouteLoaderData("product-details");

  return <ProductItemDetails product={data.product} />;
};
export default ProductDetailsPage;

export const loader = ({ params }) => {
  const productId = params.productId;

  return fetch("http://localhost:8080/products/" + productId).then(
    (response) => {
      if (!response.ok) {
        throw json(
          { message: "Could not fetch details for selected product." },
          { status: 500 }
        );
      }
      return response;
    }
  );
};

export const action = ({ params, request }) => {
  const productId = params.productId;
  const token = getAuthToken();

  return fetch("http://localhost:8080/products/" + productId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    if (!response.ok) {
      throw json({ message: "Could not delete product." }, { status: 500 });
    }

    return redirect("/products");
  });
};
