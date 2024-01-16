import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({ data }: any) => {
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
