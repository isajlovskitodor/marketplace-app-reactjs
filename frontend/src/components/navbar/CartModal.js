import {
  Badge,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
  CardActions,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartContext from "../../context/cart-context";
import { useTheme } from "@emotion/react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "5px",
  boxShadow: 24,
  p: 3,
  width: { xs: "80%", sm: "90%" },
  height: "60vh",
};

const CartModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cartContext = useContext(CartContext);
  const products = cartContext.cartProducts;
  const productsLength = cartContext.productsCount > 0;

  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <>
      <Tooltip
        placement="bottom"
        title={!productsLength && "Cart is empty!"}
        arrow
      >
        <IconButton
          size="large"
          aria-label="show items quantity"
          color="inherit"
          sx={{ color: "white", mr: { xs: 0, sm: 2 } }}
          onClick={productsLength ? handleOpen : undefined}
        >
          <Badge badgeContent={cartContext.productsCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, background: mode === "light" ? "#fff" : "#212121"}} overflow={"auto"}>
          {productsLength && (
            <>
              <Box display={{ md: "flex", xs: "block" }} justifyContent={"end"}>
                <Button
                  sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}
                  variant="contained"
                >
                  Proceed to checkout
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    cartContext.clearCart();
                    handleClose();
                  }}
                >
                  Clear cart
                </Button>
              </Box>

              <Grid container>
                {products.map((product) => (
                  <Grid
                    px={1}
                    key={product.id}
                    mt={2}
                    xs={12}
                    sm={6}
                    lg={4}
                    xl={3}
                    item
                  >
                    <Card sx={{ maxWidth: "400px", margin: "0 auto" }}>
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
                      <CardActions>
                        <Button
                          color="error"
                          onClick={() => {
                            cartContext.removeProductFromCart(product);
                            if (products.length === 1) {
                              handleClose();
                            }
                          }}
                          size="small"
                        >
                          Remove
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CartModal;
