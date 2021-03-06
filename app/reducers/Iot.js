import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
const Mock = require('mockjs');
var Random = Mock.Random;
// import moment from 'moment'
import { message } from 'antd'

const IotListState = {
  bomlist: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}

export const iot_list_data = handleActions({
  'request iot list'(state, action) {
    return { ...state, loading: true }
  },
  'receive iot list'(state, action) {
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


}, IotListState)
