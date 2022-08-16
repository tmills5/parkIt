import React from "react";
import {Link} from "react-router-dom";




function ParkCard( { park, user, onDeletePark, onUpdatePark } ) {
    const { id, full_name, state, description, image} = park



    return(
        <div className="box">
            <article className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={image} alt=""/>
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <p>
                            {full_name} / <small>{state}</small>
                    <br/>
                            {/* {description} */}
                        </p>
                        <Link to={`/parks/${park.id}`}  state={{park}} >Click for more details..</Link>
                    </div>
                    <div>{user.is_admin ? 
                        <>
                        <button onClick={()=>onDeletePark(id)}>delete</button>
                        </>
                        : 
                        ''}
                    </div>
                </div>
            </article>
        </div>
    );
}

export default ParkCard;