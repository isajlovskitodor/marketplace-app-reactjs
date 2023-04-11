import { useState, forwardRef, useContext } from "react";
import { Button, Slide, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CartContext from "../../context/cart-context";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionUp = (props) => {
  return <Slide {...props} direction="up" />;
};

const AddToCartButton = ({ product }) => {
  const [open, setOpen] = useState(false);
  const cartContext = useContext(CartContext);
  const inCart = cartContext.productInCart(product)
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => {
    setOpen(true);
    setTransition(() => Transition);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          handleClick(TransitionUp);
          !inCart ? cartContext.addProductToCart(product) : cartContext.removeProductFromCart(product);
        }}
        size="small"
        color={inCart ? "error" : "primary"}
      >
        {!inCart ? "Add to cart" : "Remove from cart"}
      </Button>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} TransitionComponent={transition}>
        <Alert
          onClose={handleClose}
          severity={inCart ? "success" : "error"}
          sx={{ width: "100%", color:"#fff" }}
        >
          {product.title} {inCart ? "added to cart!" : "removed from cart!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToCartButton;
