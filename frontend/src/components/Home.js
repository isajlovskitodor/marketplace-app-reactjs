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
  Collapse,
} from "@mui/material";

const Home = ({ products }) => {
  return (
    <>
      <Typography marginY={3} gutterBottom variant="h4" align="center">
        Top products
      </Typography>
      <Grid paddingX={1} rowSpacing={2} container>
        {products.map((product) => (
          <Grid xs={12} sm={6} md={4} key={product.id} item display={"flex"} justifyContent={"center"}>
            <Collapse appear={true} in={true} orientation="horizontal">
              <Card sx={{ maxWidth: "400px", width: {lg: "400px"} }}>
                <CardActionArea component={Link} to={`products/${product.id}`}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image}
                    alt={product.title}
                  />
                  <CardContent sx={{ borderTop: "1px solid #aaaaaa" }}>
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
              </Card>
            </Collapse>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
