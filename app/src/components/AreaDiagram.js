import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function AreaDiagram(props) {
  if (!props) {
    return null;
  }

  return (
    <div>
      <AreaChart width={1200} height={300} data={props.changeByTime}
            margin={{top: 50, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="period"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Area dataKey="readCount" fill="#8884d8" stroke="#8884d8" />
       <Area dataKey="writeCount" fill="#82ca9d" stroke="#82ca9d" />
      </AreaChart>
      <div style={{ textAlign: 'center', fontSize: 14}}>以上数据日期:{new Date((props.changeByTime[0].start) * 1000).toLocaleDateString()}</div>
      <div style={{ textAlign: 'center', fontSize: 16}}>文件名:{props.name}</div>
    </div>
  );
}

export default AreaDiagram;
