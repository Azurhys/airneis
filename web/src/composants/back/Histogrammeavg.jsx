import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#8dd1e1", "#a4de6c", "#d0ed57"]; // Defined colors

const HistogrammeAvg = ({ data, granularity }) => {
  return (
    <BarChart
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(data[0]).filter(key => key !== "name").map((key, index) => {
        return <Bar key={key} dataKey={key} stackId="a" fill={colors[index % colors.length]} />;
      })}
    </BarChart>
  );
};

export default HistogrammeAvg;
