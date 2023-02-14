import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((product) => product.price)

      maxPrice = Math.max(...maxPrice) //to get the max price and since math.max cant return an array, we spread it.

      return {
        ...state,
        filtered_product: [...action.payload],
        all_product: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      }

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      }

    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      }

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      }

    case SORT_PRODUCTS:
      const { sort, filtered_product } = state
      let tempProduct = [...filtered_product]

      if (sort === 'price-lowest') {
        tempProduct = tempProduct.sort((a, b) => a.price - b.price) //the a and b acts like the items when mapped and here we are getting the vaalues of the lowest price
      }
      if (sort === 'price-highest') {
        tempProduct = tempProduct.sort((a, b) => {
          // if (a.price > b.price) return -1
          // if (a.price < b.price) return 1
          // return 0

          return b.price - a.price
        })
      }
      // if (sort === 'name-a-z') {
      //   tempProduct = tempProduct.sort((a, b) => {
      //     // if (a.name > b.name) return 1
      //     // if (a.name < b.name) return -1
      //     // return 0

      //   })
      // } or

      if (sort === 'name-a-z') {
        tempProduct = tempProduct.sort((a, b) => a.name.localeCompare(b.name))
      }

      // if (sort === 'name-z-a') {
      //   tempProduct = tempProduct.sort((a, b) => {
      //     if (a.name > b.name) return -1
      //     if (a.name < b.name) return 1
      //     return 0
      //   })
      // } or

      if (sort === 'name-z-a') {
        tempProduct = tempProduct.sort((a, b) => b.name.localeCompare(a.name))
      }

      return {
        ...state,
        filtered_product: tempProduct,
      } //temp product is set to filtered product and filtered product is set to temp so that in case none of the conditions matches,i get to display the the filtered products instead of an empty array

    case UPDATE_FILTERS:
      const { name, value } = action.payload
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      }

    case FILTER_PRODUCTS:
      const { all_product } = state
      const { text, category, company, color, price, shipping } = state.filters
      let tempProducts = [...all_product] //anytime i dispatch the filter product,always start from the scratch
      //filtering

      //text
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text) //this means get the names of the value that stats wuth the text alphabeth
        })
      }

      //category

      if (category !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.category === category
        })
      }

      //company

      if (company !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.company === company
        })
      }

      //colors

      if (color !== 'all') {
        tempProducts = tempProducts.filter((productColor) => {
          // return productColor.colors.includes(color)
          return productColor.colors.find((c) => c === color)
        })
      }

      //price

      tempProducts = tempProducts.filter((productPrice) => {
        return productPrice.price <= price
      }) //if the filtered product price is less than or equal to our state price ,return the price else if it is greater ,do not return anything

      //shipping

      if (shipping === true) {
        tempProducts = tempProducts.filter((productShipping) => {
          return productShipping.shipping === shipping
        })
      }

      return {
        ...state,
        filtered_product: tempProducts, //filtered product is equal to temp product so whatever is gotten in our temp would add the same effect to our filtered product and if the condition is not met,i will have to return all the products
      }

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          category: 'all',
          company: 'all',
          color: 'all',

          price: state.filters.max_price, //set price back to the maxprice when my filter is cleared
          shipping: false,
        },
      }

    default:
      break
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
