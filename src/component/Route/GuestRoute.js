import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function GuestRouter() {
  //  const {account,setAccount}= useAuth()
  const token = localStorage.getItem("token");

  //  console.log('guest'+account);
  //  setAccount(true)
  //tại vì chưa có api đăng nhập để lấy token lưu trên storage, vì cách set useState này thì cứ nhập ở url là nó rerender lại=> account= false
   if(token) return <Navigate to={'/resourceAllocation'} replace />
  
  return (
    <Outlet></Outlet>
  )
}
