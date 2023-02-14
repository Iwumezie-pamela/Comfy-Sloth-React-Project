import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS, //the product would be saved into the load product reducer
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_product: [], //this handles the products when filtered

  all_product: [], //this handles the when you clear filter and want to return to the default product page and it contains all the products

  grid_view: true, //handles the grid and list view
  sort: 'price-lowest', //handles the value in  our sort js and the default name must match the value
  filters: {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    max_price: 0,
    min_price: 0,
    price: 0,
    shipping: false,
  },

  // states for pagination
  paginated_products: [],
  page_number: 1,
  max_page_number: 0,
  products_per_page: 9,
  first_on_page: 0,
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { products, product_loading } = useProductsContext()

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.filters, state.sort]) //when the variable changes,update product and sort state and filters state.
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  const updateSort = (e) => {
    //acts as our onchange function also we need just the value because we need to update the values not  the names
    // let name = e.target.name
    let value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  const updateFilter = (e) => {
    //deals with the search and the rest of the input with an onchange function
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent //this gets the content of whatever is passed in and this happens because we are dealing with buttons
    }

    if (name === 'color') {
      //this gets the value of whatever is passed in and this happens because we are dealing with buttons
      value = e.target.dataset.color
    }

    if (name === 'price') {
      value = Number(value) //this changes our price from string to a number
    }

    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  const clearFilter = (e) => {
    //clears the filter and returns it to our default  value
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        product_loading,
        setGridView,
        setListView,
        updateSort,
        clearFilter,
        updateFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
