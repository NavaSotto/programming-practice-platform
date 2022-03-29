//npm i react-copy-to-clipboard

import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import FullExerciseView from "../../Components/FullExerciseView/FullExerciseView";


export default function Exercise() {
  const [exersiceDetails, setExersiceDetails] = useState();



  const params = useParams();

  useEffect(getExersiceDetails, []);

  async function getExersiceDetails() {
    await axios.get(`http://localhost:5000/exercises/${params.id}`).then((res) => {
      setExersiceDetails(res.data.exercise[0]);
    });
  }
  async function getlangName() {
    await axios
      .get(`http://localhost:5000/language/${exersiceDetails.prog_lang}`)
      .then((res) => {
        let result = res.data;
        let obj1=exersiceDetails;
        let obj2={'langName':result[0].langName.toLowerCase()}
        let mergeObj={...obj1,...obj2}
        setExersiceDetails(mergeObj);
      });
  }

 if (exersiceDetails) getlangName();


  return exersiceDetails ? <FullExerciseView key={exersiceDetails._id} exersiceDetails={exersiceDetails}/> : (
    <div>loding</div>
  );
  
}
