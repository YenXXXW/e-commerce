import React from 'react'
import { useParams } from 'react-router-dom'

export const SearchItem = () => {
  const { searchItem }= useParams()
  console.log(searchItem)  
  return (
    <div className='text-red-500 bg-slate-400 relative'>
        SearchItem
    </div>
  )
}
