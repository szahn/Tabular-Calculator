/**Calculates new table cell values and cell width based on configuration */

const MIN_CELL_WIDTH = 15;
const CELL_CHAR_WIDTH = 12;

module.exports = ({lowerBound, upperBound, step}) => {
    const cellCount = Math.floor((Math.max(upperBound, lowerBound) 
        - Math.min(lowerBound, upperBound)) / Math.abs(step));

    const cells = new Array(cellCount);

    for (let i = 0, j = lowerBound; j <= upperBound; j+= step, i+=1){
        cells[i] = j;
    }

    const cellWidth = Math.max(MIN_CELL_WIDTH, CELL_CHAR_WIDTH * Math.max(upperBound.toString().length,
        lowerBound.toString().length));

    return {
        cells: cells,
        cellWidth: cellWidth,
    };

}