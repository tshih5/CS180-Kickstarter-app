import { Select, Modal, Button } from 'antd';
import React, {Component} from 'react';

const { Option } = Select;

export default class PopUp2 extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false, value: "Project Category"};
        
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
   this.setState({
       visible: false,
   });
  };

  handleChange = (id, e) =>{
      this.setState({value: e}); 
  };

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
        >
          <div>
            <Select value={this.state.value} onChange="">
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
        </Modal>
      </div>
    );
  }
}