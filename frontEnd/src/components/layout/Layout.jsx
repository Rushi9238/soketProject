import React, { Suspense } from 'react'
import Loading from '../ui/Loading'
import AuthLayout from './authLayout/AuthLayout'

const Layout = () => {
  return (
    <>
    <Suspense fallback={<div className='flex flex-auto flex-col h-[100vh]'>
        <Loading/>
    </div>}>
        <AuthLayout/>
    </Suspense>
    </>
  )
}

export default Layout