import {Token as JOEToken, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } from "@traderjoe-xyz/sdk";
import { ethers } from "ethers";
var TeleBot = require("telebot");
require('dotenv').config();

const privkey = String(process.env.Wallet);
const wallet = new ethers.Wallet(privkey);
const providerAVAX = new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc"); 
const walletAvax = wallet.connect(providerAVAX);

const Crabada_Game_Address = "0x82a85407bd612f52577909f4a58bfc6873f14da8";
const My_Address = "<YOUR ADDRESS>";

const token_abi = [{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const router_abi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WAVAX","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WAVAX","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAXSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapAVAXForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAXSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]; 

const USDC_token = new ethers.Contract('0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', token_abi, providerAVAX);
const TUS_token = new ethers.Contract('0xf693248f96fe03422fea95ac0afbbbc4a8fdd172', token_abi, providerAVAX);
const CRA_token = new ethers.Contract('0xa32608e873f9ddef944b24798db69d80bbb4d1ed', token_abi, providerAVAX);
const WAVAX = new JOEToken(43114, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', 18, "WAVAX", "Wrapped AVAX");
const USDC = new JOEToken(43114, '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', 6, "USDC", "USDC");
const TUS = new JOEToken(43114, '0xf693248f96fe03422fea95ac0afbbbc4a8fdd172', 18, "TUS", "TUS");
const CRA = new JOEToken(43114, '0xa32608e873f9ddef944b24798db69d80bbb4d1ed', 18, "CRA", "CRA");

const traderjoe_router = new ethers.Contract(
    '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
    router_abi,
    providerAVAX
);

var started = false;
var closeGame_data;

// get your own data from a test txn and use that
async function startGame() {
    var transaction = {
        data: '0xe5ed1d5900000000000000000000000000000000000000000000000000000000000030be', 
        to: Crabada_Game_Address,
        value: 0,
        from: My_Address,
    };
    var txn = (await walletAvax.sendTransaction(transaction));
    console.log('Txn sent');
    console.log(txn);
    var txnhash = txn.hash;
    console.log(txnhash);
    var txn_receipt = await providerAVAX.waitForTransaction(String(txnhash));
    console.log(txn_receipt);
    var gameid = txn_receipt.logs[0].data.slice(2,66);
    closeGame_data = '0x2d6ef310' + gameid;
    var URL_txn = 'https://snowtrace.io/tx/' + (txnhash);
    bot.sendMessage(803525294,`Game Started\n${URL_txn}`);
}

async function closeGame(data) {
    var transaction = {
        data: data, 
        to: Crabada_Game_Address,
        value: 0,
        from: My_Address,
    };
    var txn = (await walletAvax.sendTransaction(transaction));
    console.log('Txn sent');
    console.log(txn);
    var txnhash = txn.hash;
    console.log(txnhash);
    var txn_receipt = await providerAVAX.waitForTransaction(String(txnhash));
    console.log(txn_receipt);
    var URL_txn = 'https://snowtrace.io/tx/' + (txnhash);
    bot.sendMessage(803525294,`Game Closed\n${URL_txn}`);
}

async function getWalletBalance() {
    var USDC_balance = (await USDC_token.balanceOf(My_Address));
    var TUS_balance = (await TUS_token.balanceOf(My_Address));
    var CRA_balance = (await CRA_token.balanceOf(My_Address));
    
    return [String(USDC_balance), String(TUS_balance), String(CRA_balance)]
}

async function checktradeprice(amount,token) { 
    var WAVAXUSDCPair = await Fetcher.fetchPairData(WAVAX, USDC, providerAVAX);
    var WAVAXTUSPair = await Fetcher.fetchPairData(WAVAX, TUS, providerAVAX);
    var WAVAXCRAPair = await Fetcher.fetchPairData(WAVAX, CRA, providerAVAX);
    var route;

    var amountIn = amount.toString();
    if (token == 'TUS') {
      token = TUS;
      route = new Route([WAVAXTUSPair, WAVAXUSDCPair], TUS);
    } else if (token == 'CRA') {
      token = CRA
      route = new Route([WAVAXCRAPair, WAVAXUSDCPair], CRA);
    }
    var trade = new Trade(
      route,
      new TokenAmount(token, amountIn),
      TradeType.EXACT_INPUT,
      43114
    );
  
    var slippageTolerance = new Percent("50", "10000");
    var amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    var value = trade.inputAmount.raw;
    
    console.log(Number(amountOutMin));
    
    return ([amountOutMin,value]);
}

async function tradeonAVAX(amountIn, amountOutMin, path, gas) {
    var router = traderjoe_router.connect(walletAvax);
    var to = My_Address; // should be a checksummed recipient address
    var deadline = Math.floor(Date.now() / 1000) + 60 * 3; // 3 minutes from the current Unix time
    console.log('amountin',amountIn);
    if (gas == false) {
        var txn = await router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
          )
        await txn.wait();
    } else {
        var txn = await router.swapExactTokensForAVAX(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
          )
        await txn.wait();
    }
}

async function swapTUS() {
    var [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    console.log(TUS_balance);
    var [amountOutMin,value] = await checktradeprice(String(TUS_balance), 'TUS');
    console.log((TUS_balance));
    await tradeonAVAX(TUS_balance, String(amountOutMin), ['0xf693248f96fe03422fea95ac0afbbbc4a8fdd172','0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7','0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'], false);
}

async function swapCRA() {
    var [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    var [amountOutMin,value] = await checktradeprice(String(CRA_balance), 'CRA');
    await tradeonAVAX(CRA_balance, String(amountOutMin), ['0xa32608e873f9ddef944b24798db69d80bbb4d1ed','0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7','0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'], false);
}
//swap 10% of TUS for AVAX
async function swapforGas() {
    var [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    var [amountOutMin,value] = await checktradeprice(String(Number(TUS_balance) * 0.1), 'TUS');
    await tradeonAVAX(String(Number(TUS_balance) * 0.1), String(amountOutMin), ['0xf693248f96fe03422fea95ac0afbbbc4a8fdd172','0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'], true);
}

async function displayBalance() {
    var [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    
    var USDCbalance = Number(USDC_balance) / 10**6;
    var TUSbalance = Number(TUS_balance) / 10**18;
    var CRAbalance = Number(CRA_balance) / 10**18;
    bot.sendMessage(803525294,`USDC Balance:${USDCbalance}\nTUS Balance:${TUSbalance}\nCRA Balance:${CRAbalance}`).catch(error => console.log(error));
}
/*
async function deposit_JOE() {
    var [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();

}
*/

var bot = new TeleBot(process.env.telebot);
bot.on('/start', (msg) => {
    if (started == false) {
        startGame();
        var timer1 = setInterval(() => {
        closeGame(closeGame_data)
        }, 14400000 ); 
        var timer2 = setInterval(() => {
        startGame()
        }, 14460000 );
        started = true;
    }
});

bot.on('/swapTUS', (msg) => {
    if (msg.from.username == '<YOUR USERNAME>') {
        swapTUS();
        displayBalance();
    }
})

bot.on('/swapCRA', (msg) => {
    if (msg.from.username == '<YOUR USERNAME>') {
        swapCRA();
        displayBalance();
    }
})

bot.on('/swapgas', (msg) => {
    if (msg.from.username == '<YOUR USERNAME>') {
        swapforGas();
        displayBalance();
    }
})

bot.on('/balance', (msg) => {
    if (msg.from.username == '<YOUR USERNAME>') {
        displayBalance();
    }
})

bot.start();

