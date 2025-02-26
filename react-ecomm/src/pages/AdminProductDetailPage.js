import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductDetails from '../features/admin/components/AdminProductDetails'

function AdminProductDetailPage() {
  return (
    <Navbar>
       <AdminProductDetails></AdminProductDetails>
    </Navbar>
  )
}

export default AdminProductDetailPage;