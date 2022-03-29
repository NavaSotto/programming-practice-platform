import "./style.css";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import { AiFillEye } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import FullExerciseView from '../../Components/FullExerciseView/FullExerciseView'


export default function AdminExercise() {

   const context = useContext(UserContext)
   const [editStatus, setEditStatus] = useState('edit');
   const [plusSourceClick,setPlusSorceClick]=useState(false);
   const [exerciseType, setExerciseType] = useState([]);
   const [programmingLanguages, setProgrammingLanguages] = useState([]);
   const { id } = useParams();
   const navigate  = useNavigate();
  const [icon, setIcon] = useState('file');
  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    details: "",
    status: "",
    exec_type: "",
    difficulty: "",
    tags: [],
    content: { content: "", code: "", sources: [] },
    solution: "",
    prog_lang: "",
    dev_time: "",
    // creator_id:"",
    // create_date:""
  });
 

  useEffect(()=>{setExerciseType(id?'edit':'new')},[]);
  useEffect(()=>{getProgrammingLanguages()},[])
  useEffect(getExersiceDetails, [id]);
  useEffect(addSourceTemplate, [plusSourceClick]);


  function getExersiceDetails() {
    if(id)
    {
axios.get(`http://localhost:5000/exercises/${id}`).then((res) => {
  setFormData(res.data.exercise[0]);
});}
}
function getProgrammingLanguages()
{
  axios.get("http://localhost:5000/language").then((res) => {
    setProgrammingLanguages(res.data);
  });
     
}

  function handleSubmit(e) {
 removeEmptySource();

   e.preventDefault();
    const form = e.target;
    console.log(formData);
    if(exerciseType=='new')
    {
      axios
      .post(`http://localhost:5000/exercise`,formData,{headers: { "Authorization": context.token } })
      .then((res) => {
        console.log(res.data);
     
      }).catch((err) => console.log(err))
    }
    else{
      axios
      .put(`http://localhost:5000/exercise/edit/${id}`,formData,{headers: { "Authorization": context.token } })
      .then((res) => {
        console.log(res.data);
      }).catch((err) => console.log(err))
    }
    navigate(-1);
   
  }

  async function addSourceTemplate()
  {
    if(plusSourceClick)
    {
      setPlusSorceClick(false);
       let prevState={...formData};
       prevState.content.sources= [...prevState.content.sources, {url: "", name: " "}];
       setFormData(prevState)

    }
  
  }
  async function removeSource(e)
  {
    let prevState={...formData};
    prevState.content.sources.splice(e.target.id,1);
    setFormData(prevState)

  }
   function removeEmptySource()
  {
    let prevState={...formData};
    prevState.content.sources=prevState.content.sources.filter(src => (src.name!=' '))

    setFormData(prevState)
console.log(prevState.content.sources);
  }




 

  async function handleChangeFieldes(e,id){
    e.preventDefault()
    const newState = { ...formData };
    let field = e.target.name;
    let val = e.target.value;
    let index=e.target
    switch (field) {
      case "content":
        newState.content.content = e.target.value;

        break;
        case "content.code":
          newState.content.code = e.target.value;
  
          break;
      case "tags":
        newState.tags = e.target.value.split(",");

        break;
      case "prog_lang":
        {
          let idLang = e.target.value;
          console.log(idLang);
          await axios
            .get(`http://localhost:5000/language/${idLang}`)
            .then((res) => {
              newState[field] = res.data[0]._id;
            });
        }
        break;
      case "sources.url": {
      
        newState.content.sources[id].url = val;
      
        break;
      }
      case "sources.name": {
       

        newState.content.sources[id].name = val;
      
        break;
      }
      case "iconFile":
        newState["icon"] = URL.createObjectURL(e.target.files[0]);
        break;
      default:
        newState[field] = val;
        break;
    }
    setFormData(newState);
    
  }


  






  return (
    
    
 
    <div className="exersiceDetailsClass itemColor">
      <div className="flexContainer">
<div className="icons">
<AiFillEye className="flex2" onClick={()=>setEditStatus('view')} />
<AiFillEdit className="flex3"  onClick={()=>setEditStatus('edit')} />
</div>

</div>

{editStatus=='edit'?
<div>
<h2 className="title">edit exercise</h2>

<form onSubmit={handleSubmit}>
   {/*================================ */}
   <div className="filed ">
   <label>status</label><br></br>
          <select className="inputForm"
            name="status"
            value={formData.status}
            onChange={handleChangeFieldes}
          >
            {exerciseType=='new'? <option selected  value="select..."> select...</option>:''}
            <option defaultValue="draft" value="draft">
              draft
            </option>
            <option value="publish">publish</option>
            <option value="deleted">deleted</option>
          </select>
        </div>

<div className="flexContainer ">
  <div className="filed">

  <div className="colum">
  
  <img alt="uploadImage" src={formData.icon} />
  
  <div >
            <input type="radio" value="file" name="icon" /*checked */ onChange={(e)=>setIcon(e.target.value)} />
            file
            <input type="radio" value="url" name="icon" onChange={(e)=>setIcon(e.target.value)} />
            url
          </div>
  </div>
  
  <div className="flexContainer">
              
  
          <div  className={icon=="url"?'open':'close'}>
          <label>icon source</label><br></br>
            <input 
              name="icon"
              value={formData.icon}
              onChange={handleChangeFieldes}
            ></input>
          </div>
          
  
          <div  className={icon=="file"?'open':'close'}>
            <input 
              type="file"
              onChange={handleChangeFieldes}
              id="upload"
              accept="image/*"
              name="iconFile"
  
            />
            <label htmlFor="upload">
             
            </label>
           
          </div>
  </div>



        </div>


       

      
       {/*================================ */}
       <div className="colum">
       <div className="filed">
       <label>title</label><br></br>       
          <input className="inputForm"
            name="title"
            value={formData.title}
            onChange={handleChangeFieldes}
          ></input>
          </div>


      

        <div className="filed">
        <label> programming Language</label><br></br>
         
          <select
          className="inputForm"
            name="prog_lang"
            // value={getlangNameById(formData.prog_lang)}
            onChange={handleChangeFieldes}
            // defaultValue={getlangNameById(formData.prog_lang)}
          >
                        {exerciseType=='new'? <option selected  value="select..."> select...</option>:''}

            {programmingLanguages.map((l) => {
              let r;
              if (l._id == formData.prog_lang)
                r = (
                  <option
                    selected={l.langName}
                    key={l.langName}
                  >
                    {l.langName}
                  </option>
                );
              else r = <option key={l.langName}>{l.langName}
              </option>;
              return r;
            })}
          </select>
        </div>
       </div>
       </div>
       <div  className="filed">
       <label> tags(The tags must be separated by commas)</label><br></br>

         
          <input className="inputForm"
            name="tags"
            value={formData.tags}
            onChange={handleChangeFieldes}
          ></input>
        </div>
        <div className="flexContainer stretch">
        <div className="filed">
        <label> exec_type</label><br></br>

         
          <select className="inputForm"
            name="exec_type"
            value={formData.exec_type}
            onChange={handleChangeFieldes}
          >
                        {exerciseType=='new'? <option selected  value="select..."> select...</option>:''}

            <option defaultValue="short" value="short">
              short
            </option>
            <option value="rolling">rolling</option>
            <option value="tutorial">tutorial</option>
          </select>
        </div>
       
        <div className="filed">
        <label>development time</label><br></br>

          <input className="inputForm"
            name="dev_time"
            value={formData.dev_time}
            onChange={handleChangeFieldes}
          ></input>
        </div>

        


       
        <div className="filed">
        <label>difficulty</label><br></br>

          
          <select className="inputForm"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChangeFieldes}
          >
                        {exerciseType=='new'? <option selected  value="select..."> select...</option>:''}

            <option defaultValue="easy" value="easy">
              easy
            </option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>

       

        </div>


        <div className="filed">
        <label>details</label><br></br>

          
          <textarea 
            value={formData.details}
            name="details"
            onChange={handleChangeFieldes}
            className="details inputForm"
          ></textarea>
        </div>

        <div  className="filed">
        <label>content</label><br></br>

          
          <textarea  className="inputForm"
            name="content"
            value={formData.content.content}
            onChange={handleChangeFieldes}
          ></textarea>
        </div>
        <div  className="filed">
        <label>code</label><br></br>
          <textarea
          className="inputForm"
            name="content.code"
            value={formData.content.code}
            onChange={handleChangeFieldes}
          ></textarea>
        </div>

       
        <div className="filed">
        <label>sources</label><br></br>

        
          {formData.content.sources.map((s,i) => <li required  key={i} ><div  className="sources flexContainer">
          <button className="btn minus" id={i} onClick={removeSource}>X</button>

              <div>
              <label>name</label><br></br>
                <input className="inputForm"
                  key={i}
                  name="sources.name"
                  onChange={(e)=>handleChangeFieldes(e,i)}
                  // onChange={(e) =>changeHandler(i)(e)}

                  value={s.name}
                ></input>
              </div>

              <div>
              <label>url</label><br></br>
                <input className="inputForm"
                  key={i}
                  name="sources.url"
                  onChange={(e)=>handleChangeFieldes(e,i)}
                  // onChange={(e) =>changeHandler(i)(e)}
                  value={s.url}
                ></input>
              </div>
            </div></li>)}
         
            <button type="button" className="btn plus"  data-type="minus" onClick={()=>setPlusSorceClick(true)}>+</button>

        </div>

        
        <div className="filed">
          <label>solution</label><br></br>
          
          <textarea 
            name="solution"
            value={formData.solution}
            onChange={handleChangeFieldes}
          ></textarea>
        </div>

        <button onClick={removeEmptySource}  className="update-btn" type="submit">update</button>
      </form></div>:

      <FullExerciseView exersiceDetails={formData} openView={true}/>}
    </div>
  );}