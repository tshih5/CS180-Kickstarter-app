import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class AverageCost extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, value: "Project Category", cost: 0};
        
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    //route to calculation function?
   console.log("value: ", this.state.value);
   var values = {"value": this.state.value, "avgcost": 0}
   console.log(values);
   this.getCost(values);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleChange = (id, e) =>{
      this.setState({value: e}); 
  };

  dropDownValue(value) {
      console.log(value);
  }

  getCost = async values => {
      const result = await axios.post("http://localhost:9000/datasetpoint/getCost", values);
      console.log(typeof result.data);
      this.setState({avgcost: result.data});
  }

  render() {
    return (
      <div>
        <Button size="large"  type="primary" onClick={this.showModal}>
          Average Project Cost
        </Button>
        <Modal
          title="Average Amount of Money Raised by Category"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Calculate"
        >
          <div>
            <Select value={this.state.value} onChange={(e) => this.handleChange(0, e)}>
              {/*<Option value="Music">Music</Option>*/}
              <Option value="Food">Food</Option>
              <Option value="Design">Design</Option>
              <Option value="Games">Games</Option>
              <Option value="Publishing">Publishing</Option>
              {/*<Option value="Film & Video">Film and Video</Option>*/} 
              <Option value="Fashion">Fashion</Option>
              <Option value="Technology">Technology</Option>
              <Option value="Crafts">Crafts</Option>
              <Option value="Art">Art</Option>
            </Select>
          </div>
          <div>
              <p>The average cost of {this.state.value} is ${this.state.avgcost}</p>
          </div>
        </Modal>
      </div>
    );
  }
}