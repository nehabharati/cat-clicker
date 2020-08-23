import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="header">
      <h1>
        <FontAwesomeIcon icon={faPaw} className="mr-2" />
        Cat Clicker <FontAwesomeIcon icon={faPaw} className="mr-2" />
      </h1>
    </div>
  );
}

export default Header;
