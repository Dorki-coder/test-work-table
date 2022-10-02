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
          const selected = e.target.value;
          setConditionSelect(selected);
        }}
      >
        <option value="include">Содержит</option>
        <option value="equals">Равно</option>
        {columnSelect === "name" ? (
          <option value="more" disabled>
            Больше
          </option>
        ) : (
          <option value="more">Больше</option>
        )}
        {columnSelect === "name" ? (
          <option value="less" disabled>
            Меньше
          </option>
        ) : (
          <option value="less">Меньше</option>
        )}
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
