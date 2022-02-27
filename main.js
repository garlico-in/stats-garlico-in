var express = require('express')
  , cons = require('consolidate')
  , axios = require('axios')
  , app = express()
  , fs = require('fs');

const date = require('date-and-time')

// Global Variables
let pool_data = "";
let miner_data = {};
let block_data = {};
let block_order = [];
let worker_data = [];

// Template Engine
app.engine('html', cons.hogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Index
app.get('/', function (req, res) {

  // Base URL
  base_url = req.headers.host
  if (!base_url.startsWith("http://") || !base_url.startsWith("https://")){
    base_url = "http://" + base_url;
  }

  // No Data Available
  if (pool_data == "") {
    res.render('loading', { base_url: base_url, title: "Application Starting..." });
    return;
  }
  
  // Load Data 
  try {

    // Formatting
    payout_date = new Date(pool_data["primary"]["payments"]["last"])
    formatted_payout_date = date.format(payout_date, "h:MM:ss");

    // Block Data
    mining_history = ""
    block_order.forEach(function(number)
    {
      // Time Format
      hash_time = new Date(block_data[number].time)

      // Icon
      if (block_data[number].status == "confirmed") {
        icon = "check-circle"
      }else{
        icon = "refresh"
      }

      // HTML
      tmp = "<tr>"
      tmp += "<td><i class=\"fa fa-" + icon + "\" aria-hidden=\"true\" title=\"" + block_data[number].status + "\"></i></td>"
      tmp += "<td><a href=\"https://garlicoin.info/#/GRLC/mainnet/block/" + block_data[number].hash + "\">" + block_data[number].height + "</a></td>"
      tmp += "<td><a href=\"worker/" + block_data[number].worker + "\">" + block_data[number].worker + "</a></td>"
      tmp += "<td>" + date.format(hash_time, "MMM DD") + " at " + date.format(hash_time, "h:MM:ss"); + "</td>"
      tmp += "</tr>"

      mining_history += tmp
    })

    // Render Page
    res.render('index', {

      // Page Details
      base_url: base_url,
      title: "Pool Statistics",
      name: "Statistics",
      
      // Statistics
      current_block: pool_data["primary"]["network"]["height"],
      workers: pool_data["primary"]["status"]["workers"],
      last_payout: formatted_payout_date,
      pool_hash_rate: hashCalculator(pool_data["primary"]["hashrate"]["shared"]),
      network_hash_rate: hashCalculator(pool_data["primary"]["network"]["hashrate"]),

      // Mining History
      mining_history: mining_history
    
    });

  } catch (err) {
    console.error(err)
  }


});

// Workers
app.get('/workers', function (req, res) {
  
  // Base URL
  base_url = req.headers.host
  if (!base_url.startsWith("http://") || !base_url.startsWith("https://")){
    base_url = "http://" + base_url;
  }

  // No Data Available
  if (miner_data == {}) {
    res.render('loading', { base_url: base_url, title: "No worker data currently available..." });
    return;
  }
  
  // Load Data 
  try {

    // Block Data
    active_miners = "";
    
    for (const [key, value] of Object.entries(miner_data)) {
      tmp = "<tr>";
      tmp += "<td><a href=\"worker/" + value["miner"] + "\">" + value["miner"] + "</a></td>";
      tmp += "<td>" + hashCalculator(value["hashrate"]) + "</td>";
      tmp += "</tr>";
      active_miners += tmp;
    }

    // Render Page
    res.render('workers', {

      // Page Details
      base_url: base_url,
      title: "Active Workers",
      name: "Workers",
      
      // Workers
      active_miners: active_miners
    
    });

  } catch (err) {
    console.error(err)
  }

});

// Specific Worker 
app.get('/worker/*', function (req, res) {

  // Base URL
  base_url = req.headers.host
  if (!base_url.startsWith("http://") || !base_url.startsWith("https://")){
    base_url = "http://" + base_url;
  }

  // No Data Available
  if (Object.entries(miner_data).length == 0) {
    res.render('loading', { base_url: base_url, title: "No worker data currently available..." });
    return;
  }
  
  // Load Data 
  try {
    
    // Miner Details
    miner_id = req.url.replace("/worker/", "");

    // Worker Details
    worker_list = [];
    payout_address = "<a href=\"https://garlicoin.info/#/GRLC/mainnet/address/" + miner_id + "\">" + miner_id + "</a>";
    
    worker_data.forEach(function(node){

      if (node.worker.startsWith(miner_id)){

        // Summary
        worker_id = node["worker"].replace(miner_id, "");

        // Worker ID
        if (worker_id == ""){
          worker_id = "Default";
        }

        // List
        worker_list.push([worker_id, node["hashrate"]]);

      }

    });

    // Format Worker List
    worker_list_html = "";
    worker_list.sort(function(a, b) { return a[1] - b[1]; }).reverse();

    worker_list.forEach(function (node){
        tmp = "<tr>";
        tmp += "<td>" + node[0].replace(".", "") + "</td>";
        tmp += "<td>" + hashCalculator(node[1]) + "</td>";
        tmp += "</tr>";
        worker_list_html += tmp;
    });

    // Render Page
    res.render('worker', {

      // Page Details
      base_url: base_url,
      title: "Worker Details",
      name: "Worker",

      // Miner Details
      miner_id: miner_id,
      worker_count: worker_list.length,
      payout_address: payout_address,

      // Worker List
      worker_list: worker_list_html
    
    });

  } catch (err) {
    console.error(err)
  }

});

// Calculate Hash Rate
function hashCalculator(rate) {

  // Petahash
  var interval = rate / 1000;
  if (interval > 1000000000000000) {
    return parseFloat(interval).toFixed(2) + " PH/s";
  }

  // Terahash
  interval = rate / 1000000000000;
  if (interval > 1) {
    return parseFloat(interval).toFixed(2) + " TH/s";
  }

  // Gigahash
  interval = rate / 1000000000;
  if (interval > 1) {
    return parseFloat(interval).toFixed(2) + " GH/s";
  }

  // Meghash
  interval = rate / 1000000;
  if (interval > 1) {
    return parseFloat(interval).toFixed(2)+ " MH/s";
  }

  // Kilohash
  interval = rate / 1000;
  if (interval > 1) {
    return parseFloat(interval).toFixed(2) + " kH/s";
  }

  // Hash Value
  return parseFloat(rate).toFixed(2) + " H/s";
}

// Refresh Summary Data
function refreshSummaryData() {
  
  // API Request
  axios
  .get('http://pool.garlico.in:3001/api/v1/GarlicoinFedPool/statistics')
  .then(res => {
    pool_data = res.data.body
  })
  .catch(error => {
    console.error(error)
  });

  return;
}

// Refresh Block Data
function refreshBlockData() {
  
  // API Request
  axios
  .get('http://pool.garlico.in:3001/api/v1/GarlicoinFedPool/blocks')
  .then(res => {

    block_json = res.data.body;

    // Confirmed Blocks
    block_json["primary"]["confirmed"].forEach(function(block) 
    { 
      height = block.height;
      block_data[height] = block;
      block_data[height].status = "confirmed";
    });

    // Pending Blocks
    block_json["primary"]["pending"].forEach(function(block) 
    { 
      height = block.height;
      block_data[height] = block;
      block_data[height].status = "unconfirmed";
    });

    // Sort Ordering
    block_order = Object.keys(block_data).sort().reverse();

  })
  .catch(error => {
    console.error(error)
  });

  return;
}

// Refresh Miner Data
function refreshMinerData() {
  
  // API Request
  axios
  .get('http://pool.garlico.in:3001/api/v1/GarlicoinFedPool/miners')
  .then(res => {

    miner_json = res.data.body;
    
    // Shared Workers
    tmp_data = miner_json["primary"]["shared"];
    tmp_data.forEach(function(miner){
      id = miner.miner
      miner_data[id] = miner;
    });

  })
  .catch(error => {
    console.error(error);
  });

  return;
}

// Refresh Worker Data
function refreshWorkerData() {
  
  // API Request
  axios
  .get('http://pool.garlico.in:3001/api/v1/GarlicoinFedPool/workers')
  .then(res => {

    worker_json = res.data.body;
    
    // Shared Workers
    worker_data = worker_json["primary"]["shared"];

  })
  .catch(error => {
    console.error(error);
  });

  return;
}

// Scheduled Crons
setInterval(function() {
  refreshSummaryData();
  refreshBlockData();
  refreshWorkerData();
  refreshMinerData();
}, 20000);

module.exports = app;