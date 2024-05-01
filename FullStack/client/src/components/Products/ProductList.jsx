import ProductItem from "./ProductItem"
import computerCase from "../../images/ComputerCase.png"
import motherboard from "../../images/Motherboard.png"
import ram from "../../images/RAM.png"
import gpu from "../../images/VideoCard.png"
import ssd from "../../images/SSD.png"
import monitor from "../../images/Monitor.png"
import keyboard from "../../images/Keyboard.png"
import mouse from "../../images/Mouse.png"
import kingston from "../../images/Kingston.jpg"
import axios from 'axios'
import { useLoaderData } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../../App"

const ProductList = props => {
    const [productItems, setProductItems] = useState([])
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const [current, setCurrent] = useState(1)
    const [loadMore, setLoadMore] = useState(false)
    const { hasMore, setHasMore } = useContext(ShopContext)


    const handleLoadMore = () => {
        setLoadMore(true)
        setCurrent(current + 1)
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/list?page=${current}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("access")}}).then(
            res => {
                let data = res.data
                setProductItems([...productItems, ...data.results])
                setNext(data.next)
                setPrev(data.previous)
                if (data.next === null) {
                    setHasMore(false)
                } else {
                    setHasMore(true)
                }
            }
        ).catch(e => {
            alert(e['message'])
        })
    }, [current])
    return(
        <>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        { productItems.map(item => (
            <ProductItem withDiscount = {Math.random() > 0.5} item = {item} key = {item.id}/>
        ))}
        
        </div>
        <div className="flex justify-center mt-2">
            {next && 
            <div className="block">
                <button className="border-gray-200 border px-3 py-1 text-white bg-blue-500 rounded-xl" onClick={ handleLoadMore }>Load More</button>
            </div>
            }
        </div>
        </>
    )
}

export default ProductList

