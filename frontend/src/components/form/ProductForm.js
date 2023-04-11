import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Rating,
  Box,
} from "@mui/material";
import { useState } from "react";
import {
  Form,
  json,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { getAuthToken } from "../../util/auth";
const ProductForm = ({ method, product }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [rating, setRating] = useState(product ? parseInt(product.rating) : 0);

  const isSubmitting = navigation.state === "submitting";

  const cancelHandler = () => {
    navigate("..");
  };

  return (
    <>
      <Typography gutterBottom variant="h4" align="center">
        { product ? product.title : "Add new product"}
      </Typography>
      <Card
        sx={{ maxWidth: 450, margin: "0 auto" }}
        component={Form}
        method={method}
      >
        <CardContent>
          <Grid container rowGap={1} spacing={1}>
            <Grid xs={12} item>
              <TextField
                type="text"
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
                required
                defaultValue={product ? product.title : ""}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                type="url"
                label="Image"
                name="image"
                variant="outlined"
                placeholder="Enter image url"
                fullWidth
                required
                defaultValue={product ? product.image : ""}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                type="date"
                name="date"
                variant="outlined"
                fullWidth
                required
                defaultValue={product ? product.date : ""}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                min="1"
                max="100"
                type="number"
                name="cost"
                required
                label="Cost"
                variant="outlined"
                fullWidth
                defaultValue={product ? product.cost : ""}
              />
            </Grid>
            <Grid xs={6} item>
              <Box paddingLeft={3}>
                <Typography component="legend">Rating</Typography>
                <input
                  name="rating"
                  type="number"
                  value={rating}
                  hidden
                  readOnly
                />
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </Box>
            </Grid>
            <Grid xs={12} item>
              <TextField
                id="description"
                name="description"
                multiline
                rows={4}
                required
                defaultValue={product ? product.description : ""}
                type="text"
                label="Description"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid xs={6} item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? "Submitting..." : "Save"}
              </Button>
            </Grid>
            <Grid xs={6} item>
              <Button
                type="button"
                variant="contained"
                color="error"
                disabled={isSubmitting}
                fullWidth
                onClick={cancelHandler}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductForm;

export const action = async ({ request, params }) => {
  const method = request.method;
  const token = getAuthToken();
  const data = await request.formData();

  const newProduct = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
    cost: data.get("cost"),
    rating: data.get("rating"),
    comments: [],
  };

  let url = "http://localhost:8080/products";

  if (method === "PATCH") {
    const productId = params.productId;
    url = "http://localhost:8080/products/" + productId;
  }

  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newProduct),
  }).then((response) => {
    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not save product." }, { status: 500 });
    }

    return redirect("..");
  });
};
