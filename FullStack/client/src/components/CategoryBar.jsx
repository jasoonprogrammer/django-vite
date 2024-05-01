import { useEffect, useState } from "react"
import CategoryList from "./CategoryList"
import $ from 'jquery';

const CategoryBar = () => {
    let x = 0
    let direction = null

    const scrollX = (target, direction) => {
        const element = document.querySelector(`#${target}`)
        element.scrollBy({
            left: direction > 0 ? 150 : -150,
            behavior: "smooth"
        })
    }

    return(
        <>
        <div className="py-2">
            <span className="font-semibold text-2xl mb-2">Category</span>
            <div className="relative no-scrollbar">
                <div className="overflow-x-scroll no-scrollbar" id="category-list">
                    <CategoryList />
                </div>
                <div className="absolute top-2 left-2 bg-gray-200 opacity-[0.5] cursor-pointer p-2 hover:opacity-[1] rounded-full" onClick = {() => scrollX("category-list", 0)} >
                    
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>


                </div>
                <div className="absolute top-2 right-2 bg-gray-200 opacity-[0.5] cursor-pointer p-2 hover:opacity-[1] rounded-full" onClick = { () => scrollX("category-list", 1)} >
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>


                </div>
            </div>
        </div>
        </>
    )
}

export default CategoryBar