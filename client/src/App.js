import ReactTable from "./components/Table";
import Metric1 from "./components/Metric1"
import AverageDonation from "./components/Average_Donation"
import "./App.css";
import axios from "axios";
import React, {Component, useState, useEffect, useMemo} from 'react';
import { Modal, Form, Button, Input, Layout, Menu, Breadcrumb } from 'antd';
import logo from './logo.png';

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
          }
        ]
      }
    ],
    []
  );

  

  const [data, setData] = useState([]);
  const [originalData, setOData] = useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);


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
      const result = await axios.get("http://localhost:9000/datasetpoint/home");
      setData(result.data);
      setOData(result.data);
    })();
  }, []);

  const UpdateData = () =>{
    //console.log(originalData);
    //console.log(data);
    const diff = data.filter(({name:dname , category:dcategory , currency:dcurrency , deadline:ddeadline , goal:dgoal ,pledged:dpledged ,state:dstate , backers:dbackers ,location:dlocation }) => !originalData.some(({name:oname , category:ocategory , currency:ocurrency , deadline:odeadline , goal:ogoal ,pledged:opledged ,state:ostate , backers:obackers ,location:olocation }) => dname === oname && (dcategory === ocategory && dcurrency === ocurrency) && (ddeadline === odeadline && dgoal===ogoal) && (dpledged === opledged && dstate === ostate) && (dbackers === obackers && dlocation === olocation)));
    //console.log(diff);
    (async () => {
      var params = diff;
      await axios.post('http://localhost:9000/datasetpoint/save', params)
        .then((response) => {
          console.log(response.data);
        },(error)=> {
          console.log(error);
        });
    })();
    setOData(data);
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
          <img src={logo} />
          </Menu>
        </Header>	
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className ="AverageDonation">
            <AverageDonation>Average Donation</AverageDonation>
          </div>
          <div className="site-layout-content">
            <div className="metrics">
              <Metric1></Metric1>
            </div>
            &nbsp;
            <div><Button onClick={UpdateData}>Update Data</Button></div>
            <div className="create_table">
              <ReactTable columns={columns} data={data} setData={setData} updateMyData={updateMyData} skipPageReset = {skipPageReset} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>CS180 Project by CSgods</Footer>
      </Layout>
    </div>
  );
}



export default App;