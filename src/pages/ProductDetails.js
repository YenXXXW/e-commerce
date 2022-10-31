import React from 'react'
import { useParams } from 'react-router-dom'
import { useCategory } from '../hooks/useCategory'

export const ProductDetails = () => {
  const { category , product} = useParams()
  const { data , isLoading , isError } = useCategory(category)  
  const selectedproduct = data?.data.products.filter(prod=>{
    if(prod.title.replace(/\s/g, '') === product) return prod
  })  
   
  if(isLoading){
    return <p>Loading...</p>
  }
  return (
    <div className='w-full h-[80vh] flex items-center justify-center pt-20'>
      
      <div className=''>
      {
        selectedproduct.map((specs , i)=>(
          <div key={i} className='grid grid-cols-2 gap-x-10 items-center justify-center'>
            <div className='relative mx-auto'>
              <img
               src={specs.images[0]} 
               width='330px'
               height={'300px'}                
               className='max-h-[70vh] rounded-sm'
              />               
            </div>  
            <div className='py-3'>
              <p className='font-bold detailsTextsize'>{specs.description}</p>              
              <div className='mt-3 border-t-[1px] borderLightTheme mx-3 py-2'>
                <p className='my-2'><span className='min-w-[120px]'>product name  :</span> <span className='font-bold md:text-lg'>{specs.title}</span></p>
                <p className='my-2'>brand: <span className='font-bold detailsTextsize'>{specs.brand}</span></p>
                <p className='my-2'>in stock : <span className='font-bold detailsTextsize'>{specs.stock}</span></p>
                <p className='my-2'><span className='w-[120px]'>price :</span> <span className='font-bold text-2xl'>${specs.price}</span></p>                
              </div>  
              
            </div>              
          </div>
        ))
      }
      </div> 
      
      
           
    </div>
    
  )
}
