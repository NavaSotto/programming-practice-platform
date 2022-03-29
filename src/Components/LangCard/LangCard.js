//npm i programming-languages-logos
//https://www.npmjs.com/package/programming-languages-logos?activeTab=readme
//https://languages.abranhe.com/
//in public -index.html-<link href="https://languages.abranhe.com/logos.css" rel="stylesheet">
import React from "react";
import "./style.css";



export default function LangCard(props) {
 
  return (
    <button
      className="langCardClass itemColor"
      onClick={(e) => props.setExercisesLangFunc(props.langObj._id)}
    >
      <div className="iconClass">
        <img src={`${props.langObj.icon}`} alt="lang_icon" />
      </div>
      <div className="langNameClass">
        <h2>{props.langObj.langName}</h2>
      </div>
    </button>
  );
}
