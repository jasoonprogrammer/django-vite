import { useState } from "react"
import CategoryBar from "./CategoryBar"
import ProductList from "./Products/ProductList"
import { Outlet, useLoaderData } from "react-router-dom"
import axios from "axios"
const MainContent = () => {
    return(
        <>
        <div className="w-[70vw] px-3 h-[88.5vh] overflow-y-scroll no-scrollbar">
            <div className="my-3 sticky">
                <CategoryBar />
            </div>
            <div>
                <ProductList />
            </div>
            
        </div>
        </>
    )
}

export default MainContent
