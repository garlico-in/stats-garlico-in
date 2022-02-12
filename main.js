var express = require('express')
  , cons = require('consolidate')
  , axios = require('axios')
  , app = express();

const date = require('date-and-time')

// Global Variables
let pool_data = "";

// Template Engine
app.engine('html', cons.hogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// Index
app.get('/', function (req, res) {

  // No Data Available
  if (pool_data == "") {
    res.render('loading', { title: "Application Starting..." });
    return;
  }
  
  // Load Data 
  try {

    // Formatting
    payout_date = new Date(pool_data["primary"]["payments"]["last"])
    formatted_payout_date = date.format(payout_date, "h:MM:ss");

    console.log(pool_data["primary"]["network"]["height"])

    // Render Page
    res.render('index', {

      // Page Details
      title: "Pool Statistics",
      name: "Statistics",
      
      // Statistics
      current_block: pool_data["primary"]["network"]["height"],
      workers: pool_data["primary"]["status"]["workers"],
      last_payout: formatted_payout_date,
      pool_hash_rate: hashCalculator(pool_data["primary"]["hashrate"]["shared"]),
      network_hash_rate: hashCalculator(pool_data["primary"]["network"]["hashrate"])
    
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

// Refresh Data
function refreshData() {
  
  console.log("Refreshing Pool Data");

  // API Request
  axios
  .get('http://127.0.0.1:3001/api/v1/Pool1/statistics')
  .then(res => {
    console.log("API Response - " + res.data.statusCode)
    pool_data = res.data.body
  })
  .catch(error => {
    console.error(error)
  });

  return;
}

// Scheduled Crons
setInterval(function() {
  refreshData();
}, 10000);

module.exports = app;