import { FaSearch } from "react-icons/fa";
import "./style.css";

export default function Filters(props) {
 const setInpFilters = props.setInpFilters;

  return (
    <div className="filterClass">
      <div className="boxClass">
        <label>type exersice </label>
        <select
          className="selectClass"
          onChange={(e) => setInpFilters(e, "typeInpFilter")}
        >
          <option>short</option>
          <option>rolling</option>
          <option>tutorial</option>
        </select>
      </div>
      <div className="boxClass">
        <label>difficult exersice </label>
        <select
          className="selectClass"
          onChange={(e) => setInpFilters(e, "diffcultInpFilter")}
        >
          <option>easy</option>
          <option>medium</option>
          <option>hard</option>
        </select>
      </div>
      <div className="searchInput  boxClass">
        <input
          type="search"
          placeholder ="search by subject..."
          onChange={(e) => setInpFilters(e, "searchByTagInpFilter")}
        />
        <FaSearch className="icon" />
      </div>
    </div>
  );
}

