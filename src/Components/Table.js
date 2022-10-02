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
          <th onClick={() => sorting("name")}>Название</th>
          <th onClick={() => sorting("distance")}>Расстояние</th>
          <th onClick={() => sorting("quanity")}>Количество</th>
          <th>Дата</th>
        </tr>
      </thead>
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
    </table>
  );
};

export default Table;
