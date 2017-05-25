var fs = require('fs');

const fileContent = fs.readFileSync('WorkSpace_nexus5/Trace_files/log106_Messaging.txt', 'utf-8');
const fileLines = fileContent.split('\n');
fileLines.map(file => {
  const line = file.trim();
  if (line.length === 0) return;
  const str = line.split(/\s+/);
  const accessStartAddr = str[0];
  const accessSectorNum = str[1];
  const accessByteSize = str[2];
  const accessType = str[3];
  const reqGenerateTime = str[4];
  const reqStartTime = str[5];
  const reqSubmittedToHardware = str[6];
  const reqFinishedTime = str[7];
  const a = { reqFinishedTime };
  console.log(a);
});


console.log('程序执行结束!');