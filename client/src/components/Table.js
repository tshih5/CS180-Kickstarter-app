import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import {Input, Button} from 'antd';
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
  return <Input value={value} onChange={onChange} onBlur={onBlur} style={cellStyle}/>
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
    setFilterInput(value);
  };

const test = () => {
	//console.log(filterInput)
	(async () => {
    const result = await axios.get("http://localhost:9000/datasetpoint/search/" + filterInput);
    setData(result.data);
  })();
}

const add = () => {
	//console.log(filterInput)
	(async () => {
    const result = await axios.post("http://localhost:9000/datasetpoint/add");
    setData(result.data);
  })();
}

  return (
    <>
      <Input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
        style={{width: "500px"}}
      />
	  <Button onClick={test}>
	  Search
	  </Button>
	  &nbsp;
	   <Button onClick={add}>
	  add
	  </Button>
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