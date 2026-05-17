import { Bar } from "react-chartjs-2";
import { type ChartOptions } from 'chart.js';

export const CustomerBar = ({data, title, labelX, labelY}:{data: any, title: string, labelX:string, labelY:string}) => {

    const options: ChartOptions<"bar"> = {
        layout: {
            padding: 10
        },
        responsive: true,
        plugins: {
            legend: {
            display: false,
            },
            title: {
                display: true,
                text: title,
                font: { size: 18, weight:"bold" }
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: labelX,
                    font: { size: 16, weight:"bold"  }
                }
            },
            y: {
                title: {
                    display: true,
                    text: labelY,
                    font: { size: 16, weight:"bold"  }
                }
            }
        }
    }


    return (
        <Bar 
        data={data} 
        options={options}
        className="bg-white rounded-md shadow-xs/30 mb-2"
        />

    ) 
    
}