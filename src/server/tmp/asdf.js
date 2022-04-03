const FIFO = require('fifo-js');
let result = [];

function getModelResults(filename){
    let fifo = new FIFO(`../public/result/${filename}`);
    let result = [];
    fifo.setReader(text => {
        let r = text.split(',')
        if (r.length > 0) {
            result.push(r);
        }
        console.log(result)
    });
}

function givePropsToModel(filename, payload) {
    let fifo = new FIFO(`../public/props/${filename}`);
    let props = {
        "department": payload.department,
        "job": payload.job
    }
    fifo.writeSync(props, true);
    fifo.close()
}

getModelResults('result1')