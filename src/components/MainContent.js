import { useEffect, useState } from "react";

// Importing the sub-components
import RestaurantCard from "./RestaurantCard.js"
// Doubt: In the above import if we don't add .js extension then we'll get error. Why?

const MainContent = () => {
    const [allRestaurants, setAllRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [searchText, setSearchTeaxt] = useState("")

    useEffect(() => {
        getRestaurantDeatils()
    }, [])

    const getRestaurantDeatils = async () => {
        const responseObj1 = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0098636&lng=77.6224672&page_type=DESKTOP_WEB_LISTING")
        const responseObj2 = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0098636&lng=77.6224672&offset=31&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING")
        const responseObj3 = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0098636&lng=77.6224672&offset=47&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING")
        // const jsonData1 = await responseObj1.json()
        const jsonData2 = await responseObj2.json()
        const jsonData3 = await responseObj3.json()
        // console.log(jsonData1.data)
        console.log(jsonData2.data)
        const fetchedData2 = jsonData2.data
        const fetchedData3 = jsonData3.data
        const processedFetchedData2 = fetchedData2?.cards.map(card => card?.data)
        const processedFetchedData3 = fetchedData3?.cards.map(card => card?.data)
        console.log(processedFetchedData2)
        // setRestaurants(fetchedData1?.cards[2]?.data?.data?.cards.concat(processedFetchedData2))
        setAllRestaurants([...processedFetchedData2, ...processedFetchedData3])
        setFilteredRestaurants([...processedFetchedData2, ...processedFetchedData3])
        
    }

    const searchRestaurant = () => {
        setFilteredRestaurants(allRestaurants.filter( (restaurant) => {
            return restaurant?.data?.name.toLowerCase().includes(searchText.toLowerCase())
        } ))
    }

    // During the initial render, restaurants - state variable will be empty
    // So we need to early return some Shimmer or null to handlwe the above situation
    if(allRestaurants.length === 0) return null
    // This is also called as "Early Return"
    // Don't put the above condition on "filteredRestaurants", bcz otherwise MainContent will perform Early
    // Return even when we search some restaurant and it's not there in the allRestaurants - list and as s result
    // filterRestaurants - will be an empty array.
    // We'll do Early Return only when initially we don't have any restaurant data in allRestaurant - list

    return(
        <div className="px-24 py-12">
            {/* Search option */}
            <div className="mx-4 mb-8 p-2">
                <input 
                    type="text" 
                    placeholder="Search restaurants" 
                    className="px-2 py-1 mr-2 focus:border-stone-700"
                    value={searchText}
                    onChange={(e) => {
                        // console.log(e.target.value)
                        // console.log(searchText)
                        // Notice the value of searchText is different from e.target.value
                        // This is bcz state setter function will set the new value to the state variable only
                        // during the next render, until the next render happens the state variable will show it's 
                        // previous value only
                        setSearchTeaxt(e.target.value)
                    }}
                />
                <button 
                    className="px-8 py-1 bg-slate-800 text-white"
                    onClick={searchRestaurant}
                >
                    Search
                </button>
            </div>
            {/* Restaurant Cards */}
            {
                (filteredRestaurants.length !== 0)?(
                    <div className="flex flex-wrap justify-between">
                        {
                            filteredRestaurants.map(restaurant => {
                                return(
                                    <RestaurantCard key={restaurant?.data?.id} {...restaurant?.data} />
                                )
                            })
                        }
                    </div>
                ):(
                    <h1>No Restaurant found</h1>
                )

            }
        </div>
    )
}

export default MainContent;