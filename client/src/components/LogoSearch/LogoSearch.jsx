/*import React, { useState, useEffect } from "react";
import Logo from "../../img/logo_istic.jpg";
import "./LogoSearch.css";
import { UilSearch } from "@iconscout/react-unicons";
//import LogoSearchResults from "../LogoSearchResults/LogoSearchResults";
//import { getAllUser } from "../../api/UserRequests";
import { Link } from "react-router-dom";


const LogoSearch = () => {
  const [search, setSearch] = useState("");
  //const [searchResults, setSearchResults] = useState([]);

  //useEffect(() => {
    // Votre fonction de recherche ici
    /*const results =  fetch(`http://localhost:5000/search?q=${search}`)
                     .then(response => response.json())
                     .then(data => data.results);

    //setSearchResults(results);
  }, [search]);*/

/*return (
  <div className="LogoSearch">
    <div className="Logo-header">
      <Link to="../home">
      <img src={Logo} alt="" />
      </Link>
      <span>Social lstic</span>        
    </div>
    <div className="Search-global">
      <div className="Search">
        <input
          type="text"
          name="search"
          value={search}
          id="search"
          placeholder="Istic Search ..."
          onChange={(e) =>
            setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
          }
        />
        <div className="s-icon">
          <UilSearch />
        </div>          
      </div>
    </div>
  </div>
);
};


export default LogoSearch;
*/

import React, { useState, useEffect } from "react";
import Logo from "../../img/logo_istic.jpg";
import "./LogoSearch.css";
import { UilSearch } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const LogoSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const performSearch = async () => {
      try {
        const response = await fetch(`http://localhost:5000/search?q=${search}`);
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error("Error performing search:", error);
      }
    };

    if (search.trim() !== "") {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [search]);

  return (
    <div className="LogoSearch">
      <span style={{ marginBottom: '0px' }} />
      <div className="Logo-header">
        <Link to="../home">
          <img src={Logo} alt="" />
        </Link>
        <span>Social lstic</span>
      </div>

      <span style={{ marginBottom: '0px' }} />


      <div className="Search-global">
        <div className="Search">
          <input
            type="text"
            name="search"
            value={search}
            id="search"
            placeholder="Istic Search ..."
            onChange={(e) => setSearch(e.target.value)}
          />

          
          <div className="s-icon">
            <UilSearch />
          </div>

        </div>
      </div>


      {/* Render the search results */}
      {/* <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default LogoSearch;
