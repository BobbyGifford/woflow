const axios = require("axios");

let currentId = "089ef556-dfff-4ff2-9733-654645be56fe";

let idMap = { "089ef556-dfff-4ff2-9733-654645be56fe": 1 };

let totalNumberOfNodes = 1;
let mostUsedId = "089ef556-dfff-4ff2-9733-654645be56fe";
let timesUsed = 1;

const callApiAndRecordIds = (id) => {
  axios
    .get(`https://nodes-on-nodes-challenge.herokuapp.com/nodes/${id}`)
    .then((res) => {
      // Iterate as long as child nodes is not blank
      if (res.data[0].child_node_ids !== []) {
        for (let id of res.data[0].child_node_ids) {
          // keep track of the total of nodes used
          ++totalNumberOfNodes;
          //   update the map of id's and times they were used
          idMap[id] = ++idMap[id] || 1;

          //   logic pull the most used id and times it was used
          if (idMap[id] > timesUsed) {
            timesUsed = idMap[id];
            mostUsedId = id;
          }
          callApiAndRecordIds(id);
        }
      }
    });
  // helper to log the results
  // .then(() => {
  //   console.log("total nodes", totalNumberOfNodes);
  //   console.log("most used id", mostUsedId);
  // });
};

// Answers
// total nodes: 33
// most used id: a06c90bf-e635-4812-992e-f7b1e2408a3f
callApiAndRecordIds(currentId);
