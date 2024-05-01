import CategoryItem from "./CategoryItem"
import computerCase from "../images/ComputerCase.png"
import motherboard from "../images/Motherboard.png"
import ram from "../images/RAM.png"
import gpu from "../images/VideoCard.png"
import ssd from "../images/SSD.png"
import monitor from "../images/Monitor.png"
import kingston from "../images/Kingston.jpg"
import keyboard from "../images/Keyboard.png"
import mouse from "../images/Mouse.png"
import axios from 'axios'
import { useEffect, useState } from "react"
const CategoryList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/category/list", {headers: {"Authorization": "Bearer " + localStorage.getItem("access")}}).then(
            res => {
                setData(res.data.results )
            }
        )
    }, [])

    return(
        <>
        <div className="flex items-center mt-2">
            
        
            <CategoryItem name = "Motherboard" image={motherboard}/>
            <CategoryItem name = "Computer Case" image = {computerCase}/>
            <CategoryItem name = "RAM" image = {kingston}/>
            <CategoryItem name = "SSD" image = {ssd}/>
            <CategoryItem name = "Video Card" image={gpu}/>
            <CategoryItem name = "Monitor" image={monitor}/>
            <CategoryItem name = "Keyboard" image={keyboard}/>
            <CategoryItem name = "Mouse" image={mouse}/>
            {data.map(item => (
        
        <CategoryItem name = {item.name} image={`http://localhost:8000/${item.thumbnail}`} key = {item.id }/>
        ))}
        </div>
        </>
    )
}

export default CategoryList