import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./TodoListToggle.module.css";
import sortup from "../assets/sortup.svg";
import sortdown from "../assets/sortdown.svg";

function TodoListToggle({ updateSortOrder }) {
  const [titleSortOrder, setTitleSortOrder] = useState(true);

  const toggleSortOrder = () => {
    const newSortOrder = !titleSortOrder;
    setTitleSortOrder(newSortOrder);
    updateSortOrder(newSortOrder);
  };

  TodoListToggle.propTypes = {
    updateSortOrder: PropTypes.func.isRequired,
  };

  return (
    <div className="toggleContainer">
      <button className={style.toggleButton} onClick={toggleSortOrder}>
        Sort
        {
          <img src={titleSortOrder ? sortup : sortdown} alt={titleSortOrder ? "Sort Up" : "Sort down"} />
        }
      </button>
    </div>
  );
}

export default TodoListToggle;
