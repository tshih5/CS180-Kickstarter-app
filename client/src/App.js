import './App.css';
import Table from './components/Table';
import React, {Component, useState, useEffect, useMemo} from 'react';
import { Form, Button, Input, Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends Component{
  state = {
    response: '',
    post: '',
    responseToPost: '',
    columns: '',
    data: [],
  }

  componentDidMount() {
    fetch("http://localhost:9000/testAPI/kickstarter")
    // We get the API response and receive data in JSON format...
    .then(response => response.json())
    // ...then we update the users state
    .then(data =>
      this.setState({
        users: data,
        isLoading: false,
      })
    )
    // Catch any errors we hit and update the app
    .catch(error => this.setState({ error, isLoading: false }));
  }``
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("http://localhost:9000/testAPI/world", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };

  render(){
    const columns = 
      [
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
      ];
      const data = this.state.data;
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

              <Table columns={columns} data={data} />
              <p>{this.state.response}</p>
              <form onSubmit={this.handleSubmit}>
                <p>
                <strong>Post to Server:</strong>
                </p>
                <input
                  type="text"
                  value={this.state.post}
                  onChange={e => this.setState({ post: e.target.value })}
                />
                <button type="submit">Submit</button>
              </form>
              <p>{this.state.responseToPost}</p>
            </div>

          </Content>
          <Footer style={{ textAlign: 'center' }}>CS180 Project by CSgods</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;