import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ singleProductPage }) => {
  const { addToCart } = useCartContext()

  //it controls the colors and also the number of product in stock meaning a buyer cannot buy more than what is available
  const { id, stock, colors } = singleProductPage

  const [mainColors, setMainColors] = useState(colors[0])
  const [amount, setAmount] = useState(1)

  const increase = () => {
    //handles the number of stock available so the customer won't order more than the available items in stock
    setAmount((prevAmount) => {
      let tempAmount = prevAmount + 1
      if (tempAmount >= stock) {
        tempAmount = stock
      }
      return tempAmount
    })
  }
  const decrease = () => {
    //since there is no point in having 0 so if tempAmount is less than 1,tempAmount would be equal to 1
    setAmount((prevAmount) => {
      let tempAmount = prevAmount - 1
      if (tempAmount < 1) {
        tempAmount = 1
      }
      return tempAmount
    })
  }

  return (
    <Wrapper>
      <div className='colors'>
        <span>Colors : </span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                className={`${
                  color === mainColors ? 'active color-btn' : 'color-btn'
                }`}
                key={index}
                style={{ backgroundColor: color }}
                onClick={() => setMainColors(color)}
              >
                {color === mainColors ? <FaCheck /> : null}
              </button>
            )
          })}
        </div>
      </div>

      <div className='btn-container'>
        <AmountButtons
          amount={amount}
          decrease={decrease}
          increase={increase}
        />
        <Link
          to='/cart'
          className='btn'
          onClick={() => addToCart(id, mainColors, amount, singleProductPage)} //maincolors=color while singleProductPage=product
        >
          Add to cart
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
