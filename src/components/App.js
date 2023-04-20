import React from "react"
import ReactDOM from "react-dom/client"


// Importing the sub-componenets
import Header from "./Header"
import MainContent from "./MainContent"
import Footer from "./Footer"




const AppLayout = () => {
    return(
        <>
            <Header />
            <MainContent />
            <Footer />
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<AppLayout/>)