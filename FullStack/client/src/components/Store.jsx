import MainContent from "./MainContent"
import OrderedContent from "./OrderedContent"
import SideNav from "./SideNav"

const Store = () => {
    return(
        <>
        <div className="flex">
            <SideNav />
            <MainContent />
            <OrderedContent />
        </div>
        </>
    )
}

export default Store