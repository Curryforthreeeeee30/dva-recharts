import React from 'react';
import { connect } from 'dva';
import AreaDiagram from '../components/AreaDiagram';
import { Pagination } from 'antd';

class QuestionTwo extends React.Component {
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
            <AreaDiagram {...data} key={data.name} />
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

export default connect(mapStateToProps)(QuestionTwo);