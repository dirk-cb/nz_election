
import party_vote from "../data/party_vote.json";
import electorate_vote from "../data/electorate_vote.json";
import census from "../data/census.json";

import 'd3-transition';
import { select } from "d3-selection";
import { scaleSequential } from "d3-scale";
import { interpolateBlues, interpolateReds, interpolateGreens, interpolateGreys } from "d3-scale-chromatic";
import { interpolateHsl } from "d3-interpolate";
import { min, max } from "d3-array";
import { easeLinear } from "d3-ease";
import { color, rgb, type RGBColor } from "d3-color";

// Pre-calculating for efficency so when React updates
const calculatePartyVoteResults = () => {

    const data = party_vote.reduce((jsonmap, row) =>{

        if (!jsonmap[row.Electorate]) jsonmap[row.Electorate] = {};
        if (!jsonmap[row.Electorate][row.Party]) jsonmap[row.Electorate][row.Party] = {};
        jsonmap[row.Electorate][row.Party][row.Stat] = row.Votes;
        return jsonmap;
    }, {} as any);

    return data;
}

const PartyColorMap: Record<string, string> = {
            National:"darkblue"
            ,Labour: "red"
            ,"NZ First": "black"
            ,ACT:"yellow"
            ,Greens: "green"
            ,Other: "gray"
            ,TOP: "cyan"
            ,Māori: "brown"
    }


export const PartyVoteResultsTableFormat = (()=>{





    let data = party_vote.reduce((jsonmap, row) =>{

        if (!jsonmap[row.Electorate]) jsonmap[row.Electorate] = {};
        if (!jsonmap[row.Electorate][row.Party]) jsonmap[row.Electorate][row.Party] = {};
        jsonmap[row.Electorate][row.Party][row.Stat] = row.Votes;
        return jsonmap;
    }, {} as any
    );
    
    // Creating rows
    Object.keys(data).forEach(
        (r) =>{
            data[r] = Object.entries(data[r]).map((x: any)=>{
                
                return {
                    "Party":x[0]
                    //, ...(x[1] as any)
                    , "Percent":x[1].Percent
                    , "Count":x[1].Total
                    , "Colour":PartyColorMap[x[0]]
                }
            
            }).sort((a,b)=> {

                if (a.Party == "Total") return 1;
                if (b.Party == "Total") return -1;
                
                return (b.Count - a.Count);

            })
        }
    )

    return data;
})();



export const ElectorateVoteResultsTableFormat = (()=>{

    let data = electorate_vote.reduce((jsonmap, row) =>{

        if (!jsonmap[row.Electorate]) jsonmap[row.Electorate] = {};
        if (!jsonmap[row.Electorate][row.Party]) jsonmap[row.Electorate][row.Party] = {};
        jsonmap[row.Electorate][row.Party][row.Stat] = row.Votes;
        return jsonmap;
    }, {} as any
    );
    
    // Creating rows
    Object.keys(data).forEach(
        (r) =>{
            data[r] = Object.entries(data[r]).map((x: any)=>{
                
                return {
                    "Party":x[0]
                    //, ...(x[1] as any)
                    , "Percent":x[1].Percent
                    , "Count":x[1].Total
                    , "Colour":PartyColorMap[x[0]]
                }
            
            }).sort((a,b)=> {

                if (a.Party == "Total") return 1;
                if (b.Party == "Total") return -1;
                
                return (b.Count - a.Count);

            })
        }
    )

    return data;

})()





export const PoliticalPartyList = ["National", "Labour", "Greens", "Māori", "ACT", "NZ First", "TOP", "Other"]

//
const calculateBivarDemographic2Options = () => {
    // Filter out years
    const optionsData = [...new Set(census.map(r => r.Category))]
        .filter((r)=>r!=="Total" && r!=="Total stated" && !r.includes("years"))
        .map((r)=>{
            if (r.includes("Mean") || r.includes("Median")) {
                return {value:r, label: r, isPct: false}
            }
            return {value:r, label:"% " + r, isPct: true}
        }).sort((r1, r2)=>{

            if (!r1.isPct) return -1;
            if (!r2.isPct) return 1;
            return 0;
        });

    // Temp fix - need to fix data cleaning logic
    
    return optionsData;
}


const calculateElectorates = () => {

    const optionsData = [...new Set(census.map(r => r.Electorate))].map((r)=>{
        return {value:r, label:r}
    })

    return optionsData
}


export const PartyVoteResults = calculatePartyVoteResults();
export const BivarDemographic2Options = calculateBivarDemographic2Options();
export const ElectorateList = calculateElectorates();




