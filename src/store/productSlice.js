import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { STATUSES } from "../globals/misc/statuses";
import { API, APIAuthenticated } from "../http";



const productSlice = createSlice({
    name:"product",
    initialState:{
        data:[],
        status: STATUSES.SUCCESS,
        searchTerm:"",
        userProducts:[],  // for specific user product
        userProductsStatus: STATUSES.SUCCESS ,// for specific user status 
        selectedProductDetails:{},   // for single product details
        updateProductStatus: STATUSES.SUCCESS, // New status for update operation
        
    },
    reducers:{                      // reducers are pure and synchronous , so no api calls
        setProduct(state,action){                       // register first set user
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setUserProduct(state,action){
            state.userProducts = action.payload
        },
        setUserProductsStatus(state, action) {
            state.userProductsStatus = action.payload;
        },
        setSearchTerm(state,action){
            state.searchTerm = action.payload;
        },
        setSelectedProductDetails(state, action) {
            state.selectedProductDetails = action.payload;
        },
        //  deleteProductById(state, action) {
        //     const index = state.data.findIndex((product) =>product._id === action.payload.productId);
        //     state.data.splice(index, 1);

        // },

        // since we need to update the userProducts too so that after deletion , it will delete without refresh userProduct page
         deleteProductById(state, action) {
            state.data = state.data.filter((product) => product._id !== action.payload.productId);
            state.userProducts = state.userProducts.filter((product) => product._id !== action.payload.productId);
        },
        
         addProducts(state,action){
            state.data.push(action.payload)
            state.userProducts.push(action.payload);   //This line appends the newly added product (from the addProduct thunk) to the userProducts array in the Redux state.
        },
          // New reducer to handle the status of the update operation
        setUpdateProductStatus(state, action) {
            state.updateProductStatus = action.payload;
        },
            // New reducer to update a specific product in the state arrays
        updateProductInState(state, action) {
            const updatedProduct = action.payload;
            // Update in `data` array
            state.data = state.data.map(product =>
                product._id === updatedProduct._id ? updatedProduct : product
            );
            // Update in `userProducts` array
            state.userProducts = state.userProducts.map(product =>
                product._id === updatedProduct._id ? updatedProduct : product
            );
            // If the updated product is the currently selected one, update it too
            if (state.selectedProductDetails && state.selectedProductDetails._id === updatedProduct._id) {
                state.selectedProductDetails = updatedProduct;
            }
        },
       
    }
})


export const {setProduct,setStatus,setUserProduct,setUserProductsStatus,setSearchTerm,setSelectedProductDetails,deleteProductById,addProducts,setUpdateProductStatus,
    updateProductInState } = productSlice.actions
export default productSlice.reducer



// thunk middlware 
// fetch products

export function fetchAllProducts(data){
    return async function fetchAllProductsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get("/product",data) 
            console.log(response.data.data);
            
            dispatch(setProduct(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}




// fetch user specific products
export function fetchUserProducts(data){
    return async function fetchUserProductsThunk(dispatch){
        dispatch(setUserProductsStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.get("/product/userproducts",data) 
            console.log(response.data.data);
            
            dispatch(setUserProduct(response.data.data));
            dispatch(setUserProductsStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setUserProductsStatus(STATUSES.ERROR));

        }

    }
}



// fetch single product
export function fetchSingleProduct(productId){
    return async function fetchSingleProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get(`/product/${productId}`) 
            dispatch(setSelectedProductDetails([response.data.data])); // setting single product in the data array
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}

// although to add product , its works of admin to add but for now we can make user to add 

export function addProduct(data){
    return async function addProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.post("/product/",data,
                {
                    headers:{
                        "Content-Type":"multipart/form-data"                  // handle for image important
                    }
                }
            ) 
            console.log("Added Product Response:", response.data.data);
           dispatch(addProducts(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            throw error; 
            
        }

    }
}



// export function deleteProduct(productId) {
//     return async function deleteProductThunk(dispatch) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const response = await APIAuthenticated.delete(`/product/${productId}`);
//             dispatch(deleteProductById({ productId }));
//             dispatch(setStatus(STATUSES.SUCCESS));
//         } catch (error) {
//             dispatch(setStatus(STATUSES.ERROR));
//             throw error; 
//         }
//     };
// }


export function deleteProduct(productId) {
    return async function deleteProductThunk(dispatch) {
        dispatch(setUserProductsStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/product/${productId}`);
            dispatch(deleteProductById({ productId }));
            dispatch(setUserProductsStatus(STATUSES.SUCCESS));
        } catch (error) {
            dispatch(setUserProductsStatus(STATUSES.ERROR));
            throw error; 
        }
    };
}




export function updateProduct({ id, productData }) {
  return async function updateProductThunk(dispatch) {
    dispatch(setUpdateProductStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.put(`/product/${id}`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product updated successfully:', response.data.data);
      dispatch(updateProductInState(response.data.data));
      dispatch(setUpdateProductStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.error('Error updating product:', error);
      dispatch(setUpdateProductStatus(STATUSES.ERROR));
      throw error;
    }
  };
}