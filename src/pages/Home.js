import React, { useRef, useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { IoIosArrowBack, IoIosArrowForward  } from 'react-icons/io'
import { BsStarHalf , BsStar ,BsStarFill } from 'react-icons/bs'
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
    const handleStars = (num) => {
        let rating = Math.round(num*2)/2
        let stars=[]
        for(let i = 0 ; i <=4 ; i++) { 
            if(rating >= 1) {
            stars.push(1)
            rating =rating-1
            }else if(rating === 0.5 ){
            stars.push(0.5)
            rating = rating-0.5  
            }else{
                stars.push(0)
            }
        }

        return (
            <div className='flex space-x-1'>
                {
                stars.map(star=>(
                    <p className='text-[#926f34] dark:text-[#e0aa3e]'>
                        {
                            (star === 1 && <BsStarFill/>)
                            || ( star === 0 && <BsStar/>) 
                            || ( star === 0.5 && <BsStarHalf/>)
                        }
                    </p>                
                ))
            }
            </div>            
        )
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
        {/* <div className='w-full h-[40vh] sm:h-[60vh]'>
            <img
             src={'https://www.connectpos.com/wp-content/uploads/2020/12/pasted-image-0-1-1024x576.png'}
             className="w-full h-full object-cover"
            />
        </div> */}
        <div className='mt-[10vh] grid sm:grid-cols-2 gap-x-10 gap-y-10'>
            {
                products?.data.products.map(product=>(
                    <Link to={`/${product.category}/${product.title}`}>
                        <div
                        className=' flex  justify-center space-x-4 bg-red-400' 
                        >
                            <div className='w-[130px] h-[120px] sm:w-[180px] sm:h-[150px] md:w-[200px] relative'>
                                <img src={product.thumbnail}
                                 className="rounded-md w-[100%] h-[100%] object-cover"
                                />
                            </div>
                            
                            <div className='h-[130px] sm:h-[150px]  md:w-[200px] w-[150px] flex flex-col justify-center sm:w-[200px] text-sm bg-slate-200'>
                                <p>{product.title}</p>
                                <p className='mb-2'>price : <span className='text-base font-bold'>${product.price}</span></p>
                                {handleStars(product.rating)}
                                <button className='orderButton mt-3 max-w-[100px]'>Order Now</button>                              
                            </div>                            
                        </div>  
                    </Link>
                      
                ))
            }
        </div>
    </div>
  )
}
