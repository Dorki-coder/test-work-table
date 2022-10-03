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
  const [isLoading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(18);

  useEffect(() => {
    (async () => {
      const url = "https://damp-sands-59463.herokuapp.com/users";
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setLoading(false);
    })();
  }, []);
  const filteredArray = data.filter((itemData) => {
    if (inputValue.length > 0) {
      switch (conditionSelect) {
        case "include":
          if (columnSelect === "name") {
            return itemData.name
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          } else if (columnSelect === "quanity")
            return itemData.quanity
              .toString()
              .includes(inputValue.toLowerCase());
          else
            return itemData.distance
              .toString()
              .includes(inputValue.toLowerCase());
        case "equals":
          if (columnSelect === "name") {
            return itemData.name.toLowerCase() === inputValue.toLowerCase();
          } else if (columnSelect === "quanity")
            return itemData.quanity === +inputValue;
          else return itemData.distance === +inputValue;
        case "more":
          if (columnSelect === "quanity") return itemData.quanity > inputValue;
          else return itemData.distance > inputValue;
        case "less":
          if (columnSelect === "quanity") return itemData.quanity < inputValue;
          else return itemData.distance < inputValue;
        default:
          return data;
      }
    }
    return data;
  });

  const lastArrayIndex = currentPage * elementsPerPage;
  const firstArrayIndex = lastArrayIndex - elementsPerPage;
  const currentElement = filteredArray.slice(firstArrayIndex, lastArrayIndex);

  return (
    <div className="container">
      <Filter
        columnSelect={columnSelect}
        setColumnSelect={setColumnSelect}
        conditionSelect={conditionSelect}
        setConditionSelect={setConditionSelect}
        setInputValue={setInputValue}
      />
      {isLoading === false ? (
        <Table
          currentElement={currentElement}
          setData={setData}
          data={data}
          order={order}
          setOrder={setOrder}
        />
      ) : (
        <p>loading...</p>
      )}

      <footer>
        {filteredArray.length > 0 ? (
          <Pagination
            elementsPerPage={elementsPerPage}
            totalElements={filteredArray.length}
            paginate={setCurrentPage}
            currentPage={currentPage}
            setElementsPerPage={setElementsPerPage}
          />
        ) : null}
      </footer>
    </div>
  );
}

export default App;
