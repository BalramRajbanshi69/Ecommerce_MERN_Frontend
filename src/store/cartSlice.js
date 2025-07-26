import { createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../http";
import { STATUSES } from "@/globals/misc/statuses";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: STATUSES.SUCCESS,
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    updateItems(state, action) {
      //  Find the index of the cart item whose product._id matches the given productId
      const index = state.items.findIndex(
        (item) => item.product._id === action.payload.productId
      );
      // If the item exists in the cart
      if (index != -1) {
        // Update its quantity to the new value from the action payload
        state.items[index].quantity = action.payload.quantity;
      }
    },
    deleteItems(state, action) {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
    },

    // you can also use uppper code OR second method code
    //         deleteItems(state, action) {
    //     const index = state.items.findIndex((item) => item.product._id === action.payload.productId);
    //     if (index !== -1) { // Always add a check to ensure the item was found
    //         state.items.splice(index, 1);
    //     }
    // },

    clearCart(state,action){
        state.items = []; // Clear the cart items
    }
  },
});

export const { setItems, setStatus, updateItems, deleteItems,clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId) {
  // add productid to the cart
  return async function addToCartThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post(`/cart/${productId}`); // since need authentication to add product in a cart

      dispatch(setItems(response.data.data)); // setItems response.data.data from backend
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// fetchCartItems                                     => user added to cart will now been seen when cliked to cart navbar and should fetch added cart
export function fetchCartItems() {
  return async function fetchCartItemsThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/cart/"); // since need authentication to fetch addedcartproduct in a cart
      dispatch(setItems(response.data.data)); // setItems response.data.data from backend
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      // console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// // increase / decrease quantity
export function updateCartItem(productId, quantity) {
  return async function updateCartItemThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.patch(`/cart/${productId}`, {
        quantity,
      }); // since need authentication to update cartItem(quantity)  in a cart  + quantity from res.body
      dispatch(updateItems({ productId, quantity })); // updateItems response.data.data from backend
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// delete items from the cart first method reducer
export function deleteCartItem(productId) {
  return async function deleteCartItemThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await APIAuthenticated.delete(`/cart/${productId}`);
      dispatch(deleteItems(productId));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// when using second deleteItems method (reducers) in the cartSlice.js
// export function deleteCartItem(productId) {
//     return async function deleteCartItemThunk(dispatch) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             await APIAuthenticated.delete(`/cart/${productId}`);
//             // Change this line:
//             dispatch(deleteItems({ productId: productId })); // Pass an object with productId
//             dispatch(setStatus(STATUSES.SUCCESS));
//         } catch (error) {
//             console.log(error);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     }
// }