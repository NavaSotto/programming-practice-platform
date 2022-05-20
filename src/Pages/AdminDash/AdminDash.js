import AllExercises from "../../Components/AllExercises/AllExercises";
import "./style.css";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";
import { useEffect, useState } from "react";
import Statistics from "../../Components/Statistics/Statistics";
import Users from "../../Components/Users/Users";

export default function AdminDash() {
    const [mainView, setMainView] = useState("");

    function getMainViewContent() {
        let mainViewContent;
        if (mainView == "exercises")
            mainViewContent = <div >< AllExercises userType="admin" /></div>;
        else if (mainView == "statistics") mainViewContent = <div>< Statistics /></div>;
        else if (mainView == "users") mainViewContent = <div > < Users /></div>;
        else {
            mainViewContent = (<div className="adminClass " >
                < h1 className="h2Class" > Welcome to the<br></br> admin page  </h1> </div>);
        }

        return mainViewContent;
    }


    return (<div><AdminNavbar setNavbarClick={setMainView} />
        <div > {getMainViewContent()} </div>
    </div>);

};