import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let { id, color, amount, product } = action.payload

      //check if my items exist in  the cart
      let tempItem = state.cart.find((item) => item.id === id + color) //when setting up the id in my cart,i will combine the id and colors and this i because lets say a customer picks the same product this would help in combining the products together instead of displaying it separately.if the item.id matches the id+colors,it means the item is already in the cart.

      if (tempItem) {
        //if item exist in the cart and a customer selects the same product,add it to the already existing item in cart.i.e if the item is already in the cart, i just want to increase the amount

        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            //create a new amout property
            let newAmount = cartItem.amount + amount
            //always check with the stock that way a customer wont order more than whats available
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return { ...cartItem, amount: newAmount }
          } else {
            return cartItem
          }
        })

        return { ...state, cart: tempCart }
      } else {
        //if item does not exist,create a new item and add it to the cart
        let newItem = {
          id: id + color, //cartitem id
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        }
        return { ...state, cart: [...state.cart, newItem] } //means add the new item to the cart
      }

    //remove item

    case REMOVE_CART_ITEM:
      const newCartItem = state.cart.filter(
        (item) => item.id !== action.payload
      )
      return { ...state, cart: newCartItem }

    //clear cart
    case CLEAR_CART:
      return { ...state, cart: [] }

    // //toggle amount
    // case TOGGLE_CART_ITEM_AMOUNT:
    //   const tempToggleCart = state.cart.map((item) => {
    //     if (item.id === action.payload.id) {
    //       if (action.payload.type === 'increase') {
    //         let newAmount = item.amount + 1
    //         if (newAmount > item.max) {
    //           newAmount = item.max
    //         }
    //         return { ...item, amount: newAmount }
    //       }
    //       if (action.payload.type === 'decrease') {
    //         let newAmount = item.amount - 1
    //         if (newAmount < 1) {
    //           newAmount = 1
    //         }
    //         return { ...item, amount: newAmount }
    //       }
    //     }
    //     return item
    //   })
    //   return { ...state, cart: tempToggleCart }

    // count cart total
    case COUNT_CART_TOTALS:
      let { total_items, total_amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem

          cartTotal.total_items += amount
          cartTotal.total_amount += price * amount
          return cartTotal
        },
        { total_items: 0, total_amount: 0 }
      )
      return { ...state, total_items, total_amount }

    default:
      break
  }

  //toggle
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      }
      return item
    })
    return { ...state, cart: tempCart }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
