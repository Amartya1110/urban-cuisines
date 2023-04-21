import { useEffect, useState } from "react";

// Importing the sub-components
import RestaurantCard from "./RestaurantCard.js"
// Doubt: In the above import if we don't add .js extension then we'll get error. Why?

const MainContent = () => {
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        getRestaurantDeatils()
    }, [])

    const getRestaurantDeatils = async () => {
        const responseObj1 = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0098636&lng=77.6224672&page_type=DESKTOP_WEB_LISTING")
        const responseObj2 = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0098636&lng=77.6224672&offset=35&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING")
        // const jsonData1 = await responseObj1.json()
        const jsonData2 = await responseObj2.json()
        // console.log(jsonData1.data)
        console.log(jsonData2.data)
        const fetchedData2 = jsonData2.data
        const processedFetchedData2 = fetchedData2?.cards.map(card => card?.data)
        console.log(processedFetchedData2)
        // setRestaurants(fetchedData1?.cards[2]?.data?.data?.cards.concat(processedFetchedData2))
        setRestaurants(processedFetchedData2)
    }

    // During the initial render, restaurants - state variable will be empty
    // So we need to early return some Shimmer or null to handlwe the above situation
    if(restaurants.length === 0) return null
    // This is also called as "Early Return"

    return(
        <div className="p-24 flex flex-wrap justify-between">
            {
                restaurants.map(restaurant => {
                    return(
                        <RestaurantCard key={restaurant?.data?.id} {...restaurant?.data} />
                    )
                })
            }
        </div>
    )
}

export default MainContent;