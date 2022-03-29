//npm i react-copy-to-clipboard

import "./style.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { CodeBlock, dracula } from "react-code-blocks"; //https://www.npmjs.com/package/@matheus_ferreira/react-code-blocks
import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";
export default function FullExerciseView(props) {

  const [solution, setSolution] = useState(false);
  const [sources, setSources] = useState(false);
  const [copySol, setCopySol] = useState(false);
  const context = useContext(UserContext)
  const navigate=useNavigate();
  const location =useLocation();
  const [langName,setLangName]=useState('')
  const showLineNumbers = true;

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

  useEffect(getlangNameById,[])
  



 const getPathName=(() => {
  console.log(location.pathname);
  return location.pathname;
 })

 function getlangNameById() {
const idLang=props.exersiceDetails.prog_lang;
  console.log(idLang);
  axios
    .get(`http://localhost:5000/language/${idLang}`)
    .then((res) => {
    console.log(res.data[0].langName);
  setLangName(res.data[0].langName)})
  console.log(langName);
}

function showSol()
{
  if(context.userLogin)
  setSolution(!solution);
  else{
    navigate('/userpage', { state: {nextPage:"-1"} });
  }
}

 
  return props.exersiceDetails ? (
    <div className={`mainDiv itemColor ${getPathName().toString().startsWith('/exercise')?'marginClass':''}  `}>
       <div className="titleClass">
        <div className="imgClass">
          <img src={`${props.exersiceDetails.icon}`} alt="exercise_icon" />
        </div>
        <div>
          <h2>{props.exersiceDetails.title}</h2>
          <div className="tagsDiv" >
        {props.exersiceDetails.tags.map((t) => (
          <span style={{backgroundColor:colorArrTags[t]}} className={`tags`} key={t}>{t}</span>
        )).reduce((accu, elem) => {
          return accu === null ? [elem] : [...accu, '', elem]
      }, null)}
      </div>
          
        </div>
        <div className={`diffClass ${props.exersiceDetails.difficulty}`}>
          </div>
      </div>
      <div className="exClass">
     
    
      <div >
        <p className={`${!props.exersiceDetails.details?'hideClass':''}`}>{props.exersiceDetails.details}</p>
      </div>
      <div className={`content  ${!props.exersiceDetails.content.content?'hideClass':''}`}>
        <p >{props.exersiceDetails.content.content}</p>
        <CodeBlock
          text={props.exersiceDetails.content.code}
          language={langName}
          showLineNumbers={showLineNumbers}
          className={`${!props.exersiceDetails.content.code?'hideClass':''}`}

        />
      </div>
      </div>
    
       
        <div className="hint" onClick={() => setSources(!sources)}>
           {sources? <i class="fa fa-chevron-right"><span> Hide hint</span></i> : <i className="fa fa-chevron-down" ><span>Show hint</span></i>}
           <hr className="hrClass"/>
           <ul className={` ${sources ? "open" : "close"}-Class`}>
          {props.exersiceDetails.content.sources.map(item=><li key={item.url} className="sourcesClass"><div>{item.name}</div> <div>{item.url}</div></li>)}
        </ul>
        </div>
       
        <div >
        <button className="solButton"  onClick={showSol}>
          solution
        </button>
       
        </div>
        <div className={`solutionClass ${solution ? "open" : "close"}-Class ${!props.exersiceDetails.solution?'hideClass':''}`}>
          <div >
          <CodeBlock
            text={props.exersiceDetails.solution}
            language={langName}
            showLineNumbers={showLineNumbers}
            theme={dracula}
            
          />
          </div>
         <div>
         <i class="fa fa-clipboard" aria-hidden="true"  onClick={()=>{setCopySol(!copySol);navigator.clipboard.writeText(`${props.exersiceDetails.solution}`) }}/>
              <div className="copy" >{copySol?'Copied!':''}</div>  
         </div>
          
        </div>
        </div>

  ) : (
    <div>loding</div>
  );
  
}
