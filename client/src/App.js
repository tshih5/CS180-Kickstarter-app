import './App.css';
import React, {Component} from 'react';
import { Form, Button, Input, Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends Component{
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch("http://localhost:9000/testAPI/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
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