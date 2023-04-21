const RestaurantCard = ({id, cloudinaryImageId, name, locality, area, cuisines, avgRating, minDeliveryTime, costForTwoString}) => {
    return(
        <div key={id} className="p-2 m-4 max-w-[18em] hover:shadow-lg hover:shadow-gray-600" >
            <img 
                src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" + cloudinaryImageId} 
                className="w-full mx-auto"
            />
            <h1>{name}</h1>
            <h3>{locality}, {area}</h3>
            <h3>{cuisines.join(", ")}</h3>
            <ul className="flex justify-between">
                <li>{avgRating} stars</li>
                <li>{minDeliveryTime} mins</li>
                <li>{costForTwoString}</li>
            </ul>
        </div>
    )
}

export default RestaurantCard