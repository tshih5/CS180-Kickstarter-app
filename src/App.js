import './App.css';
import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Contacts from './components/contacts';

const { Header, Content, Footer } = Layout;

class App extends Component{
  componentDidMount(){
    fetch('http://jsonplaceholder.typicode.com/users')
    //fetch('./components/data/fakeData.json')
        .then(res => res.json())
        .then((data) => {
          this.setState({ contacts: data })
        })
        .catch(console.log)
  }
  state = {
    contacts: []
  }
  render(){
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
              <Contacts contacts={this.state.contacts}/>
            </div>
          </Content>
      <Footer style={{ textAlign: 'center' }}>CS180 Project by CSgods</Footer>
    </Layout>
  </div>
    );
  }
}


export default App;