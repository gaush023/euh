import React from 'react';
import { Link } from 'react-router-dom';

function Osusume() {
  return (
    <div>
      <h1>Osusume</h1>
      <ul>
        <li><Link to="/questiondetail">Question List</Link></li>
        <li><Link to="/questions">Questions</Link></li>
      </ul>
    </div>
  );
}

export default Osusume;