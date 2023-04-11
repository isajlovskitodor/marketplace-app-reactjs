import { Link } from "react-router-dom";
import {
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Rating,
  Box,
  CardActions,
  Zoom,
} from "@mui/material";
import AddToCartButton from "./AddToCartButton";

const ProductItem = ({ product, token }) => {
  return (
    <Grid xs={12} sm={4} md={3} item>
      <Zoom in={true}>
        <Card sx={{ maxWidth: "400px", margin: "0 auto" }}>
          <CardActionArea component={Link} to={product.id}>
            <CardMedia
              component="img"
              height="250"
              image={product.image}
              alt={product.title}
            />
            <CardContent sx={{ borderTop: "1px solid #AAAAAA" }}>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography gutterBottom variant="body1">
                Price: {product.cost}$
              </Typography>
              <Box sx={{ display: "inline-flex" }}>
                <Typography component="legend">Rating:</Typography>
                <Rating
                  name="read-only"
                  value={parseInt(product.rating)}
                  readOnly
                />
              </Box>
            </CardContent>
          </CardActionArea>
          {token && (
            <CardActions>
              <AddToCartButton product={product} />
            </CardActions>
          )}
        </Card>
      </Zoom>
    </Grid>
  );
};

export default ProductItem;
