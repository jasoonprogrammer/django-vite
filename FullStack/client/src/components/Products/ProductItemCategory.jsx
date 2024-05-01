import { useParams } from "react-router-dom"

const ProductItemCategory = () => {
    const { category } = useParams()
    console.log(category)
    return(
        <>
        <div>
            {category}
        </div>
        </>
    )
}

export default ProductItemCategory