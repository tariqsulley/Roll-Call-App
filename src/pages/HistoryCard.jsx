import React from 'react';
import './HistoryCard Styles.css'
const HistoryCard = ({name,Class})=>{
    return(
        <div className="EditCard">
            <div className="EditBox">
            <p iD ="Names"> {name} </p>
            <p iD = "Class"> {Class} </p>
            </div>
        </div>
    )
}

export default HistoryCard;
