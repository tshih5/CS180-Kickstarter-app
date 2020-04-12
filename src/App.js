import './App.css';
import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends Component{
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
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Steve Jobs</h5>
                  <h6 class="card-subtitle mb-2 text-muted">steve@apple.com</h6>
                  <p class="card-text">Stay Hungry, Stay Foolish</p>
                </div>
              </div>
            </div>
          </Content>
      <Footer style={{ textAlign: 'center' }}>CS180 Project by CSgods</Footer>
    </Layout>
  </div>
    );
  }
}


export default App;