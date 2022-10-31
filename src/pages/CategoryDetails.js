import { Link, useLocation, useParams } from "react-router-dom"
import { useCategory } from "../hooks/useCategory"

export const CategoryDetails = () => {

  const location = useLocation()
  const handleRound=(num)=>{
    return Math.round(num*2)/2
  }
  const {category} = useParams()
  const { isLoading , isError , data }=useCategory(category)
  if(isLoading){
    return <p>Loading ...</p>
  }

  const handleRating=(num)=>{
    const rating=handleRound(num)
    if(rating === 4){
      return(
        <div>rating is 4</div>
      )
    }
  }
  
  return (
    <div className='top-0 z-10  px-2 lg:px-10'>

      <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 justify-between gap-y-12 ">
        {  
          
          data.data.products.map(product=>(
            
            <Link key={product.id} to={`${location.pathname}/${product.title.replace(/\s/g, '')}`}>
              <div className='mx-auto flex flex-col justify-center items-center'>
                {/* <p className="">{product.title}</p> */}
                <img src={product.thumbnail} width={'150px'} height={'200px'} className='rounded-md sm:hidden'/>
                <img src={product.thumbnail} width={'250px'} height={'200px'} className='hidden rounded-md sm:block'/>
                <div className="text-start px-2 py-2">
                  <p className="mt-2 max-w-[250px]">{product.description}</p>
                  {handleRating(product.rating)}
                  <p className="text-lg font-bold my-3">${product.price}</p>
                </div>
                  
                
                
              </div>   
            </Link>                   
          ))
        }
      </div>
      
    </div>
  )
}
