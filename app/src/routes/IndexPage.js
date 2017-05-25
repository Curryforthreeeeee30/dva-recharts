import React from 'react';
import styles from './IndexPage.css';
import Sider from '../components/Sider';
import { Spin } from 'antd';
import { connect } from 'dva';

function IndexPage({ children, loading }) {
  return (
    <Spin
      spinning={loading}
      tip='获取数据中...'
    >
      <div className={styles.layout}>
        <Sider />
        {children}
      </div>
    </Spin>
  );
}

IndexPage.propTypes = {
};

const mapStateToProps = ({ loading }) => ({
  loading: loading.global,
});

export default connect(mapStateToProps)(IndexPage);
