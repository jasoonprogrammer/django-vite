import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import SideNav from '../components/SideNav'
import OrderedContent from '../components/FeaturedItems'
import MainContent from '../components/MainContent'
import { ShopContext } from '../App'

const ShopLayout = () => {
  const { hasMore } = useContext(ShopContext)
  return (
    <>
    <div className="mx-5">
      <SearchBar />
      <div className="flex relative">
        <SideNav />
        <Outlet />
        <OrderedContent />
        {hasMore &&
        <div className="absolute bottom-10 right-1/2 bg-gray-500 opacity-[0.3] hover:opacity-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          }
      </div>
    </div></>
  )
}

export default ShopLayout