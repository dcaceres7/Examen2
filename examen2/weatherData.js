if(typeof module !== "undefined") {
  var arrayTempSpread = [];
  var fs = require('fs');
  var wFile = fs.readFileSync( 'weather.dat', 'utf8');
  var lines = wFile.split("\n");
}

function weather(){
  for(var i = 2; i < lines.length - 1; i++){
    var currentLine = lines[i];
    var myRegexp = /^\s+(\d+)\s+(\d\.?\d+)\*?\s+(\d\.?\d+)\*?.+$/g;
    var match = myRegexp.exec(currentLine);
    tempSpread = getTempSpread(match[2], match[3])
    saveTempSpread(tempSpread);
    console.log("Day is: " + match[1] + ", MaxT is: " + match[2] + ", MinT is: " + match[3] + ", Smallest Temp is: " + tempSpread);
  }
}

function getTempSpread(mxT, mnT){
  return mxT - mnT;
}

function saveTempSpread(tempSpread){
  arrayTempSpread.push(tempSpread);
}

function getMinTempSpread(){
  var min = Math.min.apply(null, arrayTempSpread);
  return min;
}

function findDaySmallestTempSpread(smallestTemp){
  for (var i = 0; i < arrayTempSpread.length - 1; i++) {
    if(arrayTempSpread[i] === smallestTemp){
      return i+1;
    }
  }
}

function printResult(){
  smallestTemp = getMinTempSpread();
  day = findDaySmallestTempSpread(smallestTemp);
  console.log("\n" + "Day is: " + day + ", Smallest Temp is: " + smallestTemp);
}

weather();
printResult();