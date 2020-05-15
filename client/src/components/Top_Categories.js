import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';
import axios from "axios";

const { Option } = Select;

export default class TopCategories extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, value: 0, top1: "", count1: 0, top2: "", count2: 0, top3: "", count3: 0, top4: "", count4: 0, top5: "", count5: 0};
        
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
                  "top1": "",
                  "top2": "",
                  "top3": "",
                  "top4": "",
                  "top5": "",
                  "count1": 0,
                  "count2": 0,
                  "count3": 0,
                  "count4": 0,
                  "count5": 0
                }
    this.getTop(values);
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

  getTop = async values => {
    const result = await axios.post("http://localhost:9000/datasetpoint/getTop", values);
    console.log(result.data);
    this.setState({top1: result.data.top1});
    this.setState({top2: result.data.top2});
    this.setState({top3: result.data.top3});
    this.setState({top4: result.data.top4});
    this.setState({top5: result.data.top5});
    this.setState({count1: result.data.count1});
    this.setState({count2: result.data.count2});
    this.setState({count3: result.data.count3});
    this.setState({count4: result.data.count4});
    this.setState({count5: result.data.count5});
  };

  render() {
    return (
      <div>
        <Button size="large" onClick={this.showModal}>
          Most Common Projects (Ranked)
        </Button>
        <Modal
          title="Top 5 Common Categories"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Submit"
        >
          <div>
            <h3>This metric shows the most common kind of project type ranked in order (top 5)</h3>
          </div>

          <div>
            <p>The category with the Most of its type is: {this.state.top1}</p>
            <p>The category with the Second most of its type is: {this.state.top2}</p>
            <p>The category with the Third most of its type is: {this.state.top3}</p>
            <p>The category with the Fourth most of its type is: {this.state.top4}</p>
            <p>The category with the Fifth most of its type is: {this.state.top5}</p>
            
            <h3>Detailed View (Total Number for Each Project)</h3>

            <p>{this.state.top1} has {this.state.count1} projects.</p>
            <p>{this.state.top2} has {this.state.count2} projects.</p>
            <p>{this.state.top3} has {this.state.count3} projects.</p>
            <p>{this.state.top4} has {this.state.count4} projects.</p>
            <p>{this.state.top5} has {this.state.count5} projects.</p>

          </div>
        </Modal>
      </div>
    );
  }
}