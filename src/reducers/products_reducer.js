import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };

    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };

    case GET_PRODUCTS_LOADING:
      return { ...state, product_loading: true };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        featured_product: action.payload.filter(
          (product) => product.featured === true
        ),
        products: action.payload,
        product_loading: false,
      };

    case GET_PRODUCTS_ERROR:
      return { ...state, product_error: true, product_loading: false };

    case GET_SINGLE_PRODUCT_LOADING:
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      };

    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProductPage: action.payload,
        single_product_loading: false,
      };

    case GET_SINGLE_PRODUCT_ERROR:
      return { ...state, single_product_error: true, single_product_loading: false };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default products_reducer;
