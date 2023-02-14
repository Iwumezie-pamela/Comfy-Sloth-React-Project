import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
import Loading from './Loading'

const ProductList = () => {
  const { filtered_product, grid_view, product_loading } = useFilterContext()

  if (product_loading) {
    return <Loading />
  }

  if (filtered_product.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    )
  }

  if (grid_view === false) {
    return <ListView products={filtered_product}>product list</ListView>
  }

  return <GridView products={filtered_product}>product list</GridView>
}

export default ProductList
