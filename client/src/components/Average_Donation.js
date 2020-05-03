import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class PopUp2 extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, value: "Project Category", donation: 0};
        
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
   var values = {"value": this.state.value, "donation": 0}
   this.getDonation(values);
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

  getDonation = async values => {
      const result = await axios.post("http://localhost:9000/datasetpoint/getDonation", values);
      console.log(typeof result.data);
      this.setState({donation: result.data});
  }

  render() {
    return (
      <div>
        <Button onClick={this.showModal}>
          Average Donation Raised
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
              <Option value="Music">Music</Option>
              <Option value="Food">Food</Option>
              <Option value="Design">Design</Option>
              <Option value="Games">Games</Option>
              <Option value="Publishing">Publishing</Option>
              <Option value="Film and Video">Film and Video</Option>
              <Option value="Fashion">Fashion</Option>
              <Option value="Technology">Technology</Option>
              <Option value="Crafts">Crafts</Option>
              <Option value="Art">Art</Option>
            </Select>
          </div>
          <div>
              <p>The average donation of {this.state.value} is ${this.state.donation} </p>
          </div>
        </Modal>
      </div>
    );
  }
}