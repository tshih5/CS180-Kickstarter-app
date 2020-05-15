import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class MostPopular2 extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, country: "", launched: 0, percentage: 0, total: 0.0, max_category: ""};
        //make changes above to change ratio when country changes
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
    console.log("value: " , this.state.value, "launched: " , this.state.launched);
    var values = {"value": this.state.value, 
					"country": this.state.country,
					"launched": this.state.launched,
                  "percentage": 0,
                  "total": 0,
                  "max_category": ""
                }
    this.getbyYear(values);
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

  getbyYear = async values => {
    const result = await axios.post("http://localhost:9000/datasetpoint/byYear", values);
    console.log(result.data);
    this.setState({launched: result.data});
    this.setState({total: result.data.total});
    this.setState({max_category: result.data.max_category});
  };

  render() {
    return (
      <div>
        <Button size="large" onClick={this.showModal}>
          Project by Year
        </Button>
        <Modal
          title="Projects by Year"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Submit"
        >
          <div>
            <h6>This metric shows the number Kickstarter projects started in a certain year</h6>
          </div>
          <div>
            <Select value={this.state.value} onChange={this.handleChange}>
              <Option value={2010}>  2010  </Option>
              <Option value={2011}>2011</Option>
			  <Option value={2012}>2012</Option>
			  <Option value={2013}>2013</Option>
			  <Option value={2014}>2014</Option>
			  <Option value={2015}>2015</Option>
			  <Option value={2016}>2016</Option>
			  
            </Select>
          </div>
          <div>
            <p> The number of projects started in {this.state.value} is: {this.state.launched} </p>
          </div>
        </Modal>
      </div>
    );
  }
}