// import axios from 'axios';
// import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlice';


// export const getProducts = () => async (dispatch) => {
//     try {
//         dispatch(productsRequest());
    
//         const { data } = await axios.get('/api/v1/products');
    
//         dispatch(productsSuccess(data));
//     }catch (error) {
//         dispatch(productsFail(error.response.data.message));
//     }
// }


import axios from 'axios';
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlice';

// Accept page number (default to 1 if not provided)
export const getProducts = (keyword, price, category, rating, page = 1) => async (dispatch) => {
  try {
    dispatch(productsRequest());

    let link = `/api/v1/products?page=${page}`;

    if (keyword) {
      // If keyword is provided, append it to the link
      link += `&keyword=${keyword}`;
    }

    if(price){
      // If price range is provided, append it to the link
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    }

    if (category) {
      // If category is provided, append it to the link
      link += `&category=${category}`;
    }

    if (rating) {
      // If rating is provided, append it to the link
      link += `&ratings=${rating}`;
    }

    // Send page number as query param
    const { data } = await axios.get(link);

    // Dispatch data (should include products, count, resPerPage)
    dispatch(productsSuccess(data));
  } catch (error) {
    dispatch(productsFail(error.response?.data?.message || error.message));
  }
};