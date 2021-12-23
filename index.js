const RED = [0,255,0]
const GREEN = [255,0,0]
const BLUE = [0,0,255]
const WHITE = [255,255,255]
const BLACK = [0,0,0]

const LED_ROW_COUNT = 4 
const LED_COL_COUNT = 4 
const LED_COUNT = LED_ROW_COUNT * LED_COL_COUNT 
const NUM_COLOR_COMPONENTS = 3 

function rand(max) {
  return Math.floor(Math.random() * max);
}

const setColor = (currStateArr, led, colorArr) => {
    if (led >= LED_COUNT) {
        console.log(`Incorrect led number : ${led}, must be less than ${LED_COUNT}`)
        return 
    } 
    if (colorArr.length !== NUM_COLOR_COMPONENTS) {
        console.log(`Incorrect color array : ${colorArr}`)
        return 
    }
    
    const startArr = currStateArr.slice(0,led * NUM_COLOR_COMPONENTS);
    const endArr = currStateArr.slice(led * NUM_COLOR_COMPONENTS + NUM_COLOR_COMPONENTS)
    
    var outArr  = new Uint8ClampedArray(LED_COUNT * NUM_COLOR_COMPONENTS);
    outArr.set(startArr)
    outArr.set(colorArr,startArr.length)
    outArr.set(endArr,startArr.length + colorArr.length)

    return outArr
}

let arr = new Uint8ClampedArray(LED_COUNT * NUM_COLOR_COMPONENTS) // 3 = GRB
let final = setColor(arr, 1, new Uint8ClampedArray([255,255,255]))
//console.log(final)

// simple chase pattern.
const chasePattern = (interval, shouldLoop = false, showRandomColors = false) => {
    let arr = new Uint8ClampedArray(LED_COUNT * NUM_COLOR_COMPONENTS) // 3 = GRB
    let currLED  = 0 
    var refreshId = setInterval(() => {
        if (currLED >= LED_COUNT) {
            if (shouldLoop){
                currLED = 0 
                return 
            }
            clearInterval(refreshId) 
            return 
        } 
        const color = showRandomColors ? [rand(255),rand(255),rand(255)] : WHITE 
        
        let newArr = setColor(arr,currLED,color)         
        console.log(currLED, " : ", newArr)
        currLED++ 
    }, interval)
}

const fillPatternForward = async (interval,shouldReverse = false,showRandomColors = false) => {
    let arr = new Uint8ClampedArray(LED_COUNT * NUM_COLOR_COMPONENTS) // 3 = GRB
    let currLED = 0  

    var refreshId = setInterval(async () => {
        if (currLED >= LED_COUNT) {
            clearInterval(refreshId) 
            if (shouldReverse){
                fillPatternReverse(interval) 
            }
            return 
        }

        const color = showRandomColors ? [rand(255),rand(255),rand(255)] : WHITE 

        arr = setColor(arr,currLED,color)         
        console.log(currLED, " : ", arr)
        currLED++ 
    }, interval)
}

// This one fills the array from starting from the top end... 
const fillReverseDirection = (interval,shouldReverse = false,showRandomColors = false) => {
    let arr = new Uint8ClampedArray(LED_COUNT * NUM_COLOR_COMPONENTS) // 3 = GRB
    let currLED = LED_COUNT - 1 

    var refreshId = setInterval(async () => {

        if (currLED < 0) {
            if (shouldReverse){
                currLED = LED_COUNT 
                return 
            }
            clearInterval(refreshId) 
            return 
        }

        const color = showRandomColors ? [rand(255),rand(255),rand(255)] : WHITE 

        arr = setColor(arr,currLED,color)         
        console.log(currLED, " : ", arr)
        currLED-- 
    }, interval)
}


const fillPatternReverse = (interval,shouldReverse = false,showRandomColors = false) => {
    let arr = new Uint8ClampedArray(LED_COUNT * NUM_COLOR_COMPONENTS) // 3 = GRB

    arr = arr.map(() => { return 255 })

    let currLED = LED_COUNT - 1 

    var refreshId = setInterval(async () => {

        if (currLED < 0) {
            if (shouldReverse){
                currLED = LED_COUNT 
                return 
            }
            clearInterval(refreshId) 
            return 
        }

        const color = BLACK 

        arr = setColor(arr,currLED,color)         
        console.log(currLED, " : ", arr)
        currLED-- 
    }, interval)
}

const getIndicesForRow = (rowIndex) =>  {
    return [...Array(LED_ROW_COUNT)].map((_,i) => i + rowIndex * LED_ROW_COUNT); 
}

const fillGridRow = (rowIndex) => {
    let arr = new Uint8ClampedArray(LED_COUNT * NUM_COLOR_COMPONENTS) // 3 = GRB
    
    const idxArr = getIndicesForRow(rowIndex)
    idxArr.forEach((idx) => {
       arr = setColor(arr,idx,WHITE)         
    })
    // write it here .. to the neo pixel 
    console.log(arr)
}

fillGridRow(0)
fillGridRow(1)
fillGridRow(2)
fillGridRow(3)

const fillGridCol = (colIndex) => {
    let arr = new Uint8ClampedArray(LED_COUNT * NUM_COLOR_COMPONENTS) // 3 = GRB
    
    const idxArr = getIndicesForRow(rowIndex)
    idxArr.forEach((idx) => {
       arr = setColor(arr,idx,WHITE)         
    })
    // write it here .. to the neo pixel 
    console.log(arr)
}
//fillPatternForward(1000,true)



//chasePattern(1000)
//chasePattern(1000,true,true) // chasePattern With loop

//fillPattern(1000)
//fillPatternForward(1000,true)
//fillPatternReverse(1000)

//fillAndReverse(1000)

