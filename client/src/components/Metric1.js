import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class PopUp extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, value0: "Successful", value1: "Failed"};
        
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
    console.log("value0: " , this.state.value0, " value1: ", this.state.value1);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleChange = (id, e) =>{
    if(id)
      this.setState({value1: e});
    else
      this.setState({value0: e});
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Project State Ratio
        </Button>
        <Modal
          title="Ratio metric"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Submit"
        >
          <div>
            <Select value={this.state.value0} onChange={(e) => this.handleChange(0, e)}>
              <Option value="Failed">Failed</Option>
              <Option value="Live">Live</Option>
              <Option value="Successful">Successful</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
            <l> \ </l>
            <Select value={this.state.value1} onChange={(e) => this.handleChange(1, e)}>
              <Option value="Failed">Failed</Option>
              <Option value="Live">Live</Option>
              <Option value="Successful">Successful</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </div>
        </Modal>
      </div>
    );
  }
}