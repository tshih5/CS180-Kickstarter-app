import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import axios from 'axios';

const cellStyle = {
  width: "150px",
  border: "none"
}

const EditableCell = ({
  value: initialValue,
  row: {index},
  column:{id},
  updateMyData,
}) => {
  const [value, setValue] = React.useState(initialValue);
  
  const onChange = e =>{
    setValue(e.target.value);
  }

  const onBlur = () => {
    updateMyData(index, id, value);
  }
  React.useEffect(() =>{
    setValue(initialValue);
  }, [initialValue])
  return <input value={value} onChange={onChange} onBlur={onBlur} style={cellStyle}/>
}

const defaultColumn = {
  Cell: EditableCell,
}


export default function Table({ columns, data, updateMyData, skipPageReset, setData }) {

  const [filterInput, setFilterInput] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
    },
    useFilters,
    useSortBy
  );


  const handleFilterChange = e => {
    const value = e.target.value || undefined;
  //  setFilter("name", value);
  
    setFilterInput(value);
  };

const test = () => {
	//console.log(filterInput)
	(async () => {
  const result = await axios.get("http://localhost:2345/search/" + filterInput);
    setData(result.data);
 })();
	}

  return (
    <>
      <input 
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
      />
	  <button onClick={test}>
	  Search
	  </button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}