import { BsSun , BsFillMoonFill } from 'react-icons/bs' 
import { RiMenu4Line } from 'react-icons/ri'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoCloseOutline } from 'react-icons/io5'
import { BsPerson } from 'react-icons/bs'
import { useDarkMode } from '../hooks/useDarkMode'
import { Link, Outlet, useNavigate } from 'react-router-dom'
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
  const navigate=useNavigate()

  const items = products?.data.products.map(product=>{
    return{
      name : product.title,
      category : product.category
    }
  })
   
  
  const handleOnSelect = (item) => {
    setIsSearching(!isSearching)
    navigate(`/${item.category}/${item.name.replace(/\s/g, '')}`)
  };
  

  return (
    <div className='w-full  z-10 py-2 px-5 md:px-10 lg:px-20 relative'>
      <div className='flex h-[35px] items-center'>
        <div className='space-x-5 md:space-x-10 flex items-center'>
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

        <div className='absolute left-[50%] z-40'>
          <Link to='/'>
            <img src='/logo.png' width={'30px'} alt={'logo'}/>
          </Link>
        </div>
        <div className='space-x-5 md:space-x-10 flex items-center ml-auto'>
          <div className='flex space-x-2 '>
            <div className={`w-[170px] z-50 ${!isSearching && 'hidden'}`}>
              <ReactSearchAutocomplete  items={items}
                // fuseOptions={{ keys: ["title", "description"] }} // Search on both fields
                // resultStringKeyName="title" // String to display in the results
                // onSearch={handleOnSearch}
                // onHover={handleOnHover}
                onSelect={handleOnSelect}
                // onFocus={handleOnFocus}
                // onClear={handleOnClear}
                showIcon={false}
                showClear={false}
                styling={{
                  height: "26px",
                  border: "1px solid darkgreen",
                  borderRadius: "4px",
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
                }}
              />
            </div>
            <AiOutlineSearch size='22'
             onClick={()=>setIsSearching(!isSearching)} 
             className ={`${isSearching && 'hidden'} cursor-pointer my-auto`}/>
            <IoCloseOutline size='20'
             onClick={()=>setIsSearching(!isSearching)}
             className={`my-auto ${!isSearching && 'hidden'}`}/> 
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
      <div>
      
      </div>
      <Outlet/>
    </div>
  )
}
