import React from 'react'
import ProductDetails from '../features/product/components/ProductDetails'
import Navbar from '../features/navbar/Navbar'

function ProductDetailPage() {
  return (
    <Navbar>
        <ProductDetails></ProductDetails>
    </Navbar>
  )
}

export default ProductDetailPage