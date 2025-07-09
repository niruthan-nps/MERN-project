import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice";
import axios from "axios";

// export const addCartItem = (id, quantity) => async (dispatch) => {
//   try {
//     dispatch(addCartItemRequest());
    
//     const { data } = await axios.get(`/api/products/${id}`);
   
//     dispatch(addCartItemSuccess({
//       product: data.product._id,
//       name: data.product.name,
//       price: data.product.price,
//       image: data.product.images[0].image,
//       stock: data.product.stock,
//       quantity
//     }));
    
//   } catch (error) {
//     // console.error("Error adding item to cart:", error);
//     // Handle error appropriately, e.g., dispatch an error action
//   }
// }


export const addCartItem = (id, quantity) => async (dispatch) => {
  try {
    dispatch(addCartItemRequest());
    console.log(" Dispatched addCartItemRequest");

    const { data } = await axios.get(`/api/v1/product/${id}`);
    console.log("Product fetched:", data.product);

    dispatch(addCartItemSuccess({
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].image,
      stock: data.product.stock,
      quantity
    }));
    console.log("Dispatched addCartItemSuccess");

  } catch (error) {
    console.error(" Error adding item to cart:", error);
  }
}