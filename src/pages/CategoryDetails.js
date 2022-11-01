import { Link, useLocation, useParams } from "react-router-dom"
import { useCategory } from "../hooks/useCategory"
import { BsStarHalf , BsStar ,BsStarFill } from 'react-icons/bs'


export const CategoryDetails = () => {

  const location = useLocation()

  const {category} = useParams()
  const { isLoading , isError , data }=useCategory(category)
  if(isLoading){
    return <p>Loading ...</p>
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
                <p className='text-[#f7ef8a]'>
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
    <div className='top-0 z-10  px-2 lg:px-10'>

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 justify-between gap-y-12 ">
        {  
          
          data.data.products.map(product=>(
            
            <Link key={product.id} to={`${location.pathname}/${product.title}`}>
              <div className='mx-auto flex space-x-2 md:flex-col justify-center items-center'>
                <div className="w-[150px] sm:w-[250px] h-[150px] sm:h-[200px] rounded-md flex items-center">
                  <img src={product.thumbnail}  className="w-[100%] h-[60%] sm:h-[100%] objectfit-cover"/>
                </div>                
                <div className="text-start px-2 py-2 w-[150px] sm:w-[250px]">
                  <p className="text-sm mt-2 max-w[100px] sm:max-w-[250px] mb-2">
                    {product.description.length < 50 
                    ? product.description 
                    : product.description.slice(0,30)+'...'}
                  </p>
                  {handleStars(product.rating)}
                  <p className="text-base sm:text-lg font-bold my-3">${product.price}</p>
                  <button className="orderButton text-sm sm:text-base">Order Now</button>
                </div>                                 
              </div>   
            </Link>                   
          ))
        }
      </div>
      
    </div>
  )
}
