import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class SvF extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, category: "Photography", ratio: 0};
        
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
    console.log("category: " , this.state.category, " ratio: ", this.state.ratio);
    var values = {"category": this.state.category, 
                  "ratio": 0
                }
    this.getSvF(values);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleChange = (e) =>{
    this.setState({category: e})
  };

  getSvF = async values => {
    const result = await axios.post("http://localhost:9000/datasetpoint/getsvf", values);
    console.log(typeof result.data);
    this.setState({ratio: result.data});
  };

  render() {
    return (
      <div>
        <Button onClick={this.showModal}>
          Success vs. Fail
        </Button>
        <Modal
          title="Success vs. Fail"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Submit"
        >
          <div>
            <h6>This metric shows the Success vs Failure rate of a all Kickstarters by Category. </h6>
          </div>
          <div>
            <Select value={this.state.category} onChange={this.handleChange}>
              <Option value="Publishing">Publishing</Option>
              <Option value="Film & Video">Film & Video</Option>
              <Option value="Music">Music</Option>
              <Option value="Food">Food</Option>
              <Option value="Design">Design</Option>
              <Option value="Crafts">Crafts</Option>
              <Option value="Games">Games</Option>
              <Option value="Comics">Comics</Option>
              <Option value="Fashion">Fashion</Option>
              <Option value="Theater">Theater</Option>
              <Option value="Art">Art</Option>
              <Option value="Photography">Photography</Option>
              <Option value="Technology">Technology</Option>
              <Option value="Dance">Dance</Option>
              <Option value="Journalism">Journalism</Option>
            </Select>
          </div>
          <div>
            <p> The percentage of Success vs Failure Rate for {this.state.category} is {this.state.ratio}% </p>
          </div>
        </Modal>
      </div>
    );
  }
}