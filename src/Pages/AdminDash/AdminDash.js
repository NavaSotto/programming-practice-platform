import AllExercises from "../../Components/AllExercises/AllExercises";
import "./style.css";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";
import { useState } from "react";
import Statistics from "../../Components/Statistics/Statistics";
import Users from "../../Components/Users/Users";

export default function AdminDash() {
    const [mainView, setMainView] = useState("");

    function getMainViewContent() {
        let mainViewContent;
        if (mainView == "exercises")
            mainViewContent = < AllExercises userType="admin" />;
        else if (mainView == "statistics") mainViewContent = < Statistics />;
        else if (mainView == "users") mainViewContent = < Users />;
        else
        {
            mainViewContent = (<div className="adminClass" >
            < h1 className="h2Class" > Welcome <br> </br>to the<br></br > admin page  </h1> </div> );
        }
           
         return mainViewContent;
    }


       return (<div><AdminNavbar setNavbarClick={setMainView} />
                <div > {getMainViewContent()} </div>
         </div>);

};