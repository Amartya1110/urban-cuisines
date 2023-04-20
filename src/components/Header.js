import logo from "../assets/images/logo.png"
import cartlogo from "../assets/images/cart.png"



const Header = () => {
    return(
        <div className="flex justify-between items-center bg-slate-800 px-12 py-4 shadow-2xl">
            <div className="logo-section">
                <img src={logo} alt="logo" className="h-14" />
            </div>

            <nav>
                <ul className="flex">
                    <li className="m-2">Home</li>
                    <li className="m-2">About</li>
                    <li className="m-2">Contact Us</li>
                </ul>
            </nav>

            <div>
                <img src={cartlogo} alt="Cart" className="h-14`" />
            </div>
        </div>
    )
}

export default Header