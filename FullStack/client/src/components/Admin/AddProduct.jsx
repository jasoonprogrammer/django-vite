import SideNav from "../SideNav"
import { FormLabel } from "react-bootstrap"
import AddVariation from "./AddVariation"
import NoPreview from "../../images/NoPreview.png"
import { useEffect, useState } from "react"
import AddProductDetail from "./AddProductDetail"
import axios from "axios"

const AddProduct = () => {
    const [itemId, setItemId] = useState("id")
    const [imageIcon, setImageIcon] = useState(NoPreview)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/list`, { headers: {"Authorization": "Bearer " + localStorage.getItem("access")}}).then(
            res => {
                let data = res.data
                setData(res.data.results)
            }
        ).catch(e => {
            alert(e['message'])
        })
    }, [])



    
    return(
        <>
        {isLoading ? <p>Loading...</p> : 
        <div className="w-[70vw] overflow-y-scroll h-[88.5vh]">
            <div>
                <div className="flex w-full">
                    <div className="w-[70%] mx-auto">
                        <table className="border-collapse border border-slate-400 w-full text-center">
                            <thead>
                                <tr className="font-semibold">
                                    <th className="font-semibold w-[10%]">Image</th>
                                    <th className="font-semibold w-1/5">Name</th>
                                    <th className="font-semibold w-[10%]">PLU</th>
                                    <th className="font-semibold w-[30%]">Description</th>
                                    <th className="font-semibold w-[15%]">Price</th>
                                    <th className="font-semibold w-[15%]">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => (
                                    <AddProductDetail item = {item} />
                                ))}
                                

                                
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
        }</>
    )
}

export default AddProduct