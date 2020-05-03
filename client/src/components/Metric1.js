import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class PopUp extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, value0: "successful", value1: "failed", ratio: 0};
        
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
    var values = {"value0": this.state.value0, 
                  "value1": this.state.value1,
                  "ratio": 0
                }
    this.getRatio(values);
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

  getRatio = async values => {
    const result = await axios.post("http://localhost:9000/datasetpoint/getratio", values);
    console.log(typeof result.data);
    this.setState({ratio: result.data});
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Project State Ratio
        </Button>
        <Modal
          title="Percentage metric"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Submit"
        >
          <div>
            <h6>This metric shows the percentage of one project state to another.</h6>
          </div>
          <div>
            <Select value={this.state.value0} onChange={(e) => this.handleChange(0, e)}>
              <Option value="failed">Failed</Option>
              <Option value="live">Live</Option>
              <Option value="successful">Successful</Option>
              <Option value="canceled">Cancelled</Option>
            </Select>
            <l> \ </l>
            <Select value={this.state.value1} onChange={(e) => this.handleChange(1, e)}>
              <Option value="failed">Failed</Option>
              <Option value="live">Live</Option>
              <Option value="successful">Successful</Option>
              <Option value="canceled">Cancelled</Option>
            </Select>
          </div>
          <div>
            <p> The ratio of {this.state.value0} to {this.state.value1} projects is {this.state.ratio}% </p>
          </div>
        </Modal>
      </div>
    );
  }
}