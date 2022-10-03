const Table = ({ setData, setOrder, order, currentElement, data }) => {
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <table className="list">
      <thead>
        <tr className="element header">
          <th onClick={() => sorting("name")}>
            Название{" "}
            <svg width="20" height="8" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#FFFFFF"
                stroke-width="1.5"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </th>
          <th onClick={() => sorting("distance")}>
            Расстояние{" "}
            <svg width="20" height="8" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#FFFFFF"
                stroke-width="1.5"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </th>
          <th onClick={() => sorting("quanity")}>
            Количество{" "}
            <svg width="20" height="8" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#FFFFFF"
                stroke-width="1.5"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </th>
          <th>Дата</th>
        </tr>
      </thead>
      {currentElement.length > 0 ? (
        <tbody>
          {currentElement.map((element) => (
            <tr key={element.id} className="element">
              <th>{element.name}</th>
              <th>{element.distance}км</th>
              <th>{element.quanity}шт.</th>
              <th>{element.date}</th>
            </tr>
          ))}
        </tbody>
      ) : (
        "По запросу ничего не найдено"
      )}
    </table>
  );
};

export default Table;
