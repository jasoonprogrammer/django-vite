import { useEffect, useState } from "react"
import OrderActions from "./OrderActions"
import ProductItem from "./Products/ProductItem"
import axios from "axios"
import {motion, AnimatePresence} from 'framer-motion'

const itemVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            type: "tween",
            duration: 1
        }
    },
    exit: {
        opacity: 0,
        transition: {
            type: "tween",
            duration: 1
        }
    }
}

const FeaturedItems = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [render, setRender] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/feature/list?page=${page}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("access")}}).then(res => {
            const items = res.data.results
            const updateCount = async (pk) => {
                axios.get(`http://localhost:8000/api/product/feature/count/update/${pk}`, { headers: {"Authorization": "Bearer " + localStorage.getItem('access')}}).then(res => {
                    console.log(res)
                })
            }
            setData(items)
            setTimeout(() => {
                if (res.data.next) {
                    setPage(page + 1)
                } else {
                    setPage(1)
                }
                items.forEach(element => {
                    updateCount(element.id)
                })
                setRender(!render)

            }, 2000)
        }).catch(err => {
            if (err.response.status === 404) {
                setPage(1)
                setRender(!render)
            }
        })
       
    }, [render])
    return(
        <>
        <div className="w-[20vw]">
            <div className="w-full">
                <div className="justify-center font-semibold text-2xl flex my-2">
                    <span>Featured Items</span>
                </div>
            </div>
            <div className="overflow-y-scroll no-scrollbar h-[80.5vh] border shadow p-2">
                {data.length > 0 ? data.map(item => (
                    <div key = {item.id} className="py-1">
                        <ProductItem item = {item} withDiscount = {false}/>
                    </div>
                )) : 
                <div className="flex w-full h-full">
                    <div className="mx-auto my-auto">
                        <span className="text-2xl">No ads to display.</span>
                    </div>
                </div>
                }
            </div>
            <div></div>
        </div>
        </>
    )
}

export default FeaturedItems