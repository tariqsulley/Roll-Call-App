import React from 'react';
import './EditCardStyles.css';
const EditCard = ({img})=>{
    return(
        <div className="EditCard">
            <div className="EditBox">
            <img src = {img} className= "EditCardImg"/>
            </div>
        </div>
    )
}

export default EditCard;