import React, {useRef} from "react";
import getData from "./App";

const ReviewForm = ({submit, name, date, actors, image, rating}) => {

    
    return(
        <form  method="post" action="/submit_review" encType="multipart/form-data">
            <input ref={name} type="text" name="movie_name"/>
            <input ref={date} type="date" name="date"/>
            <input ref={actors} type="text" name="actors" placeholder="Actors"/>
            <input ref={rating} type="text" name="rating" placeholder="Rating"/>

            <input  ref={image} type="file" name="movie_poster" />
            
            <button type="submit" onSubmit={submit}>Add Review</button>
        </form>
    )

}

export default ReviewForm;