var cfenv = require("cfenv");
var request = require("request");
var mydbiot;
temp:any={};


// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
     // CF service named 'cloudantNoSQLDB'
     var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
     // user-provided service with 'cloudant' in its name
     var cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }

  //database name
  var dbName = 'mydbiot';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  mydbiot = cloudant.db.use(dbName);
}



//Add new device...........................
exports.addDevice=function(devicename,callback)
{
	var result;
	var options = { method: 'POST',
  url: 'https://tgacg8.internetofthings.ibmcloud.com/api/v0002/device/types/iotbootcamp/devices',
  headers: 
   { 'Postman-Token': '8bd972f8-1170-466a-a931-ee93601a6213',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic YS10Z2FjZzgtcDNoZXlmMWMxZzpvRm1jZ1RlaUNCd0BRNCp2aig=',
     'Content-Type': 'application/json' },
  body: 
   { deviceId: devicename,
     deviceInfo: 
      { serialNumber: '100087',
        manufacturer: 'ACME Co.',
        model: '7865',
        deviceClass: 'A',
        description: 'iot',
        fwVersion: '1.0.0',
        hwVersion: '1.0',
        descriptiveLocation: 'Office 5, D Block' } },
  json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    else 
    console.log(response.body);

    callback(response.body); 
	});
}

exports.regDevice=function(devicename,devicetype,classname,subject,callback)
{
  console.log(devicename+" "+devicetype+" "+classname+" "+subject);
	var result;
	var options = { method: 'POST',
  url: 'https://tgacg8.internetofthings.ibmcloud.com/api/v0002/device/types/iotbootcamp/devices',
  headers: 
   { 'Postman-Token': '8bd972f8-1170-466a-a931-ee93601a6213',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic YS10Z2FjZzgtcDNoZXlmMWMxZzpvRm1jZ1RlaUNCd0BRNCp2aig=',
     'Content-Type': 'application/json' },
  body: 
   { deviceId: devicename,
     deviceInfo: 
      { serialNumber: '100087',
        manufacturer: 'ACME Co.',
        model: '7865',
        deviceClass: classname,
        description: subject,
        fwVersion: '1.0.0',
        hwVersion: '1.0',
        descriptiveLocation: 'Office 5, D Block' } },
  json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    else 
    console.log(response.body);

    callback(response.body); 
	});
}


exports.getDevices =function(callback)
{
  console.log("get devices");
  var options = { method: 'GET',
  url: 'https://tgacg8.internetofthings.ibmcloud.com/api/v0002/device/types/iotbootcamp/devices',
  headers: 
   { 'Postman-Token': '889a56b4-31d1-461b-8221-b8279337aa38',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic YS10Z2FjZzgtcDNoZXlmMWMxZzpvRm1jZ1RlaUNCd0BRNCp2aig=' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  callback(response.body);
});
}

//Delete Device.............
exports.delDevice=function(devName,callback)
{
  var name=devName
	var options = { method: 'DELETE',
  url: "https://tgacg8.internetofthings.ibmcloud.com/api/v0002/device/types/iotbootcamp/devices/"+devName,
  headers: 
   { 'Postman-Token': 'cf551324-1db8-4a48-a59c-d6474111f363',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic YS10Z2FjZzgtcDNoZXlmMWMxZzpvRm1jZ1RlaUNCd0BRNCp2aig=' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(response.body);
  callback(response.body);
})
}

exports.getDevicesInfo=function(id,callback)
{
  console.log(id);
  mydbiot.get(id,function(err, data) {
    console.log('Error:', err);
    console.log(data.authToken);
    callback(data.authToken);
});
}

// exports.getData=function(callback)
// {
//   console.log("map");
//   mydbiot.list({include_docs:true},function(err, data) {
//     console.log('Error:', err);
//     console.log(data.rows);
//     callback(data);
// });
// }
// exports.getLoginInfo=function(id)
// {
//   console.log(id);
//   mydbiot.get('cc8c910b9b7456a0710ac36d21607cfb',function(err, data) {
//     //console.log('Error:', err);
//     console.log(data);
//     //callback(data);
// });
// }