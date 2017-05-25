import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

function LineDiagram(props) {
  if (!props) {
    return null;
  }

  return (
    <div>
      <LineChart width={1200} height={300} data={props.changeByTime}
            margin={{top: 50, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="period"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line dataKey="iops" fill="rgb(143, 201, 251)" stroke="rgb(143, 201, 251)" />
      </LineChart>
      <div style={{ textAlign: 'center', fontSize: 14}}>以上数据日期:{new Date((props.changeByTime[0].start) * 1000).toLocaleDateString()}</div>
      <div style={{ textAlign: 'center', fontSize: 16}}>文件名:{props.name}</div>
    </div>
  )
}

export default LineDiagram;