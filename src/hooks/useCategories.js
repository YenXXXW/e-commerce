import { useQuery } from 'react-query'
import { products } from '../api/products'

const fetchCategories =()=>{
    return products('/products/categories')
}

export const useCategories = () => {
  return useQuery('categories' , fetchCategories)
}
