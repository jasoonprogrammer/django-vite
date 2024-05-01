import { useState } from "react"
import cornetto from "../../images/cornetto.png"
import propTypes from 'prop-types'


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

import { AnimatePresence, motion } from "framer-motion"
const ProductItem = (props) => {
    const item = props.item
    const withDiscount = props.withDiscount
    const [isSale, setIsSale] = useState(withDiscount)
    const [isAd, setIsAd] = useState(props.isAd ? true : false)
    return(<>
    <AnimatePresence>
        <motion.div initial="hidden" animate="visible" exit="exit" variants={itemVariants}>
            <div className="border border-gray-200 rounded-lg flex justify-center flex-col p-3 shadow cursor-pointer hover:bg-gray-200">
                <div className="flex justify-center h-[70px] relative">
                    <img src={item.image} alt="" className="object-contain"/>
                    {isSale && 
                    <span className="absolute bg-green-700 text-white top-3 right-[-5px] text-xs transform rotate-[40deg] px-5 text-center whitespace-nowrap">Sale!</span>
                    }
                    {isAd && 
                    <span className="absolute bg-green-700 text-white top-3 right-[-5px] text-xs px-5 text-center whitespace-nowrap">Ad</span>
                    }

                </div>
                <span className="text excerpt font-semibold" title={item.name}>{item.name}</span>
                <div className="flex items-bottom mt-2">
                    {isSale ? 
                    <>
                    <span className="text-green-700 font-semibold">₱{item.price - Math.floor(item.price * Math.random() * 0.3)}</span>
                    <span className="text-xs line-through ps-2">₱{item.price}</span>
                    </>
                    :
                    <span className="font-semibold">₱{ item.price }</span>

                }
                </div>
                {item.quantity > 0 ?
                <small className="mt-2 text-xs font-light"><span className="">In stock: {item.quantity}</span></small>
                :
                <small className="mt-2 text-xs text-red-500">Out of stock</small>
                }
            </div>
        </motion.div>
    </AnimatePresence>
    </>)
}

export default ProductItem

ProductItem.propTypes = {

}
