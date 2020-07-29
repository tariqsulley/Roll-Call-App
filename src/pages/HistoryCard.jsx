import React from 'react';
const HistoryCard = ({name,present_num,absent_num,present_studs,absent_studs})=>{
    return(
        <div className="EditCard">
            <div className="EditBox">
            <h1> {name} </h1>
            <h2> {present_num}</h2>
            <h2> {absent_num} </h2>
            <p> {present_studs} </p>
            <p> {absent_studs} </p>
            </div>
        </div>
    )
}

export default HistoryCard;