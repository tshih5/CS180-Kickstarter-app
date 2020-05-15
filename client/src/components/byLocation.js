import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class MostPopular1 extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, country: "", value: 0, percentage: 0, 
		USprojects: [],

		};
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
    console.log("value: " , this.state.value, "country: " , this.state.country);
    var values = {"value": this.state.value, 
					"country": this.state.country,
                  "percentage": 0,
				  "USprojects": []
		            
                }
    this.getbyLocation(values);
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

  getbyLocation = async values => {
    const result = await axios.post("http://localhost:9000/datasetpoint/byLocation", values);
    console.log(result.data);
    this.setState({percentage: result.data});
	this.setState({USProjects: result.data.USProjects});
  };

  render() {
    return (
      <div>
        <Button size="large" onClick={this.showModal}>
          Project by Location
        </Button>
        <Modal
          title="Projects by Location"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Submit"
        >
          <div>
            <h6>This metric shows the percentage of Kickstarter projects by Location</h6>
          </div>
          <div>
            <Select value={this.state.value} onChange={this.handleChange}>
              <Option value={"US"}>United States</Option>
              <Option value={"UK"}>United Kingdom</Option>
			  <Option value={"AU"}>Australia</Option>
			  <Option value={"CA"}>Canada</Option>
			  <Option value={"DE"}>Germany</Option>
			  <Option value={"ES"}>Spain</Option>
			  <Option value={"FR"}>France</Option>
			  <Option value={"IE"}>Ireland</Option>
			  <Option value={"IT"}>Italy</Option>
			  <Option value={"MX"}>Mexico</Option>
			  <Option value={"NL"}>Netherlands</Option>
			  <Option value={"NO"}>Norway</Option>
			  <Option value={"NZ"}>New Zealand</Option>
			  <Option value={"SE"}>Sweden</Option>
			  
            </Select>
          </div>
          <div>
            <p> The percentage of projects based in {this.state.value } is  {this.state.percentage}% </p>
			<h4>Projects from selected country:</h4>
			<ul>
			
				</ul>
          </div>
        </Modal>
      </div>
    );
  }
}