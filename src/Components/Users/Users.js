import "./style.css";
import axios from 'axios';
import { UserContext } from "../../App";
import { useEffect, useState, useContext } from "react";



export default function Users() {
  const context = useContext(UserContext);
  const [filterSearch, setFilterSearch] = useState('');
  const [usersData, setUsersData] = useState('');

  useEffect(getUsersData, []);

  function getUsersData() {
    console.log(context.token);
    axios.get(`http://localhost:5000/users/`, { headers: { "Authorization": context.token } }).then((res) => {
      setUsersData(res.data);
    });
  }


  function handleFilterTextInputChange(e) {
    setFilterSearch(e.target.value);
  }

  function getFilterList() {

    var rows = [];
    usersData.forEach((user) => {
      if (user.name.indexOf(filterSearch) === -1) {
        return;
      }
      rows.push(<tr key={user.email}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.permission}</td>
      </tr>);
    });
    if (rows)
      return rows;
    else
      return usersData;
  }




  return (

    <div className="usersClass">
      {usersData ?
        <div> <form>
          <input
            className="form-control"
            type="text"
            placeholder="Search..."
            value={filterSearch}
            onChange={handleFilterTextInputChange}
          />
        </form>

          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{getFilterList()}</tbody>
          </table></div> : ''}
    </div>

  );
}
