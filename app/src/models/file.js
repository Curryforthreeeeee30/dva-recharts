import request from '../utils/request';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'file',

  state: {
    tableDataSource: [],
    ioCountByTime: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch' });
        }
        if (pathname === '/sub1') {
          dispatch({ type: 'generateTable' });
        }
        if (pathname === '/sub2' || pathname === '/sub3') {
          dispatch({ type: 'generateIoCountByTime' });
        }
      });
    },
  },

  effects: {
    *init({ payload }, { call, put, throttle }) {
      yield throttle(600 * 1000, 'file/fetch', function *() {
        yield put({ type: 'fetch' });
      });
    },

    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(request, 'http://localhost:8888', { method: 'GET'});
      if (data.length > 0) {
        yield put({ type: 'save' , payload: { dataSource: data }});
        // yield put({ type: 'generateTable' });
        // yield put({ type: 'generateIoCountByTime' });
      }
    },

    *generateTable({ payload }, { call, put, select }) {
      const { dataSource } = yield select(state => state.file);
      const tableDataSource = [];
      dataSource.map(data => tableDataSource.push({
        name: data.name,
        reqAverage: parseInt(data.partOne.reqSize / data.partOne.lineCount),
        ...data.partOne,
      }));
      yield put({ type: 'save', payload: { tableDataSource }});
    },

    *generateIoCountByTime({ payload }, { call, put, select }) {
      const { dataSource } = yield select(state => state.file);
      const ioCountByTime = [];
      dataSource.map(data => ioCountByTime.push({
        name: data.name,
        ...data.partTwo,
      }));
      const finalData = [];
      for (let i = 0, len = ioCountByTime.length; i < len; i += 3) {
        finalData.push(ioCountByTime.slice(i, i + 3));
      }
      yield put({ type: 'save', payload: { ioCountByTime: finalData }});
    },

    *routerChange({ payload }, { call, put }) {
      yield put(routerRedux.push(payload.pathname));
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
