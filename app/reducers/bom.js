import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
const Mock = require('mockjs');
var Random = Mock.Random;
// import moment from 'moment'
import { message } from 'antd'

const BOMListState = {
  bomlist: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}

export const BomList = handleActions({
  'request bom list'(state, action) {
    return { ...state, loading: true }
  },
  'receive bom list'(state, action) {
    const { req, res } = action.payload
    let list=[];
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    else{
      console.log('receive bom list',res)
        if(!gconfig.isDemo_dev){
            return { obj:res.obj.objectlist, loading: false }
        }
        else{
            list=res.objectlist.map((item,index)=>{
                return{
                    UUID:item.UUID,
                    key:index,
                    Name:'物料_'+index,
                    // Name:Mock.mock('@cname')
                    ID: "mtrl_"+index,
                    Version: "v~1.0.1",
                    ProductModelID: Mock.mock('@word'),
                    ProductModelSN: Mock.mock('@word'),
                    ProductModelName: '-',
                    Desc: '-',
                    Note: '-',
                    UpdateDateTime: Random.datetime(),
                    Status: Mock.mock('@natural(0, 3)'),
                }
            })
            res.objectlist=list;
            res.totalcount=Mock.mock('@natural(0, 65)');
            return { bomlist:list,total:res.totalcount, loading: false }
        }
    }
  },

}, BOMListState)

const BOMItemListState = {
  bomItemList: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}

export const bomItem_list_data = handleActions({
  'request bom item list'(state, action) {
    return { ...state, loading: true }
  },
  'receive bom item list'(state, action) {
    const { req, res } = action.payload
    let list=[];
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    else{
        if(!gconfig.isDemo_dev){
            return { obj:res.obj.objectlist, loading: false }
        }
        else{
            list=res.objectlist.map((item,index)=>{
                return{
                    UUID:item.UUID,
                    index:index,
                    Name:Mock.mock('@cname')
                }
            })
            res.objectlist=list;
            res.totalcount=Mock.mock('@natural(0, 65)');
            return { workshoplist:list,total:res.totalcount, loading: false }
        }
    }
  },


}, BOMListState)