export const updateDisplay = (g : SVGGElement, filterMapType: string, demo: string, biVarDemos: any) => {

    const partyColourSchemes: Record<string, (t: number) => string> = {
        "National": interpolateBlues
        , "Labour": interpolateReds
        , "Greens": interpolateGreens
        , "Māori": interpolateHsl("#ffffff", "#973000") // Custom for Maori
        , "ACT": interpolateHsl("#ffffff", "#e0b805") // Custom for ACT
        , "NZ First": interpolateGreys
        , "TOP": interpolateHsl("#ffffff", "#00ccbb") // Custom for TOP
        , "Other": interpolateHsl("#ffffff", "#e005a9")

    }
    // Determine which to display

    if (filterMapType === "Demographic") {

        const colorScheme = partyColourSchemes[demo] || interpolateHsl("#ffffff", "#1b326e");
        let minV: number;
        let maxV: number;
        let colorScale;
        let findRow;
        let settings;

        // Whole numbers not percent demographics
        if (demo.includes("Mean") || demo.includes("Median")) {
            // Min max an scheme
            minV = min(census.filter((row)=> row.Category === demo), (d) => d.Value) || 0;
            maxV = max(census.filter((row)=> row.Category === demo), (d) => d.Value) || 100;
            colorScale = scaleSequential(colorScheme).domain([minV, maxV]);
            findRow = (name: string) => census.find((row)=> row.Electorate == name && row.Category === demo)?.Value;
            settings = {
                type: "Normal",
                min: minV,
                max: maxV,
                name: demo,
                colourScale: colorScale,
                notPct: true,
                isMoney: demo.includes("Income")
            }
        }

        // Normal demographics w/ %
        else if (!PoliticalPartyList.includes(demo)) {
            minV = min(census.filter((row)=>row.Stat === "Percent" && row.Category === demo), (d) => d.Value) || 0;
            maxV = max(census.filter((row)=>row.Stat === "Percent" && row.Category === demo), (d) => d.Value) || 100;
            colorScale = scaleSequential(colorScheme).domain([minV, maxV]);
            findRow = (name: string) => census.find((row)=> row.Electorate == name && row.Stat === "Percent" && row.Category === demo)?.Value;
            settings = {
                type: "Normal",
                min: minV,
                max: maxV,
                name: demo,
                colourScale: colorScale,
                isMoney: false
            }
        }
        else {

            minV = min(party_vote.filter((row)=>row.Stat === "Percent" && row.Party === demo), (d) => d.Votes) || 0;
            maxV = max(party_vote.filter((row)=>row.Stat === "Percent" && row.Party === demo), (d) => d.Votes) || 100;
            colorScale = scaleSequential(colorScheme).domain([minV, maxV]);
            findRow = (name: string) => party_vote.find((row)=>row.Electorate == name && row.Stat === "Percent" && row.Party === demo)?.Votes;
            settings = {
                type: "Normal",
                name: demo + " voters",
                min: minV,
                max: maxV,
                colourScale: colorScale,
                isMoney: false
            }
        }

        select(g)
            .selectAll("path")
            .raise()
            .transition()
            .duration(200)
            .ease(easeLinear)
            .attr("fill", function(){
                const name = (this as any)?.getAttribute("data-demo");
                const row = findRow(name)
                const colY = row ? colorScale(row) : colorScale(0);
                return colY;
        }).attr("data-val", function(){
                const name = (this as any)?.getAttribute("data-demo");
                const row = findRow(name)
                return row ?? null;
        });

        return settings;

    } else if (filterMapType === "Bivariate Analysis") {


        // Political Party
        const demoX = biVarDemos.demographic1;
        const colorSchemeX = interpolateHsl("#ffffff", "#00c2c2"); // Custom for Other
        const minX = min(party_vote.filter((row)=>row.Stat === "Percent" && row.Party === demoX), (d) => d.Votes);
        const maxX = max(party_vote.filter((row)=>row.Stat === "Percent" && row.Party === demoX), (d) => d.Votes);
        const colorScaleX = scaleSequential(colorSchemeX).domain([minX || 0, maxX || 100]);

        // Demographic 2
       
        const demoY = biVarDemos.demographic2;
        const isWhole = demoY.includes("Mean") || demoY.includes("Median");
        const colorSchemeY = interpolateHsl("#ffffff", "#c400aa"); // Custom for Other
        const minY = min(census.filter((row)=>(isWhole || row.Stat === "Percent") && row.Category === demoY), (d) => d.Value);
        const maxY = max(census.filter((row)=>(isWhole || row.Stat === "Percent") && row.Category === demoY), (d) => d.Value);
        const colorScaleY = scaleSequential(colorSchemeY).domain([minY || 0, maxY || 100]);

        select(g)
            .selectAll("path")
            .raise()
            .transition()
            .duration(200)
            .ease(easeLinear)
            .attr("fill", function(){

                const name = (this as any)?.getAttribute("data-demo");

                const rowX = party_vote.find((row)=>{
                    return row.Electorate == name 
                    && row.Stat === "Percent" 
                    && row.Party === demoX
                })

                const rowY = census.find((row)=>{
                    return row.Electorate == name 
                    && (isWhole || row.Stat === "Percent")
                    && row.Category === demoY
                })


                if (rowX?.Votes && rowY?.Value) {


                    const colX = (color(colorScaleX(rowX.Votes)) as RGBColor)
                    const colY = (color(colorScaleY(rowY.Value)) as RGBColor)
                    
                    return rgb((colX.r + colY.r) / 2,(colX.g + colY.g) / 2,(colX.b + colY.b) / 2).formatHex();
                }

                return colorScaleX(0);


            });


        const colorSchemeMix = (x: number, y: number) => {
            const colX = (color(colorScaleX(x)) as RGBColor)
            const colY = (color(colorScaleY(y)) as RGBColor)

            return rgb((colX.r + colY.r) / 2,(colX.g + colY.g) / 2,(colX.b + colY.b) / 2).formatHex();
        }


        return {
            type: "Bivariate",
            X:demoX,
            Y:demoY,
            minX: minX,
            maxX: maxX,
            minY: minY,
            maxY: maxY,
            notPct: isWhole,
            isMoney: demoY.includes("Income"),
            colourScale: colorSchemeMix
        }
    }

}