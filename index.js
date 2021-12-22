const RED = [0,255,0]
const GREEN = [255,0,0]
const BLUE = [0,0,255]
const WHITE = [255,255,255]

const LED_COUNT = 4 
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
console.log(final)

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

const fillPattern = (interval,shouldReverse = false,showRandomColors = false) => {
    let arr = new Uint8ClampedArray(LED_COUNT * NUM_COLOR_COMPONENTS) // 3 = GRB
    let currLED = 0  

    var refreshId = setInterval(() => {
        if (currLED >= LED_COUNT) {
            if (shouldReverse){
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


chasePattern(1000)
chasePattern(1000,true,true) // chasePattern With loop
