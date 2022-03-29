import "./style.css";
import React from "react";
import { Link } from "react-router-dom";


export default function ExerciseCard(props) {
  const { title, details, exec_type, difficulty, icon, _id } = props.exObj;
  const linkPath =props.userType === "user" ? `/exercise/${_id}` : `/admin/exercise/${_id}`;

  const colorArrTags={
    'Algorithms':'#FF0000',
    'Sort and search':'#0000CD',
    'data structures':'#006400',
    'Functional':'hsl(314deg 85% 66%)',
    'Functions':'hsl(314deg 85% 66%)',
    'Arrays':'#9932CC',
    'Loops':'#8B008B',
    'Object-oriented':'#FFA500',

  }
  return (
    <div >

      <li className="cards_item itemColor">
      { props.userType === "admin"? <button className="xBtn"  onClick={() => props.removeExercise(_id)}>X</button>:''}
      <Link to={linkPath} >

        <div className="card">
        <div className="iconClass">
          <img src={`${icon}`} alt="exercise_icon" />
        </div>

        <div className="informationClass">
          <div className="titleClass">{title}</div>
          <div className="detailsClass">{details}</div>
        </div>
        <div className="info1">
      <div className={`${difficulty} difficultyClass`}></div>
      <div className="execTypeClass">{exec_type}</div>
      </div>
     

      </div>
      <div className="info2"  >
        {props.exObj.tags.map((t) => (
          <span style={{backgroundColor:colorArrTags[t]}} className={`tagsClass`} key={t}>{t}</span>
        )).reduce((accu, elem) => {
          return accu === null ? [elem] : [...accu, '', elem]
      }, null)}
      </div>
      
     
     
      </Link>

        </li>
        
    
     
    </div>
    
  );
}
