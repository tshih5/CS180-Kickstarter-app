import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class TopCategories extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, value: "Project Category", top: ""};
        
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
   var values = {"value": this.state.value, "top": ""}
   console.log(values);
   this.getTop(values);
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

  getTop = async values => {
      const result = await axios.post("http://localhost:9000/datasetpoint/getTop", values);
      console.log(typeof result.data);
      this.setState({top: result.data});
      //this.setState({top2: result.data.top2});
  }

  render() {
    return (
      <div>
        <Button size="large" onClick={this.showModal}>
          Most Common Category 
        </Button>
        <Modal
          title="Most Common Categories"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Click to see the Most Common Category"
        >
          
          <div>
              <p>The most common category for Kickstarter is {this.state.top}</p>
          </div>
        </Modal>
      </div>
    );
  }
}