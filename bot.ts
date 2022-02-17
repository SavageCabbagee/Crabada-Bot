import {Token as JOEToken, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } from "@traderjoe-xyz/sdk";
import { ethers } from "ethers";
const TeleBot = require("telebot");
require('dotenv').config();

const privkey = String(process.env.Wallet);
const wallet = new ethers.Wallet(privkey);
const providerAVAX = new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc"); 
const walletAvax = wallet.connect(providerAVAX);

const Crabada_Game_Address = "0x82a85407bd612f52577909f4a58bfc6873f14da8";
const My_Address = "0xE7E3d237FbF3B034253b17CfC23384a90Af47Ef5";

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

var started:boolean;
var closeGame_data;

// get your own data from a test txn and use that
async function startGame() {
    const transaction = {
        data: '0xe5ed1d5900000000000000000000000000000000000000000000000000000000000030be', 
        to: Crabada_Game_Address,
        value: 0,
        from: My_Address,
    };
    const txnhash = (await walletAvax.sendTransaction(transaction)).hash;
    const txn_receipt = await providerAVAX.getTransactionReceipt(txnhash);
    const gameid = txn_receipt.logs[0].data.slice(2,66);
    closeGame_data = '0x2d6ef310' + gameid;
    var URL_txn = 'https://snowtrace.io/tx/' + (txnhash);
    bot.sendMessage('@eD_cabbages',`Game Started\n${URL_txn}`);
}

async function closeGame(data) {
    const transaction = {
        data: data, 
        to: Crabada_Game_Address,
        value: 0,
        from: My_Address,
    };
    const txnhash = (await walletAvax.sendTransaction(transaction)).hash;
    var URL_txn = 'https://snowtrace.io/tx/' + (txnhash);
    bot.sendMessage('@eD_cabbages',`Game Closed\n${URL_txn}`);
}

async function getWalletBalance() {
    const USDC_balance = (await USDC_token.balanceOf(My_Address));
    const TUS_balance = (await TUS_token.balanceOf(My_Address));
    const CRA_balance = (await CRA_token.balanceOf(My_Address));
    
    return [USDC_balance, TUS_balance, CRA_balance]
}

async function checktradeprice(amount,token) { 
    const WAVAXUSDCPair = await Fetcher.fetchPairData(WAVAX, USDC, providerAVAX);
    const WAVAXTUSPair = await Fetcher.fetchPairData(WAVAX, TUS, providerAVAX);
    const WAVAXCRAPair = await Fetcher.fetchPairData(WAVAX, CRA, providerAVAX);
    var route;

    const amountIn = amount.toString();
    if (token == 'TUS') {
      token = TUS;
      route = new Route([WAVAXTUSPair, WAVAXUSDCPair], TUS);
    } else if (token == 'CRA') {
      token = CRA
      route = new Route([WAVAXCRAPair, WAVAXUSDCPair], CRA);
    }
    const trade = new Trade(
      route,
      new TokenAmount(token, amountIn),
      TradeType.EXACT_INPUT,
      43114
    );
  
    const slippageTolerance = new Percent("50", "10000");
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    const value = trade.inputAmount.raw;
    
    console.log(Number(amountOutMin));
    console.log(Number((amountOutMin).toString())/10**18);
    return ([amountOutMin,value]);
}

async function tradeonAVAX(amountIn, amountOutMin, path, gas) {
    const router = traderjoe_router.connect(walletAvax);
    const to = My_Address; // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 3; // 3 minutes from the current Unix time
    if (gas == false) {
        const txn = await router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
          )
        await txn.wait();
    } else {
        const txn = await router.swapExactTokensForAVAX(
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
    const [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    const [amountOutMin,value] = await checktradeprice(TUS_balance, 'TUS');
    await tradeonAVAX(TUS_balance, amountOutMin, ['0xf693248f96fe03422fea95ac0afbbbc4a8fdd172','0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7','0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'], false);
}

async function swapCRA() {
    const [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    const [amountOutMin,value] = await checktradeprice(CRA_balance, 'CRA');
    await tradeonAVAX(TUS_balance, amountOutMin, ['0xa32608e873f9ddef944b24798db69d80bbb4d1ed','0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7','0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'], false);
}
//swap 10% of TUS for AVAX
async function swapforGas() {
    const [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    const [amountOutMin,value] = await checktradeprice(TUS_balance * 0.1, 'TUS');
    await tradeonAVAX(TUS_balance * 0.1, amountOutMin, ['0xa32608e873f9ddef944b24798db69d80bbb4d1ed','0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'], true);
}

async function displayBalance() {
    var [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    USDC_balance = Number(USDC_balance) / 10**6;
    TUS_balance = Number(TUS_balance) / 10**18;
    CRA_balance = Number(CRA_balance) / 10**18;
    bot.sendMessage('@eD_cabbages',`USDC Balance:${USDC_balance}\nTUS Balance:${TUS_balance}\nCRA Balance:${CRA_balance}`);
}
/*
async function deposit_JOE() {
    const [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();

}
*/

const bot = new TeleBot(process.env.telebot);
false
bot.on('/start', (msg) => {
    if (started == false) {
        startGame();
        const timer1 = setInterval(() => {
        closeGame(closeGame_data)
        }, 14400000 ); 
        const timer2 = setInterval(() => {
        startGame()
        }, 14460000 );
        started = true;
    }
});

bot.on('/swapTUS', (msg) => {
    swapforGas();
    displayBalance()
})

bot.on('/swapCRA', (msg) => {
    swapCRA();
    displayBalance()
})

bot.on('/swapgas', (msg) => {
    swapTUS();
    displayBalance()
})

bot.on('/balance', (msg) => {
    displayBalance();
})

bot.start();