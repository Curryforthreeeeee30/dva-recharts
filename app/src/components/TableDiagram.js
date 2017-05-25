import { Table, Alert } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  }, {
    title: 'Number of IOs',
    dataIndex: 'lineCount',
    key: 'lineCount',
  }, {
    title: 'IOPS',
    dataIndex: 'iops',
    key: 'iops',
  }, {
    title: 'RD/WT Ratio',
    dataIndex: 'rdOverwt',
    key: 'rdOverwt',
  }, {
    title: 'Req. Size',
    dataIndex: 'reqSize',
    key: 'reqSize',
  }, {
    title: 'Req. Average',
    dataIndex: 'reqAverage',
    key: 'reqAverage',
  }
];

function TableDiagram({ dataSource }) {
  return (
    <Table
      bordered
      columns={columns}
      rowKey={(record) => (record.name)}
      dataSource={dataSource}
      title={() => <h1>这是第一、三、五题要求的表格</h1>}
      footer={() => '数据到这就完啦'}
    />
  )
}

export default TableDiagram;