import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import LangCard from "../LangCard/LangCard";
import ExercisesCard from "../ExerciseCard/ExerciseCard";
import Filters from "../Filters/Filters";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import "./style.css";
import {Link}  from "react-router-dom";

export default function AllExercises(props) {
  const context = useContext(UserContext)
  const location = useLocation();
  const [languagesList, setLanguagesList] = useState([]);
  const [exercisesList, setExercisesList] = useState([]);
  const [exercisesFilters, setExercisesFilters] = useState({
    filters: {
      searchByTagInpFilter: "",
      diffcultInpFilter: "",
      typeInpFilter: "",
    },
  });
  const [langName,setLangName]=useState('');
  const [exercisesFilterList, setExercisesFilterList] = useState([]);

  //----------------------------------------------------------------------
  useEffect(() => {
   if (exercisesList.length) setExercisesList([]);
   if (!languagesList.length) getAllLanguages();
  }, [location]);
  //----------------------------------------------------------------------

  useEffect(filterExercisesList, [exercisesFilters]);
  //----------------------------------------------------------------------

  function getAllLanguages() {
    axios.get(`http://localhost:5000/language/`).then((res) => {
      setLanguagesList(res.data);
    });
  }
  //----------------------------------------------------------------------
  
  function getAllExercisesInLang(idLang) {

    axios
      .get(`http://localhost:5000/exercisesCardsInLang/${idLang}`/*, { headers: { "Authorization": context.token } }*/)
      .then((res) => {
        setExercisesList(res.data);
        setExercisesFilterList(res.data);
      });
  }
  //----------------------------------------------------------------------

  function filterExercisesList() {


    const filteredExerciseList = exercisesList.filter((exCard) => {
      const searchByTagFilter = exCard.tags
        .map((t) => t.toLowerCase())
        .find((v) =>
          v
            .toLowerCase()
            .startsWith(exercisesFilters.filters.searchByTagInpFilter)
        );

      const diffcultFilter =
        exCard.difficulty
          .toLowerCase()
          .indexOf(
            exercisesFilters.filters.diffcultInpFilter.toString().toLowerCase()
          ) > -1;
    
      const typeFilter =
        exCard.exec_type
          .toLowerCase()
          .indexOf(
            exercisesFilters.filters.typeInpFilter.toString().toLowerCase()
          ) > -1;
     
      return searchByTagFilter && diffcultFilter && typeFilter;
    });
    setExercisesFilterList(filteredExerciseList);
  }
  //----------------------------------------------------------------------
  function removeExercise(id)  {
    axios.delete(`http://localhost:5000/exercise/delete/${id}`, { headers: { "Authorization": context.token } }).then((res) => {
    });
    setExercisesFilterList((filteredExerciseList) => filteredExerciseList.filter((item) => item._id !== id));

  };

  const handleSearchFilter = (event, key) => {
    const inputValue = event.target.value;
    setExercisesFilters((prevState) => ({
      filters: {
        ...prevState.filters,
        [key]: inputValue,
      },
    }));
   
  };


 

  return (
    <div className="main">
      {exercisesList.length ? (
        <div>
          <div className="flex">
          <Filters setInpFilters={handleSearchFilter} />
         {context.userLogin?.permission=='admin'? <Link className="newExercise" to={`/admin/exercise/`} >add new exercise</Link>:''}

           </div>

          <ul className="exerciseCardGridClass">

            {exercisesFilterList.map((ex) => (
              <ExercisesCard
                exObj={ex}
                key={ex._id}
                langName={langName}
                userType={props.userType}
                removeExercise={removeExercise} //just if context equal to admin
              />
            ))}
          </ul>
        </div>
      ) : languagesList.length ? (
        <ul className="langCardGridClass">
          {languagesList.map((lang) => (
            <LangCard
              langObj={lang}
              key={lang._id}
              setExercisesLangFunc={getAllExercisesInLang}
              icon={lang.icon}
            />
          ))}
        </ul>
      ) : (
        <div>loading....</div>
      )}
    </div>
  );
}
