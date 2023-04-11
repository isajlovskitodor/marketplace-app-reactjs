import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Typography,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import RangeSlider from "./RangeSlider";
import ProductItem from "./ProductItem";

const sortProducts = (products, isSortingAscending) => {
  return products.sort((productA, productB) => {
    if (isSortingAscending) {
      return productB.cost - productA.cost;
    } else {
      return productA.cost - productB.cost;
    }
  });
};

const ProductsList = ({ products, token }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productsState, setProductsState] = useState(products);
  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortItemsHandler = () => {
    sortProducts(productsState, isSortingAscending);
    navigate(`?sort=${isSortingAscending ? "desc" : "asc"}`);
  };

  return (
    <>
      <Typography gutterBottom variant="h4" align="center">
        All products
      </Typography>
      <Stack
        marginY={3}
        marginLeft={{ sm: 5, xs: 0 }}
        spacing={4}
        alignItems="center"
        direction={{ xs: "column", sm: "row" }}
      >
        {token && (
          <Button
            sx={{ height: "40px", width: "180px" }}
            component={Link}
            to={"new"}
            variant="contained"
          >
            Add new product
          </Button>
        )}
        <Button
          sx={{ height: "40px", minWidth: "180px" }}
          onClick={sortItemsHandler}
          variant={"outlined"}
        >
          Sort {isSortingAscending ? "descending" : "ascending"}
        </Button>

        <RangeSlider products={products} setProductsState={setProductsState} />{" "}
      </Stack>
      
      <Grid spacing={2} paddingX={1} container>
        {productsState.map((product) => (
          <ProductItem key={product.id} product={product} token={token} />
        ))}
      </Grid>
    </>
  );
};
export default ProductsList;
