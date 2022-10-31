import { BsSun , BsFillMoonFill } from 'react-icons/bs' 
import { RiMenu4Line } from 'react-icons/ri'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { BsPerson } from 'react-icons/bs'
import { useDarkMode } from '../hooks/useDarkMode'
import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useGetAllProducts } from '../hooks/useGetAllProducts'
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const Navbar = () => {
  const [ colorTheme , setTheme ] = useDarkMode()
  const [menubarhidden , setMenuBarHidden] = useState(true)
  const {data} = useCategories()
  const { data : products }= useGetAllProducts()
  const [isSearching , setIsSearching] = useState(false)
  const items = products?.data.products.map(product=>{
    return{
      name : product.title, 
      description : product.description
    }
  })
   
  
  return (
    <div className='w-full  z-10 py-2 px-5 md:px-10 lg:px-20 relative'>
      <div className='flex h-[35px] items-center'>
        <div className='space-x-10 flex items-center'>
          <RiMenu4Line size={20}
           className ={`cursor-pointer ${menubarhidden ? '' : 'text-[#6439b4]' }`}
           onClick={()=>setMenuBarHidden(!menubarhidden)}/>
          <div>
            {
              colorTheme === 'dark' 
              ? <BsFillMoonFill size='20' onClick={()=>setTheme(colorTheme)} className ="cursor-pointer"/> 
              : <BsSun size='20'  onClick={()=>setTheme(colorTheme)} className ="cursor-pointer"/>
            }
          </div>
        </div>

        <div className='absolute left-[50%]'>
          <Link to='/'>
            <img src='/logo.png' width={'30px'}  />
          </Link>
        </div>
        <div className='space-x-10 flex items-center ml-auto'>
          <div className='flex space-x-2'>
            <div className={`w-[250px] ${isSearching ? 'block' : 'hidden'}`}>
              <ReactSearchAutocomplete  items={items}
                showIcon={false}
                styling={{
                  height: "30px",
                  border: "1px solid darkgreen",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  boxShadow: "none",
                  hoverBackgroundColor: "lightgreen",
                  color: "darkgreen",
                  fontSize: "12px",
                  fontFamily: "Courier",
                  iconColor: "green",        
                  lineColor: "lightgreen",
                  placeholderColor: "darkgreen",
                  clearIconMargin: "3px 8px 0 0",
                  zIndex: 2,
                  searchIconMargin: '0 0 0 16px'
                }}
              />
            </div>
            <AiOutlineSearch size='22'
             onClick={()=>setIsSearching(!isSearching)} 
             className ={`${isSearching && 'text-[#736de6]'} cursor-pointer my-auto`}/>
          </div>
          
          <BsPerson size={25} className ="cursor-pointer"/>
        </div>             
      </div>
      <div
       className={`absolute top-14 left-5 md:left-10 w-[150px] h-[80vh] z-50 overflow-x-auto backdrop-blur-md
       ${menubarhidden ? 'hidden' : 'block' } !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-[#511cad]
       font-bold space-y-3 px-2 rounded-md py-2 bg-white/30`}>
        {
          data?.data.map(category=>(
            <div key={category}>
              <Link to={`/${category}`}>
                <p className="text-sm">
                  {category}
                </p>
              </Link>
            </div>  
            
          ))
        }
      </div>
      <Outlet/>
    </div>
  )
}
