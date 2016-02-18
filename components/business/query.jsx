import React from 'react';
import Row from '../basic/row';
import Col from '../basic/col';
import Form from "../basic/form";
const FormItem = Form.Item;
import Input from "../basic/input";
import Button from "../basic/button";

function noop() {
}

let Query = React.createClass({
	getInitialState: function(){
		return{
			formData:this.props.formData
		}
	},
	getDefaultProps: function(){
		return{
			formData: {},
			submitName: "查询",
			id: "query-from-default-id",
		}
	},
	setValue: function(func,name,e){
		let formData = this.state.formData;
		let value = e.target? e.target.value: e; //Input 传入的是e, select传入的是value
		formData[name] = value;
		this.setState({formData:formData});
		if(func)
			func(value);
	},
	handleSubmit: function(e){
		e.preventDefault();
		console.log(this.state.formData);
    	//console.log('收到表单值：', this.props.form.getFieldsValue());
	},
	render: function(){
		let formData = this.state.formData;
		let formEntity = [];
		for(let i in this.props.children){
			let child = React.cloneElement(this.props.children[i],
				{onChange: this.setValue.bind(null, this.props.children[i].props["onChange"],
					this.props.children[i].props["name"])});
			formEntity.push(<Col span="8" key={i}>
							<FormItem
						        label={this.props.children[i].props["label"]}
						        labelCol={{ span: 10 }}
						        wrapperCol={{ span: 14 }}>
						        {child}
						    </FormItem>
						</Col>);
		}
		return(<div>
				<Form horizontal onSubmit={this.handleSubmit} id={this.props.id}>
				  <Row>
				    {formEntity}
				  </Row>
				  <Row>
				    <Col span="8" offset="16" style={{ textAlign: 'right' }}>
				      <Button type="primary" htmlType="submit">{this.props.submitName}</Button>
				      <Button type="ghost" onClick={()=>{document.getElementById(this.props.id).reset()}}>清除条件</Button>
				    </Col>
				  </Row>
				</Form>
			</div>)
	}
});

export default Query;