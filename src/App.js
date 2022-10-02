import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./Components/Filter";
import Pagination from "./Components/Pagination";
import Table from "./Components/Table";

function App() {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [inputValue, setInputValue] = useState("");
  const [columnSelect, setColumnSelect] = useState("name");
  const [conditionSelect, setConditionSelect] = useState("include");

  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(18);

  const valueArray = inputValue.trim().replace(/\s+/g, " ").split(" ");

  useEffect(() => {
    (async () => {
      const url = "https://damp-sands-59463.herokuapp.com/users";
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    })();
  }, []);
  const filteredArray = data.filter((itemData) => {
    if (inputValue.length > 0) {
      switch (conditionSelect) {
        case "include":
          return valueArray.every((word) => {
            if (columnSelect === "name") {
              return itemData.name.toLowerCase().includes(word.toLowerCase());
            } else if (columnSelect === "quanity")
              return itemData.quanity.toString().includes(word.toLowerCase());
            else
              return itemData.distance.toString().includes(word.toLowerCase());
          });
        case "equals":
          return valueArray.every((word) => {
            if (columnSelect === "name") {
              return itemData.name.toLowerCase() === word.toLocaleLowerCase();
            } else if (columnSelect === "quanity")
              return itemData.quanity === +word;
            else return itemData.distance === +word;
          });
        case "more":
          return valueArray.every((word) => {
            if (columnSelect === "quanity") return itemData.quanity > word;
            else return itemData.distance > word;
          });
        case "less":
          return valueArray.every((word) => {
            if (columnSelect === "quanity") return itemData.quanity < word;
            else return itemData.distance < word;
          });
        default:
          return data;
      }
    } else return data;
  });

  const lastArrayIndex = currentPage * elementsPerPage;
  const firstArrayIndex = lastArrayIndex - elementsPerPage;
  const currentElement = filteredArray.slice(firstArrayIndex, lastArrayIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Filter
        columnSelect={columnSelect}
        setColumnSelect={setColumnSelect}
        conditionSelect={conditionSelect}
        setConditionSelect={setConditionSelect}
        setInputValue={setInputValue}
      />
      <Table
        currentElement={currentElement}
        setData={setData}
        data={data}
        order={order}
        setOrder={setOrder}
      />
      <footer>
        <Pagination
          elementsPerPage={elementsPerPage}
          totalElements={filteredArray.length}
          paginate={paginate}
          currentPage={currentPage}
          setElementsPerPage={setElementsPerPage}
        />
      </footer>
    </div>
  );
}

export default App;
