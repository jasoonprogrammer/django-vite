import { createContext, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import SideNav from './components/SideNav'
import MainContent from './components/MainContent'
import OrderedContent from './components/FeaturedItems'
import AddProduct from './components/Admin/AddProduct'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ShopLayout from './layouts/ShopLayout'
import ProductList from './components/Products/ProductList'
import CategoryItem from './components/CategoryItem'
import ProductItemCategory from './components/Products/ProductItemCategory'


const shopRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element = {<ShopLayout />}>
        <Route index element = {<MainContent />} ></Route>
        <Route path=":category" element = {<ProductItemCategory />}>
          <Route path=":productId" element={<ProductItemCategory />} />
        </Route>
        <Route path="add_product" element = {<AddProduct />}></Route>
    </Route>
  )
)

export const ShopContext = createContext()


function App() {
  const [count, setCount] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  return (
    <>
    {/* <div className="mx-5">
      <SearchBar />
      <div className="flex">
        <SideNav />
        <MainContent />
        <OrderedContent />
      </div>
    </div> */}
    <ShopContext.Provider value = {{hasMore: hasMore, setHasMore: setHasMore}}>
      <RouterProvider router = {shopRouter}>

      </RouterProvider>
    </ShopContext.Provider>

{/* <div className="mx-5">
      <SearchBar />
      <AddProduct />
    </div> */}
    </>
  )
}

export default App
