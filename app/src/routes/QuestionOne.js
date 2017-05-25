import React from 'react';
import { connect } from 'dva';
import TableDiagram from '../components/TableDiagram';

class QuestionOne extends React.Component {
  render() {
    return (
      <div style={{ height: '100vh', flex: 1, display: 'flex', alignItems: 'center' }}>
        <TableDiagram
          dataSource={this.props.dataSource}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ file }) => ({
  dataSource: file.tableDataSource,
})

export default connect(mapStateToProps)(QuestionOne);