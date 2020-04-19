const str = `require("./moduleA");const str = require("./moduleB");console.log(str);`;
const funcWrapper = ["function(require, module, exports) {", "}"];

const result = funcWrapper[0] + str + funcWrapper[1];
console.log(result);

const vm = require("vm");
vm.runInNewContext;

// console.log(vm.runInNewContext(str));

// const data = vm.runInNewContext(str);
// console.log(data);
const Qs = require("qs");
let obj = {
  method: "query_sql_dataset_data",
  projectId: "85",
  appToken: "7d22e38e-5717-11e7-907b-a6006ad3dba0",
  datasetId: " 12564701"
};
Qs.stringify(obj);
console.log(Qs.stringify(obj));
