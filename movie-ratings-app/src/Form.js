import React, {useRef} from "react";
import getData from "./App";

const ReviewForm = ({submit, name, date, actors, image, rating}) => {

    
    return(
        <form onSubmit={submit}>
            <input ref={name} type="text" placeholder="movie name"/>
            <input ref={date} type="date" />
            <input ref={actors} type="text" placeholder="Actors"/>
            <select>
                {/* <option  ref={image} type="text" value="https://upload.wikimedia.org/wikipedia/commons/8/86/Movie_poster_EN_prix_low.jpg">Placeholder</option> */}
                <option  ref={image} type="text" value="./assets/placeholder.jpg">Placeholder</option>
            </select>
            {/* <input ref={image} type="text" placeholder="Image link"/> */}
            <input ref={rating} type="text" placeholder="Rating"/>
            <button>Add Review</button>
        </form>
    )

}

export default ReviewForm;