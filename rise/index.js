// build truffle contract from truffle JSON description.
var contract = require("truffle-contract");
// ethereum node client.
var Web3 = require('web3');

// Deployed contract truffel JSON definitions files.
var ESOP = require('../../ESOP/build/contracts/ESOP.json');

var provider = new Web3.providers.HttpProvider('http://testrpc.nyusya.com:8545');
var web3 = new Web3(provider);

// Build truffle contracts.
var esopCtr = contract(ESOP);

// Set providers.
esopCtr.setProvider(provider);

const weeks = 7 * 24 * 60 * 60;
const extraOptionsAmount = 8172;

// Contract object and options instances.
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
  for (var i = 0; i < web3.eth.accounts.length; i++) {
    esop.offerOptionsToEmployee(
      web3.eth.accounts[i],
      startdate - 1 * weeks,
      startdate + 4 * weeks,
      extraOptionsAmount,
      false,
      {from: companyAddress}
    ).then(function(result) {
      console.log({result});
    }).catch(function(error) {
      console.log({error});
    });
  };
});
