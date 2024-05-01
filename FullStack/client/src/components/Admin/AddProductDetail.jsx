import { useState } from "react"
import NoPreview from "../../images/NoPreview.png"


const AddProductDetail = (props) => {
    const r = Math.random()
    const [imageIcon, setImageIcon] = useState(null)
    const [item, setItem ] = useState(props.item)

    const handleUpload = e => {
        setImageIcon(URL.createObjectURL(e.target.files[0]))

        let formData = new FormData()

        formData.append("image", e.target.files[0])
        fetch("http://localhost:8000/api/product/update/" + item.id, {
            method: "PUT",
            headers: {"Authorization": "Bearer " + localStorage.getItem("access"),
        },
        body: formData
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            data['image'] = `http://localhost:8000/${data["image"]}`
            setItem(data)
        })
    }
    return(
        <>
        <tr className="border border-slate-300 " key = {item.id}>
            <td className="border border-slate-300">
                <div className="p-3 w-32">
                    <div className="flex justify-center align-middle py-2">
                        <label htmlFor={item.id}>
                        <img src={item.image === "http://localhost:8000/media/no_preview.png" ? NoPreview : item.image} alt="" width="70" className="object-cover cursor-pointer"/>
                        </label>
                        <input type="file" className="hidden" id={item.id} onChange={ handleUpload }/>
                    </div>
                </div>
                
            </td>
            <td className="border border-slate-300">
                <div className="py-2">
                    <span className="excerpt">
                    {item.name}
                    </span>
                </div>
            </td>
            <td className="border border-slate-300">
                <div className="py-2">
                <span>{item.plu}</span>
                </div>
            </td>
            <td className="border border-slate-300">
                <div className="py-2">
                <span className="excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur assumenda, delectus consectetur molestiae eius suscipit recusandae possimus sed animi autem quo maxime nisi totam incidunt. Quidem tenetur nulla quae dolores?</span>
                </div>
            </td>
            <td className="border border-slate-300">
                <div className="py-2">
                ₱ {item.price.toFixed(2)}
                </div>
            </td>
            <td className="border border-slate-300">
                <div className="py-2">
                    <span>{item.quantity}</span>
                </div>
            </td>
        </tr>
        </>
    )
}

export default AddProductDetail