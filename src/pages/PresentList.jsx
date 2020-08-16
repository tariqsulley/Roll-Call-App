import React from 'react';
//import './PresentListStyles.css'

const PresentList = ({name,times})=>{
    return(
        <div className="EditCard">
            <div className="EditBox">
            <p iD ="Names"> {name} </p>
            <p iD = "Class"> {times} </p>
            </div>
        </div>
    )
}

export default PresentList;
