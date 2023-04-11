import { createContext, useState } from "react";

const CartContext = createContext({
  cartProducts: [],
  productsCount: "",
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
  productInCart: () => {},
});

export const CartContextProvider = (props) => {
  const [cartProductsState, setCartProductsState] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  );
  let productsCount = 0;

  if (cartProductsState) {
    productsCount = cartProductsState.length;
  }

  const clearCart = () => {
    setCartProductsState([]);
  };

  const productInCart = (product) => {
    if (productsCount === 0) {
      return false;
    }
    const inCart = cartProductsState.includes(product);
    return inCart;
  };

  const addProduct = (product) => {
    if (productInCart(product)) {
      return;
    }
    setCartProductsState((prevState) => [...prevState, product]);
  };

  const removeProduct = (product) => {
    setCartProductsState((prevState) =>
      prevState.filter((item) => item.id !== product.id)
    );
  };

  localStorage.setItem("cart", JSON.stringify(cartProductsState));

  return (
    <CartContext.Provider
      value={{
        removeProductFromCart: removeProduct,
        addProductToCart: addProduct,
        clearCart: clearCart,
        cartProducts: cartProductsState,
        productsCount: productsCount,
        productInCart: productInCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
