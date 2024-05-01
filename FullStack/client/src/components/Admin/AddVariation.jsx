import { useState } from "react"

const AddVariation = () => {
    const [isAddVariation, setIsAddVariation] = useState(false)
    return(
        <>
        <div>
        {!isAddVariation &&
        <button onClick = {() => setIsAddVariation(true) } className="hover:bg-gray-300 px-3 py-1 border-gray-400 border shadow rounded-lg">Add Variation</button>
        }
        {isAddVariation && 
        <>
        <label htmlFor="name">Name</label> <input type="text" id="name" />

        <div>
        <label>Options</label>
        <input type="text" id="option_1" />
        <input type="text" id="option_2" />
        <input type="text" id="option_3" />
        </div>
        </>
        }

    </div>
    </>
    )
}

export default AddVariation