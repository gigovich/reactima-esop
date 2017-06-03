#!/usr/bin/env node

var Web3 = require('web3');
var web3 = new Web3();
var contract = require("truffle-contract");

//TODO: actually we need just ABI contracts here - find way to provide those during build process
var RoTDef = require('../../reactima-esop-contracts-hack/build/contracts/RoT.json');
var ESOPDef = require('../../reactima-esop-contracts-hack/build/contracts/ESOP.json');
var EmployeesListDef = require('../../reactima-esop-contracts-hack/build/contracts/EmployeesList.json');
var OptionsCalculatorDef = require('../../reactima-esop-contracts-hack/build/contracts/OptionsCalculator.json');

var host = 'http://localhost:8545';
//var provider = new Web3.providers.HttpProvider('http://localhost:8545')
var provider = new Web3.providers.HttpProvider(host);
console.log('host:'+host);

web3.setProvider(provider);

// General etherium network methods
var coinbase = web3.eth.coinbase;
console.log("coinbase", coinbase);

var balance = web3.eth.getBalance(coinbase);
console.log("web3.eth.getBalance", balance.toString(10));

// Pre-built and deployed contract menthods playground
var RoT = contract(RoTDef);
var ESOP = contract(ESOPDef);
var EmployeesList = contract(EmployeesListDef);
var OptionsCalculator = contract(OptionsCalculatorDef);

RoT.setProvider(provider);
ESOP.setProvider(provider);
EmployeesList.setProvider(provider);
OptionsCalculator.setProvider(provider);

var deployed;
RoT.deployed().then((contract) => console.log("RoT contract.address",contract.address));

ESOP.deployed()
  .then((contract) => contract.employees())
  .then(
    (employees) => console.log("ESOP contract.employees",employees)
  );





