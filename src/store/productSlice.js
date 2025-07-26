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
        }
       
    }
})


export const {setProduct,setStatus,setUserProduct,setUserProductsStatus,setSearchTerm,setSelectedProductDetails} = productSlice.actions
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


