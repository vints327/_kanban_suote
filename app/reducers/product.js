import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { fn_mes_array } from 'functions'
import { message } from 'antd'

const Mock = require( 'mockjs' );

const { Random } = Mock;
// import moment from 'moment'

const initCategoryState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
export const productCategory = handleActions( {
    'request product category list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive product category list'( state, action ) {
        const { req, res } = action.payload
        let list = [];
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        if ( !gconfig.isDemo_dev ) {
            const { data } = res;
            const list = fn_mes_array.addKey( res.data.list, 'key' );
            const pagenation = {
                page: data.page,
                size: data.size,
                total: data.total,
            }
            return {
                ...state,
                list,
                loading: false,
                ...pagenation,
            }
        }

        list = res.objectlist.map( ( item, index ) => ( {
            UUID: item.UUID,
            key: index,
            TypeUUID: item.TypeUUID,
            Image: item.Image,
            Name: `产品_${index}`,
            Number: `product_${index}`,
            SN: Mock.mock( '@word' ),
            Version: 'Version~',
            Desc: '~',
            UpdateDateTime: Mock.mock( '@datetime' ),
        } ) )
        res.objectlist = list;
        res.totalcount = Mock.mock( '@natural(0, 65)' );
        return { list: list, total: res.totalcount, loading: false }
    },
    'success add product category'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }
        if ( !gconfig.isDemo_dev ) {
            const { data } = res;
            const newObj = data.obj;
            newObj.key = data.uuid;
            state.list.push( newObj )
            console.log( '成功添加', res )
            // const list = fn_mes_array.addKey( res.data.list, 'key' );
            const pagenation = {
                page: data.page,
                size: data.size,
                total: data.total,
            }
            return {
            ...state, loading: false, ...pagenation,
            }
        }
        return { ...state, loading: false }
    },
    'success update product category'( state, action ) {
        const { req, res } = action.payload
        const u_item = res.data;
        console.log( '成功更新', res );
        if ( hasResponseError( res ) ) {
          message.error( res.msg )
          return { ...state, loading: false }
        }
        const list = state.list.map( ( item ) => {
          // console.log( 'item', item )
          if ( item.uObjectUUID === u_item.uuid ) {
            Object.assign( item, u_item.obj )
          }
          return item;
        } );
        return { ...state, list, loading: false }
    },
    'success delete product category'( state, action ) {
        const { req, res } = action.payload;
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }
        console.log( '删除成功！', res );
        message.success( '删除成功！' );
        const list = state.list.filter( item => ( item.uObjectUUID != res.data.uuids[0] ) )
        state.list = list;
        return { ...state }
    },


}, initCategoryState )


const initListState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
export const productList = handleActions( {
    'request product model list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive product model list'( state, action ) {
        const { req, res } = action.payload
        let list = [];
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        if ( !gconfig.isDemo_dev ) {
            const { data } = res;
            const list = fn_mes_array.addKey( res.data.list, 'key' );
            const pagenation = {
                page: data.page,
                size: data.size,
                total: data.total,
            }
            return {
                ...state,
                list,
                loading: false,
                ...pagenation,
            }
        }
        // console.log( 'resive product list', res );
        list = res.objectlist.map( ( item, index ) => ( {
            UUID: item.UUID,
            key: index,
            TypeUUID: item.TypeUUID,
            Image: item.Image,
            Name: `产品_${index}`,
            Number: `product_${index}`,
            SN: Mock.mock( '@word' ),
            Version: 'Version~',
            Desc: '~',
            UpdateDateTime: Mock.mock( '@datetime' ),
        } ) )
        res.objectlist = list;
        res.totalcount = Mock.mock( '@natural(0, 65)' );
        return { list: list, total: res.totalcount, loading: false }
    },
    'success add product model'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }
        if ( !gconfig.isDemo_dev ) {
            const { data } = res;
            const newObj = data.obj;
            newObj.key = data.uuid;
            state.list.push( newObj )
            console.log( '成功添加', res )
            // const list = fn_mes_array.addKey( res.data.list, 'key' );
            const pagenation = {
                page: data.page,
                size: data.size,
                total: data.total,
            }
            return {
            ...state, loading: false, ...pagenation,
            }
        }
        return { ...state, loading: false }
    },
    'success update product model'( state, action ) {
        const { req, res } = action.payload
        const u_item = res.data;
        console.log( '成功更新', res );
        if ( hasResponseError( res ) ) {
          message.error( res.msg )
          return { ...state, loading: false }
        }
        const list = state.list.map( ( item ) => {
          // console.log( 'item', item )
          if ( item.uObjectUUID === u_item.uuid ) {
            Object.assign( item, u_item.obj )
          }
          return item;
        } );
        return { ...state, list, loading: false }
    },
    'success delete product model'( state, action ) {
        const { req, res } = action.payload;
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }
        console.log( '删除成功！', res );
        message.success( '删除成功！' );
        const list = state.list.filter( item => ( item.uObjectUUID != res.data.uuids[0] ) )
        state.list = list;
        return { ...state }
    },


}, initListState )
