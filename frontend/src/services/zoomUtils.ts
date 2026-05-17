import { select } from "d3-selection";
import { zoom, zoomTransform } from "d3-zoom";


export const defineZoom = (mapref: any, gref: any) => {

    const svg = select(mapref);
    const g = select(gref);
    const zoomBehavior = zoom()
        .scaleExtent([1, 200]) 
        .on('zoom', (event) => {
            g.attr("transform", event.transform);

            // Finally fixed the Firefox glitch - need to apply to Census Vis
            const node = gref as SVGGElement;
            node.style.display = 'none';
            node.getBoundingClientRect();
            node.style.display = '';

            select(mapref).selectAll("path")
                .filter(function () {return select(this).attr("_selected") === "false";})
                .attr("stroke-width",  1 / getCurrentZoomFactor(mapref) / 4);
            
            select(mapref).selectAll("path")
                .filter(function () {return select(this).attr("_selected") === "true";})
                .attr("stroke-width",  1 / getCurrentZoomFactor(mapref));

        })
    svg.call((zoomBehavior as any));

}

export const getCurrentZoomFactor = (mapref: any) => {
    return zoomTransform(mapref).k;
}