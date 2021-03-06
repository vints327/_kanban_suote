import {
    createAction,
} from 'redux-actions'
import {
    factory,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'


export const requestFactoryType = createAction( 'request factory type list' );
export const recevieFactoryType = createAction( 'receive factory type list' );
export const fetchFactoryTypeList = !gconfig.isDemo_dev ? createAjaxAction(
    factory.factory_type,
    requestFactoryType,
    recevieFactoryType,
) : fakeAjaxAction(
    factory.factory_type,
    requestFactoryType,
    recevieFactoryType,
)

export const requestWorkshopList = createAction( 'request workshop list' );
export const recevieWorkshopList = createAction( 'receive workshop list' );
export const fetchWorkshopList = !gconfig.isDemo_dev ? createAjaxAction(
    factory.workshop,
    requestWorkshopList,
    recevieWorkshopList,
) : fakeAjaxAction(
    factory.workshop,
    requestWorkshopList,
    recevieWorkshopList,
)

export const requestWorkshopType = createAction( 'request workshop type list' );
export const recevieWorkshopType = createAction( 'receive workshop type list' );
export const fetchWorkshopTypeList = !gconfig.isDemo_dev ? createAjaxAction(
    factory.workshop,
    requestWorkshopType,
    recevieWorkshopType,
) : fakeAjaxAction(
    factory.factory,
    requestWorkshopType,
    recevieWorkshopType,
)
