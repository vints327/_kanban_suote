import React, { Component } from 'react';
import { connect } from 'react-redux'
import { message, Menu, Icon, Row, Col, Card, Table, Divider,
    Form, DatePicker, Button, Select } from 'antd';
import { TPostData } from '../../utils/TAjax';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
import TableExport from 'tableexport';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import './index.less';


@connect( ( state, props ) => {
    return {
        workcenter: state.workcenter,
        Breadcrumb:state.Breadcrumb,
    }
}, )
export default class TProductionReport extends Component {
    // 初始化页面常量 绑定事件方法
    constructor( props, context ) {
        super( props )
        this.state = {
            workshopList: [],
            dispatchingList: [],
            workCenterList: [],
            ProModelList: []
        }
        this.url = '/api/TFactory/workshop';
        // this.workshopList =[];
        // this.getUserInfo = this.getUserInfo.bind(this)
    }

    componentWillMount() {
        this.getWorkCenterList();
        this.getWorkshopList();
        this.getDispatchingList();
        this.getProModelList();
    }

    componentDidMount() {
        let csvDom=document.getElementById("productionTable")
        .getElementsByClassName("ant-table-body")[0];
        let btnWrap=document.getElementById("exportProductRep");
        const btn=TableExport(csvDom.children[0]);
        let children= btn.selectors[0].children[0];
        let childNodes=children.getElementsByTagName('button');
        childNodes[0].innerHTML="xlsx";
        childNodes[1].innerHTML="csv";
        childNodes[2].innerHTML="txt";
        // console.log("btn",children);
        // console.log("childNodes",childNodes);
        btnWrap.appendChild(children);
    }

    getProModelList() {
        const dat = {
            PageIndex: 0,
            PageSize: -1,
            TypeUUID: -1,
            KeyWord: ""
        }
        TPostData( '/api/TProduct/product_model', "ListActive", dat,
            ( res )=>{
                var list = [];
                console.log( "查询到产品型号列表", res );
                var data_list = res.obj.objectlist || [];
                // var totalcount = res.obj.totalcount;
                data_list.forEach(( item, index )=> {
                    list.push( {
                        key: index,
                        UUID: item.UUID,
                        Name: item.Name,
                        TypeUUID: item.TypeUUID,
                        Image: item.Image,
                        Number: item.ID,
                        SN: item.SN,
                        Version: item.Version,
                    } )
                } )
                this.setState({ProModelList:list});
            },
            ( error )=> {
                message.info( error );
            }
        )
    }

    getWorkshopList() {

        const dat = {
            PageIndex: 0, //分页：页序号，不分页时设为0
            PageSize: -1, //分页：每页记录数，不分页时设为-1
            FactoryUUID: -1, //所属工厂UUID，不作为查询条件时取值设为-1
            TypeUUID: -1, //类型UUID，不作为查询条件时取值设为-1
            KeyWord: ""
        }
        TPostData( '/api/TFactory/workshop', "ListActive", dat,
            ( res ) => {
                var list = [];
                console.log( "查询到车间列表", res );
                var data_list = res.obj.objectlist || [];
                data_list.forEach( ( item, index ) => {
                    list.push( {
                        key: index,
                        UUID: item.UUID,
                        Name: item.Name,
                        Number: item.ID
                    } )
                    this.setState( { workshopList: list } )
                } )
            },
            ( error ) => {
                message.info( error );
            }
        )

    }

    getWorkCenterList() {
        var dat = {
            'PageIndex': 0,
            'PageSize': -1,
            WorkshopUUID: 1,
            'TypeUUID': -1
        }
        TPostData( '/api/TProcess/workcenter', "ListActive", dat,
            ( res ) => {
                var list = [];
                var Ui_list = res.obj.objectlist || [];
                console.log( '查询到工作中心列表', Ui_list );
                Ui_list.forEach( ( item, index ) => {
                    /*list.push( {
                        key: index,
                        ID: item.ID,
                        UUID: item.UUID,
                        Name: item.Name,
                    } )*/
                    list.push( { Name: item.Name, UUID: item.UUID } );
                } )
                this.setState( { workCenterList: list } )
            },
            ( error ) => {
                message.info( error );
            }
        )
    }

