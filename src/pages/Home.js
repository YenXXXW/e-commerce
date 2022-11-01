import React, { useRef, useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import {IoIosArrowBack, IoIosArrowForward  } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useGetAllProducts } from '../hooks/useGetAllProducts'

export const Home = () => {
    const rowRef = useRef(null)
    const { isLoading , data , isError } = useCategories()
    const [ moved , setMoved ] = useState(false)
    const [ToScrollTo , setToScrollTo] = useState(null)
    const { data : products }= useGetAllProducts()

    const handleClick=(direction)=>{
        setMoved(true)
        if(rowRef.current){
            const { scrollLeft , clientWidth} = rowRef.current
            const scrollTo = 
                direction === 'left'
                ? scrollLeft-clientWidth
                : scrollLeft+clientWidth

            setToScrollTo(scrollTo)
            rowRef.current.scrollTo({left:scrollTo  ,  behavior : 'smooth'})
        }
    }
  return (
    <div className = 'w-full relative'>
        <div className='mt-2 px-10 w-[90vw]  lg:w-[85vw] mx-auto relative'>
            
            <IoIosArrowBack 
            onClick={()=>handleClick('left')}
            className={`absolute top-1 left-2 cursor-pointer hover:scale-150
            transiton duration-200  ${ToScrollTo <= 0 && 'hidden'}`} />
            
            <div ref={rowRef} className='flex scrollbar-hide overflow-x-auto w-full space-x-8 '>
                {
                    data?.data.map((category ,i)=>(
                        <Link  key={i} to={`/${category}`}>
                            <p
                             className='whitespace-nowrap cursor-pointer font-bold text-sm 
                             px-[6px] py-1 hoverColor rounded-sm transition duration-500'
                            >
                                {category}
                            </p>
                        </Link>                        
                    ))                   
                }
            </div>
            <IoIosArrowForward 
            onClick={()=>handleClick('right')}
            className='absolute top-1 right-2 cursor-pointer hover:scale-150
            transiton duration-200'/>
            
        </div>
        <div className='mt-[40vh] sm:mt-[50vh] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-10'>
            {
                products?.data.products.slice(0,19).map(product=>(
                    <Link to={`/${product.category}/${product.title.replace(/\s/g, '')}`}>
                        <div
                        className='w-[150px] md:w-[180px]' 
                        >
                            <img src={product.thumbnail}/>
                            {product.title}
                        </div>  
                    </Link>
                      
                ))
            }
        </div>
    </div>
  )
}
