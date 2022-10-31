import { QueryClientProvider , QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { CategoryDetails } from './pages/CategoryDetails'
import { ProductDetails } from './pages/ProductDetails';
const client = new QueryClient()

function App() {
  
  return (
    <div className='dark:darkTheme bg-white/60 min-h-screen text-black/70 textSize w-full'>
      <QueryClientProvider client ={client}>
        <BrowserRouter>   
          <Routes>
            <Route path='/' element={<Navbar/>} >
              <Route index element={<Home/>}/>
              <Route path=":category">
                <Route index element={<CategoryDetails/>}/>
                <Route path=":product" element={<ProductDetails/>}/>
              </Route>
            </Route>
          </Routes>       
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      </QueryClientProvider>
    </div>
    
   
  );
}

export default App;