    getDispatchingList() {
        var dat = {
            PageIndex: 0,
            PageSize: -1,
            LotUUID: -1, //生产订单UUID
            Status: -1, //生产调度单状态
            KeyWord: "" //模糊查询条件
        }
        // "ListJobTask"
        TPostData( '/api/TManufacture/manufacture', "ListLotJob", dat, ( res ) => {
            console.log( "查询到工单列表:", res );
            var list = [],
                Ui_list = res.obj.objectlist || [],
                totalcount = res.obj.totalcount;
            Ui_list.forEach( ( item, index ) => {
                list.push( {
                    key: index,
                    UUID: item.UUID, //加工订单UUID
                    BomUUID: item.BomUUID,
                    lotJobID: item.lotJobID ? item.lotJobID : `#${index}`,
                    FinishNumber: item.FinishNumber,
                    MoldModelUUID: item.MoldModelUUID,
                    PlanFinishDateTime: item.PlanFinishDateTime.slice(0,10),
                    FinishDateTime: item.FinishDateTime.slice(0,10),
                    PlanStartDateTime: item.PlanStartDateTime.slice(0,10) ,
                    StartDateTime: item.StartDateTime.slice(0,10),
                    PlanNumber: item.PlanNumber,
                    ProductModelID: item.ProductModelID,
                    ProductModelName: item.ProductModelName,
                    ProductModelSN: item.ProductModelSN,
                    ProductModelUUID: item.ProductModelUUID,
                    RejectNumber: item.RejectNumber,
                    Status: item.Status,
                    UUID: item.UUID,
                    UpdateDateTime: item.UpdateDateTime,
                    WorkstationID: item.WorkstationID,
                    WorkstationName: item.WorkstationName,
                    WorkstationUUID: item.WorkstationUUID
                } )

                this.setState( { dispatchingList: list } );
            } );
            /*const pagination = {
                ...seft.state.pagination
            }
            // Read total count from server;
            // pagination.total = data.totalCount;
            pagination.total = totalcount;
            callback(list, {
                total: pagination.total,
                nPageSize: 10
            })*/
        }, ( error ) => {
            message.info( error );
        } )
    }

    GetRandomInt(max,min){
        return parseInt(Math.random() * (max - min) + min);
    }

    generate(){
        let list=[],
            periodStart='',
            periodEnd='';
        for (let i=0;i<24;i++) {
            periodEnd=i+1;
            periodStart=i<10?'0'+i:i;
            periodEnd=periodEnd<10?'0'+periodEnd:periodEnd;
            list.push(
                {
                    key:i,
                    lotJobID:'Task001',
                    ProductModelName:"RCA音视频端子",
                    WorkstationName:"自动机001",
                    PlanNumber:213000,
                    FinishNumber:3457,
                    RejectNumber:153,
                    PlanStartDateTime:"2018/04/16",
                    StartDateTime:"2018/04/26",
                    PlanFinishDateTime:"2018/04/29",
                    FinishDateTime:"-",
                    status:this.GetRandomInt(1,11)
                }
            )
        }
        return list;
    }

