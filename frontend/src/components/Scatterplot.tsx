import { Scatter } from "react-chartjs-2";
import { type ChartOptions } from 'chart.js';

export const Scatterplot = ({title, labelX, labelY, data}: {title:string,labelX:string, labelY:string, data:any}) => {

    const options: ChartOptions<"scatter"> = {
        layout: {
            padding: 10
        },
        responsive: true,
        plugins: {
            legend: {
            display: true,
            position: "top",
            labels: {
                filter: (r) => r.text !== 'Trend'
            }

            
            },
            title: {
                display: true,
                text: title,
                font: { size: 24, weight:"bold" }
            },
            tooltip:{
                callbacks:{
                    label: (ctx)=>(ctx?.raw as any)?.label
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: labelX,
                    font: { size: 16, weight:"bold"  }
                }
                , ticks: {
                    callback: (r)=> r.toLocaleString() + "%"
                }
            },
            y: {
                title: {
                    display: true,
                    text: labelY,
                    font: { size: 16, weight:"bold"  }
                }
                , ticks: {
                    callback: (r)=> r.toLocaleString() + (labelY.slice(0,1) == "%" ? "% " : "") 
                }
            }
        }
    }

    const formattedData = {
        datasets: data
    }


    return (
        <Scatter 
        key="scatter-chart"
        data={formattedData} 
        options={options}
        className="bg-white rounded-md"
        />

    ) 
    
}