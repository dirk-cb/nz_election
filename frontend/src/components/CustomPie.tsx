import { Pie } from "react-chartjs-2";
import { type ChartOptions } from 'chart.js';

export const CustomPie = ({data, title}:{data: any, title: string}) => {

    const options: ChartOptions<"pie"> = {
        layout: {
            padding: 10
        },
        responsive: true,
        plugins: {
            legend: {
            display: true,
            },
            title: {
                display: true,
                text: title,
                font: { size: 18, weight:"bold" }
            }
        }
    }


    return (
        <Pie 
        data={data} 
        options={options}
        className="bg-white rounded-md shadow-xs/30"
        />

    ) 
    
}