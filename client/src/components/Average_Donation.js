import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class AverageDonation extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, value: "Project Category", donationss: 0, backers: 0, backerdonate: 0};
        
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
   var values = {"value": this.state.value,
                 "donationss": 0,
                 "backers": 0,
                 "backerdonate": 0
                }
   console.log(values);
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
      const result = await axios.post("http://localhost:9000/analytics/getDonation", values);
      console.log(typeof result.data);
      this.setState({donationss: result.data.donationss});
      this.setState({backers: result.data.backers});
      this.setState({backerdonate: result.data.backerdonate});
  }

  render() {
    return (
      <div>
        <Button size="large" type="primary" onClick={this.showModal}>
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
              <p>The average donation of {this.state.value} is ${this.state.donationss}</p>
              <p>The total number of backers for {this.state.value} is {this.state.backers}</p>
              <h5>How much would each backer be donating to {this.state.value} on average given these quantities?</h5>
              <p>For {this.state.value}, since there is an average of {this.state.backers} backers with an average overall category donation of ${this.state.donationss}, each backer would be donating roughly about ${this.state.backerdonate}.</p>
          </div>
        </Modal>
      </div>
    );
  }
}