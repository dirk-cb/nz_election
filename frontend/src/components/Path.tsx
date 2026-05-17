
import { pathGenerator } from '../services/geoMapUtils';
import { memo } from "react";



type Path = {
  region: any;
} & React.SVGProps<SVGPathElement>;


export const Path = memo(({region, ...props}: Path) => {
    

    return (
        <path 
            //className="transition-[fill] duration-[1000ms] ease-in-out"
            cursor="pointer"
            strokeWidth="0.2"
            stroke="black"
            fill="white"
            data-demo={region.properties.name}
            key={region.id}
            d={pathGenerator(region) ?? undefined}
            { ...props }           
        />
    )

});