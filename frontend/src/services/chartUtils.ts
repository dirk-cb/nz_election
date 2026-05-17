import party_vote from "../data/party_vote.json"
import census from "../data/census.json"
import info from "../data/electorateInfo.json"

const ethnicityOrder: Record<string, number> = {
    "European": 0,
    "Māori Ethnicity": 1,
    "Pacific Peoples": 2,
    "Asian": 3,
    "MENA": 4,
    "Other Ethnicity": 5
};

const colours = [
    "#1293e9",
    "#d40633",
    "#FFCE56",
    "#28d311",
    "#e615e6",
    "#8b8b8b"
];


/* Used to get the profile data for the electorate */
export const getProfileData = (electorate: string) => {

    

    // Reduce function to create the labels and the data for age brackets
    const electorateFilteredData = census
        .filter((r)=>r.Electorate === electorate && r.Category.slice(-5) === "years" && r.Stat === "Total")
        .reduce((x: any, r: any)=> {
            return {
                labels:[...x.labels, r.Category.slice(0, -6)]
                , datasets: [{
                    ...x.datasets[0]
                    , data: [...x.datasets[0].data, r.Value]
                    , backgroundColor: "#3770c5"
                }]
            }
        }
        , {
            labels:[],
            datasets: [{label: "Age Distribution", data: []}],
        });

    // Reduce function to create the labels and the data for ethnicity
    const ethnicityData = census.filter((r)=> r.Electorate === electorate && r.Census === "Ethnicity" && r.Stat === "Total")
        .sort((x,y) => (ethnicityOrder[x.Category] ?? 0) - (ethnicityOrder[y.Category] ?? 0))
        .reduce((x: any, r: any)=> {
            return {
                labels:[...x.labels, r.Category]
                , datasets: [{
                    ...x.datasets[0]
                    , data: [...x.datasets[0].data, r.Value]
                }] 
            }
        }
        , {
            labels:[],
            datasets: [{label: "Ethnicity", data: [], backgroundColor: colours}]
        });

    const medianAge = census.find((r)=>r.Electorate=== electorate && r.Category ==="Median age")?.Value;
    const medianHouseholdIncome = census.find((r)=>r.Electorate=== electorate && r.Category ==="Median Household Income")?.Value;
    const pctUnemployed = census.find((r)=>r.Electorate=== electorate && r.Category ==="Unemployed" && r.Stat == "Percent")?.Value;

    return {
        "AgeDist": electorateFilteredData
        , "MedianAge": medianAge
        , "MedianHouseholdIncome": medianHouseholdIncome
        , "PctUnemployed": pctUnemployed
        , "Ethnicity": ethnicityData
    };

}

export const getScatterData = (voterDemographic: string, censusDemographic: string) => {
    

    const colourMaps = {
                "Urban": "#ff0000"
                , "Rural": "#00a2ff"
                , "Mixed" : "#24d800"
                , "Maori":  "#ffbb00"
                , "None":  "#000000"
            }


    let electorateData = party_vote
        .filter((r)=>r.Party == voterDemographic && r.Stat == "Percent")
        .map( (r)=>{


            const censusMatch = census.find((x)=>x.Category == censusDemographic && (x.Stat == null || x.Stat == "Percent") && x.Electorate == r.Electorate)?.Value || 0;
            const infoMatch = info.find((x)=>x.Electorate == r.Electorate)?.Type || "None"

            return {
                label: r.Electorate
                , y: censusMatch 
                , x: r.Votes
                , type: infoMatch
                , color: (colourMaps as any)[infoMatch]
            }
        }


        )


    const n = electorateData.length;
    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumX2 = 0;

    electorateData.forEach((r)=>{
        sumX += r.x;
        sumY += r.y;
        sumXY += r.x * r.y;
        sumX2 += r.x * r.x;
    })

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const minX = Math.min(...electorateData.map(p => p.x));
    const maxX = Math.max(...electorateData.map(p => p.x));

    electorateData = electorateData.reduce((prev, curr)=> {

            if (!prev[curr.type]) prev[curr.type] = [];

            prev[curr.type].push(curr);

            return prev

        }, ({} as any));

    const finalData = Object.entries(electorateData).map((r)=>{

        return {
            label: r[0]
            , data:r[1]
            , radius: 4
            , hoverRadius: 6
            , backgroundColor: (colourMaps as any)[r[0]]
        }


    });



    const trend = {
        type: 'line',
        label: 'Trend',
        data: [
            { x: minX, y: slope * minX + intercept },
            { x: maxX, y: slope * maxX + intercept },
        ],
        borderColor:  "#686868",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0,
        fill: false,
        legend: false

      }

    return finalData.concat([trend as any]) //+ trend;

}
