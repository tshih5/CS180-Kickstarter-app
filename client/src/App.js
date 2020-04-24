import ReactTable from "./components/Table";
import "./App.css";
import axios from "axios";
import React, {Component, useState, useEffect, useMemo} from 'react';
import { Form, Button, Input, Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;


function App() {
  const columns = useMemo(
    () =>[

	
      { //first group column
        Header: "Kickstarters",
        columns: [
          {
            Header: "Name",
            accessor: "name" 
          },
          {
            Header: "Category",
            accessor: "category"
          }
        ]  
      },
      { //second group column
        Header: "Project Metrics",
        columns: [
          {
            Header: "Currency",
            accessor: "currency"
          },
          {
            Header: "Project Deadline", //remove (?) -Tom
            accessor: "deadline"
          },
          {
            Header: "Goal",
            accessor: "goal",
            width: 100
          },
          {
            Header: "Launched",
            accessor: "launched"
          },
          {
            Header: "Amount Pledged",
            accessor: "pledged"  
          },
          {
            Header: "State of Project",
            accessor: "state"   
          },
          {
            Header: "Number of Backers",
            accessor: "backers" 
          },
          {
            Header: "Location",
            accessor: "country",
            width: 150
          }
        ]
      }
    ],
    []
  );

  const [data, setData] = useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row;
      })
    )
  }


  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:2345/home");
      setData(result.data);
    })();
  }, []);

  const saveData = () =>{
    //console.log(data);
    (async () => {
      var params = data;
      let res = await axios.post('http://localhost:2345/users', params);
      console.log(res.data);
    })();
  }
  
  return(
    <div className="App">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>	
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
          <div><Button onClick={saveData}>Save Data</Button></div>
          <div className="create_table"></div>
            <ReactTable columns={columns} data={data} setData={setData} updateMyData={updateMyData} skipPageReset = {skipPageReset} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>CS180 Project by CSgods</Footer>
      </Layout>
    </div>
  );
}



export default App;