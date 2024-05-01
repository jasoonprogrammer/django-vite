import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
const CategoryItem = (props) => {
    const { name, image } = props
    return(
        <>
        <NavLink to={name}>
        <div className="border flex border-gray-300 items-center gap-1 px-3 py-1 rounded-xl me-2 cursor-pointer hover:bg-gray-200">
            <div className="h-[30px] w-[30px] flex">
                <img src={ image } alt="" className="object-contain"/>
            </div>
            <span className="whitespace-nowrap">{ name }</span>

        </div>
        </NavLink>
        </>
        
    )
}

export default CategoryItem

CategoryItem.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}