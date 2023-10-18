import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { Home } from '../Pages/Admin/Home.jsx'
import { Error } from '../_utils/Error.jsx'

export default function AdminRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<Error />} />
    </Routes>
  )
}
