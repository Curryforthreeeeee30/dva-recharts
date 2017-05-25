import React from 'react';
import { connect } from 'dva';
import LineDiagram from '../components/LineDiagram';
import { Pagination } from 'antd';

class QuestionThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  render() {
    const { dataSource } = this.props;
    const { current } = this.state;

    return (
      <div style={{ height: '100vh', flex: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {
          dataSource.length > 0 && dataSource[current - 1].map(data => (
            <LineDiagram {...data} key={data.name} />
          ))
        }
        <Pagination
          onChange={(page) => {
            this.setState({
              current: page,
            });
          }}
          current={current}
          pageSize={1}
          total={dataSource.length}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ file }) => ({
  dataSource: file.ioCountByTime,
});

export default connect(mapStateToProps)(QuestionThree);