import { useQuery } from 'react-query'
import { products } from '../api/products'

const fetchAllProducts =()=>{
    return products('/products?limit=1000')
}

export const useGetAllProducts = () => {
  return useQuery('all-products' , fetchAllProducts)
}
