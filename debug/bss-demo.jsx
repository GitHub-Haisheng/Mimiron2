const ReactDOM = mimiron2.ReactDOM;
const React = mimiron2.React;

const Page = mimiron2.Page;
const Topbar = mimiron2.Topbar;
const Sidebar = mimiron2.Sidebar;

const DatePicker = mimiron2.DatePicker;
const Button = mimiron2.Button;
const Icon = mimiron2.Icon;
const Collapse = mimiron2.Collapse;
const Panel = Collapse.Panel;
const Checkbox = mimiron2.Checkbox
const CheckboxGroup = Checkbox.Group;
const Radio = mimiron2.Radio;
const RadioGroup = Radio.Group;
const TableRaw = mimiron2.TableRaw;
const Table = mimiron2.Table;
const Ajax = mimiron2.Ajax;
const Query = mimiron2.Query;
const Input = mimiron2.Input;
const Select = mimiron2.Select;
const Option = Select.Option;

class Show extends React.Component{
  render() {
    return (<div className="row" style={{"padding":"10px"}}>
      <div className="col-4" style={{"textAlign":"right","padding":"5px"}}>
        <h3>{this.props.name}:</h3>
      </div>
      <div className="col-20">
        {this.props.children}
      </div>
    </div>);
  }
}
Show.defaultProps = {
  name :"未命名"
};



let Demo = React.createClass({
  locals:{
    params:{},
  },
  getInitialState: function () {
    return {
      table:{
        pageSize:10,
        pageNo:1,
        totalRows:0,
        data: [],
      },
      options: []
    };
  },
  componentDidMount: function(){
    this.doList(this.state.table.pageNo, this.state.table.pageSize);
  },
  doList: function(pageNo, pageSize){ //params用在查询时, 传入其他参数
      var _this = this;
      var params = this.locals.params;
      params["pageNo"] = pageNo;
      params["pageSize"] = pageSize;
      Ajax.post("http://127.0.0.1:9002/api/queryHandingForm",params , function(r){
          var data = r.result;
          for(var i in data){
            data[i]["operate"] = (<span>
              <Button type="primary" onClick={alert.bind(null,"123")}>
                查看详情
              </Button>
            </span>);
          }
          _this.setState({
            table:{
              data:data,
              totalRows:r.totalCount,
              offset: pageNo,
              pageSize: pageSize
            }
          });
      });
  },
  InputChange (value){
    console.log("额外输入回调", value);
  },
  handleSelectChange(value) {
    let options;
    if (!value || value.indexOf('@') >= 0) {
      options = [];
    } else {
      options = ['gmail.com', '163.com', 'qq.com'].map(function(domain) {
        const email = value + '@' + domain;
        return <Option key={email}>{email}</Option>;
      });
    }
    this.setState({
      options: options
    });
  },
  render: function() {
    let tableProps={
      title:['受理单号','客户经理','客户名称','受理单类型','是否试用','状态','总金额','订购类型','订购周期','提交日期','资源开通日期'],
      jsonKey:['requestTicketsNo','CMname','accountName','useType','isTrial','status','totalPrice','cycleType','cycleCnt','requestDate','createDate'],
      data:this.state.table.data,
      doList:this.doList,
      pageSize:this.state.table.pageSize,
      pageNo:this.state.table.pageNo, //page:this.state.offset
      totalRows:this.state.table.totalRows,
      checkType:"none",
    };
    return (
    <div className="row">
      <Show name="查询框">
        <Query>
          <Input name="input1" placeholder="请输入搜索名称" label="搜索名称：" />
          <Input name="input2" placeholder="请输入搜索名称" label="搜索名称：" onChange={this.InputChange}/>
          <Input name="input3" placeholder="请输入搜索名称" label="搜索名称：" />
          <Select combobox size="large"
            name="input4"
            onChange={this.handleSelectChange}
            filterOption={false}
            searchPlaceholder="请输入账户名"
            label="提示输入：">
            {this.state.options}
          </Select>
          <Select name="input5" label="选择框：" size="large" defaultValue="lucy">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
          <DatePicker name="input6" label="日期选择：" defaultValue="2015/01/01" format="yyyy/MM/dd" />
          <Select name="input7" label="另一种选择框：" data={{"1":"yi","2":"er"}} />
        </Query>
      </Show>
      <Show name="表格">
        <Table {...tableProps} />
      </Show>
    </div>);
  }
});

ReactDOM.render(<Demo />, document.getElementById('current-page'));
