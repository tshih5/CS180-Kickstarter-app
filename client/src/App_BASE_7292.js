import Table from "./components/Table";
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
            accessor: "goal"
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
            accessor: "country"
          }
        ]
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:9000/testapi/kickstarters");
      setData(result.data);
    })();
  }, []);

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
          <div className="create_table"></div>
            <Table columns={columns} data={data} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>CS180 Project by CSgods</Footer>
      </Layout>
    </div>
  );
}

export default App;