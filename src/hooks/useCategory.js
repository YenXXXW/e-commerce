import { useQuery } from 'react-query'
import { products } from '../api/products'

const fetchCategory=(category)=>{
    return products(`/products/category/${category}`)
}
export const useCategory = (category) => {
  return useQuery(['category' , category] , ()=>fetchCategory(category))
}
