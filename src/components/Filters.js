import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      max_price,
      min_price,
      price,
      shipping,
    },
    all_product,
    clearFilter,
    updateFilter,
  } = useFilterContext()

  const categories = getUniqueValues(all_product, 'category')
  const companies = getUniqueValues(all_product, 'company')
  const colors = getUniqueValues(all_product, 'colors')

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              value={text}
              onChange={updateFilter}
              className='search-input'
              placeholder='search'
            />
          </div>
          {/*  end of search  input*/}
          {/* categories start */}
          <div className='form-control'>
            <h5>category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    className={`${
                      category === c.toLowerCase() ? 'active' : null
                    }`}
                    key={index}
                    onClick={updateFilter}
                    name='category'
                    type='button'
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>
          {/* categories ends */}
          {/*company start  */}
          <div className='form-control'>
            <h5>company</h5>

            <select
              className='company'
              name='company'
              value={company}
              onChange={updateFilter}
            >
              {companies.map((comp, index) => {
                return (
                  <option key={index} value={comp}>
                    {comp}
                  </option>
                )
              })}
            </select>
          </div>
          {/* company end */}

          {/*colors start  */}
          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {colors.map((c, index) => {
                if (c === 'all') {
                  //to get all
                  return (
                    <button
                      key={index}
                      name='color'
                      onClick={updateFilter}
                      data-color='all'
                      className={`${
                        color === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                    >
                      all
                    </button>
                  )
                }

                return (
                  <button //to get colors
                    name='color'
                    onClick={updateFilter}
                    type='button'
                    style={{ backgroundColor: c }}
                    className={`${
                      color === c ? 'active color-btn' : 'color-btn'
                    }`}
                    data-color={c} //this represent the value
                    key={index}
                  >
                    {c === color ? <FaCheck /> : null}
                  </button>
                )
              })}
            </div>
          </div>
          {/* colors end */}

          {/*price start  */}
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{formatPrice(price)}</p>

            <input
              type='range'
              name='price'
              min={min_price}
              max={max_price}
              value={price}
              onChange={updateFilter}
            />
          </div>
          {/* price end */}

          {/*shipping start  */}
          <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>

            <input
              id='shipping'
              type='checkbox'
              name='shipping'
              checked={shipping} //used to check if the state is eithher t or f
              onChange={updateFilter}
            />
          </div>
          {/* shipping end */}
        </form>

        <button type='button' className='clear-btn' onClick={clearFilter}>
          clear filter
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
