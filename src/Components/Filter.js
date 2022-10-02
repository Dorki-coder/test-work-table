const Filter = ({
  columnSelect,
  setColumnSelect,
  conditionSelect,
  setConditionSelect,
  setInputValue,
}) => {
  return (
    <div className="filter__wrapper">
      <select
        className="search__input"
        onChange={(e) => {
          const selected = e.target.value;
          setColumnSelect(selected);
          // we can't filter more or less for users words and therefore we set condition to include
          if (e.target.value === "name") setConditionSelect("include");
        }}
      >
        <option value="name">Название</option>
        <option value="quanity">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select
        className="search__input"
        value={conditionSelect}
        onChange={(e) => {
          const condition = e.target.value;
          setConditionSelect(condition);
        }}
      >
        <option value="include">Содержит</option>
        <option value="equals">Равно</option>
        <option value="more" disabled={columnSelect === "name"}>
          Больше
        </option>
        <option value="less" disabled={columnSelect === "name"}>
          Больше
        </option>
      </select>
      <input
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="Search"
      ></input>
    </div>
  );
};

export default Filter;