    render() {
        const {Breadcrumb}=this.props;

        const columns = [
            {
                title: '工单号',
                dataIndex: 'lotJobID',
                key: 'lotJobID'
            }, {
                title: '产品名称',
                dataIndex: 'ProductModelName',
                key: 'BNum',
            },
            /*{
                title: '产品编码',
                dataIndex: 'ProductModelID',
                key: 'ProductModelIDe',
            },{
                title: '产品序列号',
                dataIndex: 'ProductModelSN',
                key: 'ProductModelSN'
            },*/
            {
                title: '工作中心',
                dataIndex: 'WorkstationName',
                key: 'WorkstationName',
            },
            /* {
                title: '工作中心编码',
                dataIndex: 'WorkstationID',
                key: 'WorkstationName',
            },*/
            {
                title: '计划产量',
                dataIndex: 'PlanNumber',
                type: 'sort'
            }, {
                title: '实际产量',
                dataIndex: 'FinishNumber',
                type: 'sort'
            }, {
                title: '次品数量',
                dataIndex: 'RejectNumber',
                type: 'sort'
            },
            /*{
              title: '计划交期',
              dataIndex: 'PlanDeliverDateTime',
              type: 'string'
            },
            {
              title: '实际交期',
              dataIndex: 'DeliverDateTime',
              type: 'string'
            },*/
            {
                title: '计划开始',
                dataIndex: 'PlanStartDateTime',
                type: 'string'
            }, {
                title: '实际开始',
                dataIndex: 'StartDateTime',
                type: 'string'
            }, {
                title: '计划完成',
                dataIndex: 'PlanFinishDateTime',
                type: 'string'
            }, {
                title: '实际完成',
                dataIndex: 'FinishDateTime',
                type: 'string'
            },
            /* {
                title: '更新时间',
                dataIndex: 'UpdateDateTime',
                key: 'UpdateDateTime',
            },*/
            {
                title: '工单状态',
                dataIndex: 'Status',
                key: 'status',
                render: (e1, record) => {
                    // console.log('任务状态',record);
                    let status='';
                    status=e1==0?(<span>生产取消(0)</span>):
                        e1==1?(<span>未派工(1)</span>):
                        e1==2?(<span>已派工(2)</span>):
                        e1==3?(<span>生产中(3)</span>):
                        e1==4?(<span>生产挂起(4)</span>):
                        e1==5?(<span>生产完成(5)</span>):
                        e1==6?(<span>生产中(6)</span>):
                        e1==9?(<span>生产挂起(9)</span>):
                        e1==10?(<span>已完成(10)</span>):
                        e1==11?(<span>暂停中(11)</span>):
                        <span>{e1}</span>
                    return  <span className="lotState">{status}</span>;
                }
            },
            /*{
                title: '操作',
                dataIndex: 'uMachineUUID',
                type: 'operate', // 操作的类型必须为 operate
                multipleType: "dispatch",
            }*/
        ];
        const productData=this.generate();

        return (
            <PageHeaderLayout title="生产报表" wrapperClassName="pageContent" BreadcrumbList={Breadcrumb.BCList}>
                <div className="cardContent">
                  <Card style={{marginBottom:20}}>
                      <Row gutter={16}>
                          <Col className="gutter-row" span={5}>
                              <div className="gutter-box"><span style={{ width: "40%" }}>车间:</span>
                                  <Select defaultValue="-1" style={{ width: "60%" }} onChange={this.handleChange}>
                                      <Option value="-1" key="all">全部</Option>
                                      {
                                          this.state.workshopList.map((item,index)=>{
                                                  return (<Option value={item.UUID} key={index}>{item.Name}</Option>)
                                          })
                                      }
                                  </Select>
                              </div>
                          </Col>
                          <Col className="gutter-row" span={5}>
                              <div className="gutter-box"><span style={{ width: "40%" }}>产品:</span>
                                  <Select defaultValue="-1" style={{ width: "60%" }} onChange={this.handleChange}>
                                      <Option value="-1" key="all">全部</Option>
                                      {
                                          this.state.ProModelList.map((item,index)=>{
                                                  return (<Option value={item.UUID} key={index}>{item.Name}</Option>)
                                          })
                                      }
                                  </Select>
                              </div>
                          </Col>
                          <Col className="gutter-row" span={5}>
                              <div className="gutter-box"><span style={{ width: "40%" }}>工作中心:</span>
                                  <Select defaultValue="-1" style={{ width: "60%" }} onChange={this.handleChange}>
                                      <Option value="-1" key="all">全部</Option>
                                      {
                                          this.state.workCenterList.map((item,index)=>{
                                                  return (<Option value={item.UUID} key={index}>{item.Name}</Option>)
                                          })
                                      }
                                  </Select>
                              </div>
                          </Col>
                          <Col className="gutter-row" span={5}>
                              <div className="gutter-box"><span style={{ width: "40%" }}>日期:</span>
                                  <DatePicker style={{ width: "60%" }} />
                              </div>
                          </Col>
                          <Col className="gutter-row" span={4}>
                              <div className="gutter-box">
                                  <Button type="primary" icon="search">查询</Button>
                              </div>
                          </Col>
                      </Row>
                  </Card>
                  <div  style={{margin:'20px 0',overflow:'hidden'}}>
                      <Form className="ProReMenu" style={{float:'right'}} layout="inline">
                          <FormItem  label="导出">
                              <div
                                  className="exportMenuWrap"
                                  id="exportProductRep"
                                  style={{display:'flex'}}/>
                          </FormItem>
                      </Form>
                  </div>
                  <div id="productionTable">
                      <Table
                          columns={columns}
                          dataSource={productData}
                          // dataSource={this.state.dispatchingList}
                          bordered={true}
                          size="small"
                      />
                  </div>
                </div>
            </PageHeaderLayout>
        )
    }
}
