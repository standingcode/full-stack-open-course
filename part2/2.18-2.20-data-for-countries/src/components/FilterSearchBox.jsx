const FilterSearchBox = ({ filter, filterFieldChanged }) => {
  return (
    <div>
      Search&nbsp;          
      <input value={filter} onChange={filterFieldChanged} />
    </div>
  );
};

export default FilterSearchBox;
