var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain',
  });
  var fileList = [];
  var fileContent = [];
  var output = []
  readFileList(fileList);
  fileList.map(file => {
    fileContent.push({
      data: fs.readFileSync(file, 'utf-8'),
      name: file.substring(29)
    });
  });
  fileContent.map(file => {
    const fileObj = allTraces(file);
    output.push({
      name: file.name,
      partOne: fileObj,
      partTwo: readOrwrite(file, parseInt(fileObj.reqEarliestTime), parseInt(fileObj.reqLatestTime)),
    });
  });
  response.end(JSON.stringify(output));
}).listen(8888);

function readFileList(fileList) {
  var files = fs.readdirSync('WorkSpace_nexus5/Trace_files');
  files.forEach(function (item, index) {
    fileList.push('WorkSpace_nexus5/Trace_files/' + item);
  })
}

function allTraces(file) {
  const fileLines = file.data.split('\n');
  let lineCount = 0;
  let readCount = 0;
  let writeCount = 0;
  let reqEarliestTime = 1000000000000000000;
  let reqLatestTime = 0;
  let reqSize = 0;

  fileLines.map(item => {
    const line = item.trim();
    if (line.length === 0) return;
    const str = line.split(/\s+/);
    if (str[1] % 8 !== 0) return;
    lineCount++;
    if (str[3] % 2 === 0) {
      //read
      readCount++;
    } else {
      writeCount++;
    }
    if (str[4] < reqEarliestTime) {
      reqEarliestTime = parseFloat(str[4]);
    }
    if (str[7] > reqLatestTime) {
      reqLatestTime = parseFloat(str[7]);
    }
    reqSize += parseInt(str[2]);
  });
  return {
    lineCount,
    reqEarliestTime,
    reqLatestTime,
    readCount,
    writeCount,
    reqSize,
    iops: lineCount / (reqLatestTime - reqEarliestTime),
    rdOverwt: `${readCount}/${writeCount}`,
  };
}

function readOrwrite(file, beginTime, endTime) {
  const timeLength = endTime - beginTime;
  const timeBlock = timeLength / 20;
  let output = [];
  for (let i = 0; i < 20; i++) {
    const period = new Date((beginTime + (i + 1) * (timeBlock / 2)) * 1000).toLocaleTimeString();
    output.push({
      start: beginTime + i * timeBlock,
      end: beginTime + (i + 1) * timeBlock,
      readCount: 0,
      writeCount: 0,
      period,
    });
  }
  const fileLines = file.data.split('\n');
  fileLines.map(item => {
    const line = item.trim();
    if (line.length === 0) return;
    const str = line.split(/\s+/);
    if (str[1] % 8 !== 0) return;
    output.map(value => {
      if (str[4] >= value.start && str[4] <= value.end) {
        if (str[3] % 2 === 0) {
          value.readCount++;
        } else {
          value.writeCount++;
        }
      }
    });
    output.map(value => {
      value.iops = (value.readCount + value.writeCount) / timeBlock;
    })
  })
  return {
    changeByTime: output,
  }
}