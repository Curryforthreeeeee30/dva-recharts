import React from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
const Item = Menu.Item;

class Sider extends React.Component {
  state = {
    current: '',
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
    this.props.dispatch({
      type: 'file/routerChange',
      payload: {
       pathname: e.key
      }
    });
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 200, marginRight: 50 }}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <Item key="sub1">
          <span><Icon type="appstore" />Table</span>
        </Item>
        <Item key="sub2">
          <span><Icon type="area-chart" />Area Chart</span>
        </Item>
        <Item key="sub3">
          <span><Icon type="line-chart" />Line Chart</span>
        </Item>
        <Item key="/">
          <span><Icon type="home" />Home</span>
        </Item>
      </Menu>
    );
  }
}

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(Sider);