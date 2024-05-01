import LogoIcon from "../images/JasonLogo.png"
import { jwtDecode } from 'jwt-decode'
const SearchBar = () => {
    const user = jwtDecode(localStorage.getItem('access'))
    console.log(user)
    return(
        <div className="md:flex bg-green-500 items-center justify-between px-5 md:h-16">
            {/* Ici */}
            <img src={LogoIcon} className="h-16 inline-block md:block"/>

            <div className="inline-flex md:flex sm:w-full bg-white md:w-2/5 border-gray-400 border-1 rounded-lg px-2 py-1">
                <input type="text" placeholder="Search Products" className="w-full searchbar"/>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                </div>
            </div>

            <div className="items-center hidden md:flex">
                <div className="me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </div>
                <span className="text-white font-semibold text-xl me-2">{user.full_name}</span>
                <img src={user.image_path} alt="profile" className="h-10 rounded-full border-white border-2"/>
            </div>
        </div>
    )
}

export default SearchBar