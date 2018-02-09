import seriesOrderingEnum from "../enums/seriesOrderingEnum";

module.exports = {
    tables: [
        {   
            name: 'Red',
            color:"#f00",
            configuration: {
                lowerBound: 8,
                step: 1,
                upperBound: 29,
                widthPercent:20, 
                seriesOrder: seriesOrderingEnum.LeftToRightUp
            }            
        },
        {
            name: 'Green',
            color:"#0f0",
            configuration: {
                seriesOrder: seriesOrderingEnum.LeftToRightUp,
                lowerBound: 231,
                step: 1,
                upperBound: 247,
                widthPercent:30
            }            
        },
        {
            name: 'Blue',
            color:"#00f",
            configuration: {
                lowerBound: 47,
                step: 2,
                upperBound: 81,
                widthPercent:40, 
                seriesOrder: seriesOrderingEnum.RightToLeftUp
            }            
        }
    ]
};