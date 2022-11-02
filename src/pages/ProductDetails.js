import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCategory } from '../hooks/useCategory'

export const ProductDetails = () => {
  const { category , product} = useParams()
  const { data , isLoading , isError } = useCategory(category)  
  const [ productImage , setProductImage ] = useState()
  const selectedproduct = data?.data.products.filter(prod=>{
    if(prod.title === product) return prod
  })  
  
  const handleImage=(src)=>{
    setProductImage(src)
  }

  useEffect(()=>{
    if(selectedproduct){
      console.log(selectedproduct[0].thumbnail)
      handleImage(selectedproduct[0].thumbnail)
    }
    
  },[selectedproduct?.[0].thumbnail])

  if(isLoading){
    return <p>Loading...</p>
  }
  return (
    <div className='w-full h-[80vh] flex items-center justify-center pt-20 overflow-y-auto'>
      
      <div className=''>
      {
        selectedproduct.map((specs , i)=>(
          <div key={i} className='flex flex-col md:flex-row w-full gap-x-20 sm:gap-y-14 items-center justify-center'>
            <div className='flex flex-col md:flex-row space-x-2 space-y-2 md:space-y-0 md:w-[60%] justify-center items-center'>
              <div className='flex md:flex-col space-x-2 md:space-y-2 md:space-x-0'>
                {
                  specs.images.map(img=>(
                    <div className='cursor-pointer' onClick={()=>handleImage(img)}>
                      <img src={img} className='w-[100px] h-[70px] object-fill'/>
                    </div>  
                    
                  ))
                }
              </div> 
              <div className='w-[70%]' onClick={()=>handleImage(productImage)}>
                <img
                  src={productImage}               
                  className='w-[100%] max-h-[300px] md:max-h-[350px] object-contain rounded-sm mx-auto'
                />   
              </div>  
                
            </div>             
            <div className='py-3 md:w-[40%]'>
              <p className='font-bold detailsTextsize'>{specs.description}</p>              
              <div className='mt-3 border-t-[1px] borderLightTheme mx-3 py-2'>
                <p className='my-2'><span className='min-w-[120px]'>product name  :</span> <span className='font-bold md:text-lg'>{specs.title}</span></p>
                <p className='my-2'>brand: <span className='font-bold detailsTextsize'>{specs.brand}</span></p>
                <p className='my-2'>in stock : <span className='font-bold detailsTextsize'>{specs.stock}</span></p>
                <p className='my-2'><span className='w-[120px]'>price :</span> <span className='font-bold text-2xl'>${specs.price}</span></p>                
              </div>  
              <button className='orderButton'>Order Now</button>
            </div>              
          </div>
        ))
      }
      </div> 
      
      
           
    </div>
    
  )
}
