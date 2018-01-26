
const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }
    var query="?";
    for (let key in invocationParameters) {
        query+=key+"="+invocationParameters[key]+"&";
      }
    var newQuery = query.substring(0, query.length-1);
    fetch(""+url+newQuery)
    .then(function(res) {
        checkResult.resultData=res.json();
        checkResult.resultStatus=res.status();
        checkResult.statusTestPassed=res.status()==expectedResultStatus;
        checkResult.resultDataAsExpected=compareResult(JSON.parse(res.json()), expectedResultData);
        return checkResult;
    });

}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check