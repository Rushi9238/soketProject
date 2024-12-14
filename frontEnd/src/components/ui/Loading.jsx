import React from 'react'
import { CgSpinner } from 'react-icons/cg'

const Loading = () => {
  return (
   <>
   <div className='flex items-center justify-center h-full'>
   <CgSpinner size={40} className='animate-spin' />
   </div>
   </>
  )
}

export default Loading