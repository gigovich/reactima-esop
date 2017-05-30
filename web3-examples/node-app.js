#!/usr/bin/env node

var Web3 = require('web3');
var web3 = new Web3();
var contract = require("truffle-contract");

//TODO: actually we need just ABI contracts here - find way to provide those during build process
var RoTDef = require('../../ESOP/build/contracts/RoT.json');
var ESOPDef = require('../../ESOP/build/contracts/ESOP.json');
var EmployeesListDef = require('../../ESOP/build/contracts/EmployeesList.json');
var OptionsCalculatorDef = require('../../ESOP/build/contracts/OptionsCalculator.json');

//var provider = new Web3.providers.HttpProvider('http://localhost:8545')
var provider = new Web3.providers.HttpProvider('http://testrpc.nyusya.com:8545');

web3.setProvider(provider);

// General etherium network methods
var coinbase = web3.eth.coinbase;
console.log(coinbase);

var balance = web3.eth.getBalance(coinbase);
console.log(balance.toString(10));

// Pre-built and deployed contract menthods playground
var RoT = contract(RoTDef);
var ESOP = contract(ESOPDef);
var EmployeesList = contract(EmployeesListDef);
var OptionsCalculator = contract(OptionsCalculatorDef);

RoT.setProvider(provider);
ESOP.setProvider(provider);
EmployeesList.setProvider(provider);
OptionsCalculator.setProvider(provider);

console.log("====================");
var deployed;
RoT.deployed().then((contract) => console.log(contract.address));





