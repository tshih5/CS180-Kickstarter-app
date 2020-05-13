import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class MostPopular extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, value: 0, amount: 0.0, total: 0.0, max_category: "", projects: []};
        
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log("value: " , this.state.value);
    var values = {"value": this.state.value, 
                  "amount": 0,
                  "total": 0,
                  "max_category": "",
                  "projects": []
                }
    this.getMostPopular(values);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleChange = (e) =>{
    this.setState({value: e})
  };

  getMostPopular = async values => {
    const result = await axios.post("http://localhost:9000/datasetpoint/getmostpopular", values);
    console.log(result.data);
    this.setState({amount: result.data.amount});
    this.setState({total: result.data.total});
    this.setState({max_category: result.data.max_category});
    this.setState({projects: result.data.projects});
  };

  render() {
    return (
      <div>
        <Button size="large" type="primary" onClick={this.showModal}>
          Most Popular
        </Button>
        <Modal
          title="Most Popular Category"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Submit"
        >
          <div>
            <h6>This metric shows the most popular projects by backers or donations</h6>
          </div>
          <div>
            <Select value={this.state.value} onChange={this.handleChange}>
              <Option value={0}>Highest Donations</Option>
              <Option value={1}>Most Donators</Option>
            </Select>
          </div>
          <div>
            <p> The category with the {this.state.value ? "Most Donators": "Highest Donations"} is {"\"" + this.state.max_category  + "\""} with {this.state.value ? "": "$"}{this.state.amount}{this.state.value ? " backers ": " pledged "} out of {this.state.value ? "": "$"}{this.state.total} total</p>
            <p>
              <ul>
                {this.state.projects.map(item => {
                return <li>{item.name} with {this.state.value ? "": "$"}{this.state.value ? item.backers: item.usd_pledged} {this.state.value ? "backers": "pledged"}</li>;
                })}
              </ul>
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}