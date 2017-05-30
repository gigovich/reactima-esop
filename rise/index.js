// build truffle contract from truffle JSON description.
var contract = require("truffle-contract");
// ethereum node client.
var Web3 = require('web3');

// Deployed contract truffel JSON definitions files.
var ESOP = require('../../ESOP/build/contracts/ESOP.json');

var provider = new Web3.providers.HttpProvider('http://testrpc.nyusya.com:8545');

// Build truffle contracts.
var esopCtr = contract(ESOP);

// Set providers.
esopCtr.setProvider(provider);

const weeks = 7 * 24 * 60 * 60;
const extraOptionsAmount = 8172;

// Contract object and options instances.
var newEmplyeeAddress = '0x2f956f6620eeb99db927a728bf9320a5c629b69b';
var esop;
var companyAddress;
var startdate;

// Get instance of ESOP contract and perfom actions.
esopCtr.deployed().then(function(instance) {
  esop = instance;
  return instance.companyAddress();
}).then(function(value) {
  companyAddress = value;
  return esop.currentTime();
}).then(function(value) {
  startdate = Number(value);
}).then(function() {
  console.log(companyAddress, newEmplyeeAddress);
  return esop.offerOptionsToEmployee(
    newEmplyeeAddress,
    startdate - 1 * weeks,
    startdate + 4 * weeks,
    extraOptionsAmount,
    false,
    {from: companyAddress});
}).then(function(v) {
    console.log(v);
}).catch(function(e) {
    console.log(e);
});
