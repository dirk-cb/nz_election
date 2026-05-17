
import { select } from "d3-selection";
import { getCurrentZoomFactor } from '../services';

export const calculateStrokeWidth = (zoom_factor: number, selected: boolean): number => {

    const STROKE_WIDTH_UNSELECTED_MOD = 0.00005;
    const STROKE_WIDTH_SELECTED_MOD = 1;

        
    let selected_calc = STROKE_WIDTH_SELECTED_MOD /(zoom_factor);
    let unselected_calc = STROKE_WIDTH_UNSELECTED_MOD * zoom_factor;

    if (selected) // Return 
        return Math.max(selected_calc, unselected_calc);
    else
        return unselected_calc;

};


export const updateHover = (path: any) => {

    const zoom = getCurrentZoomFactor(path.parentNode)
    select(path.parentNode).selectAll("path").attr("stroke",  "black").attr("stroke-width", 1 / zoom / 4);
    select(path).attr("stroke",  "black").attr("stroke-width", 1 / zoom ).raise().attr("_selected", "false")
    select(path).attr("_selected", "true")

}

export const updateClick = (path: any) => {

    const zoom = getCurrentZoomFactor(path.parentNode)
    select(path.parentNode).selectAll("path").attr("stroke",  "black").attr("stroke-width", 1 / zoom / 4);
    select(path).attr("stroke",  "black").attr("stroke-width", 1 / zoom ).raise().attr("_selected", "false").attr("_clicked", "true")
    select(path).attr("_clicked", "true")

}

export const removeHover = (path: any) => {

    const zoom = getCurrentZoomFactor(path.parentNode)

    select(path.parentNode)
        .selectAll("path")
        .attr("stroke",  "black")
        .attr("_selected", "false")
        .attr("stroke-width",  1 / zoom / 4    );
}
