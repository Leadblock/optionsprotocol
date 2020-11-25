
# 部署相关
// truffle compile --all
// truffle migrate --network kovan
Options Exchange  0x1D5f3492A4bd2758573fb6978a6aCFf1c8aAd693
Options Factory  0x402d9411cd903846c09cb16F9f88e79Bd42Bf073

# 调试相关
truffle console --network kovan
localaddr = '0x1Be31A94361a391bBaFB2a4CCd704F57dc04d4bb';
factory = await OptionsFactory.deployed();
Oracle = await MockCompoundOracle.deployed();
usdc = await ERC20.at('0xcfC9bB230F00bFFDB560fCe2428b4E05F3442E35');
dai = await ERC20.at('0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa');
mkr = await ERC20.at('0xAaF64BFCC32d0F15873a02163e7E500671a4ffcD');
uni = await ERC20.at('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984');
weth = await ERC20.at('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984');
(await usdc.balanceOf(localaddr)).toString();
(await dai.balanceOf(localaddr)).toString();
(await mkr.balanceOf(localaddr)).toString();
(await uni.balanceOf(localaddr)).toString();
(await weth.balanceOf(localaddr)).toString();
web3.utils.fromWei('2561855652240451225', 'ether');
await factory.oracleAddress()
await Oracle.setPrice('weth', 1)
await Oracle.price('weth')

# 部署过程
uniswap = await UniswapFactoryInterface.at('0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30');
await factory.whitelistAsset(dai.address);
await factory.whitelistAsset(mkr.address);
await factory.whitelistAsset(uni.address);
await factory.whitelistAsset(weth.address);
await factory.whitelistAsset(usdc.address);
await factory.whitelisted(dai.address);

await factory.createOptionsContract(uni.address, dai.address, 
  deployconf.cDai, deployconf.cUSDC, deployconf.cUSDC, 1.1, 0.95, -18, 3600*24*7, "CCC-DEST", "CCC") 
)


# 调试技巧
// truffle console --network kovan
// Oracle.address=0xb3EBF2a06C4DF157bD668aC08176CAa3532dc551
// StringComparator Address: 0x083efa40fD14DA0Ea2f24420207968C53664F6AF
// Oracle Address: 0x032d001347DB2cb6960980cf9D8913a68608830A
// OptionsFactory Address: 0xA61Aff0D5620bE52529BBd9aE0B11e1D112D25c5

// Oracle.address=0xb3EBF2a06C4DF157bD668aC08176CAa3532dc551
// StringComparator Address: 0x083efa40fD14DA0Ea2f24420207968C53664F6AF
// Oracle Address: 0x032d001347DB2cb6960980cf9D8913a68608830A
// UniswapFactory Address: 0xc0a47dfe034b400b47bdad5fecda2621de6c4d95
// OptionsExchange Address: 0x39246c4F3F6592C974EBC44F80bA6dC69b817c71
// OptionsFactory Address: 0xcC5d905b9c2c8C9329Eb4e25dc086369D6C7777C


optionsprotocol/migrations
const deploymentConfig = require("./migrations/deployment-config.json");
deployconf = deploymentConfig.KOVAN

factory = await OptionsFactory.deployed();
await factory.getNumberOfOptionsContracts();
// 

factory.whitelistAsset(deployconf.cDai);
factory.whitelistAsset(deployconf.cUSDC);

factory = await OptionsFactory.deployed()

factory.createOptionsContract(
  deployconf.cDai, deployconf.cUSDC, deployconf.cUSDC, 1.1, 0.95, -18, 3600*24*7, "CCC-DEST", "CCC") 
)

# 日常运营调用跟踪
## 部署和初始化期权合约
0xde99ea535749f02da84d13e6f8253291e32d3a7f
To: Contract 0xcc5d905b9c2c8c9329eb4e25dc086369d6c7777c (Opyn: Options Factory) 
Function: createOptionsContract(string _collateralType, int32 _collateralExp, string _underlyingType, int32 _underlyingExp, int32 _oTokenExchangeExp, uint256 _strikePrice, int32 _strikeExp, string _strikeAsset, uint256 _expiry, uint256 _windowSize)

MethodID: 0xa1b72d8a
[0]:  0000000000000000000000000000000000000000000000000000000000000140  => _collateralType ==> 字符串便宜量
[1]:  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee  => _collateralExp
[2]:  0000000000000000000000000000000000000000000000000000000000000180  => _underlyingType ==> 字符串便宜量
[3]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa  => _underlyingExp
[4]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa  => _oTokenExchangeExp
[5]:  0000000000000000000000000000000000000000000000000000000000003d09  => _strikePrice = 15625
[6]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3  => _strikeExp
[7]:  00000000000000000000000000000000000000000000000000000000000001c0  => _strikeAsset ==> 字符串便宜量
[8]:  000000000000000000000000000000000000000000000000000000005fe59c00  => _expiry = 1608883200
[9]:  000000000000000000000000000000000000000000000000000000005fe59c00  => _windowSize = 1608883200
[10]: 0000000000000000000000000000000000000000000000000000000000000003  == 字符串长度
[11]: 4554480000000000000000000000000000000000000000000000000000000000  == 字符串 _collateralType  ETH
[12]: 0000000000000000000000000000000000000000000000000000000000000004  == 字符串长度
[13]: 5553444300000000000000000000000000000000000000000000000000000000  == 字符串 _underlyingType USDC
[14]: 0000000000000000000000000000000000000000000000000000000000000003  == 字符串长度
[15]: 4554480000000000000000000000000000000000000000000000000000000000  == 字符串 _strikeAsset  ETH

==> 0x7EB6Dd0Cc2DF2EAe901f76A151cA82BB7be10d68   Opyn ETH Call $640 12/25/20 (oETH Call...)

To: Contract 0xcc5d905b9c2c8c9329eb4e25dc086369d6c7777c (Opyn: Options Factory) 
Function: createOptionsContract(string _collateralType, int32 _collateralExp, string _underlyingType, int32 _underlyingExp, int32 _oTokenExchangeExp, uint256 _strikePrice, int32 _strikeExp, string _strikeAsset, uint256 _expiry, uint256 _windowSize)

MethodID: 0xa1b72d8a
[0]:  0000000000000000000000000000000000000000000000000000000000000140
[1]:  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee
[2]:  0000000000000000000000000000000000000000000000000000000000000180
[3]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa
[4]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa
[5]:  00000000000000000000000000000000000000000000000000000000000000c8
[6]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5
[7]:  00000000000000000000000000000000000000000000000000000000000001c0
[8]:  000000000000000000000000000000000000000000000000000000005fe59c00
[9]:  000000000000000000000000000000000000000000000000000000005fe59c00
[10]: 0000000000000000000000000000000000000000000000000000000000000003
[11]: 4554480000000000000000000000000000000000000000000000000000000000
[12]: 0000000000000000000000000000000000000000000000000000000000000004
[13]: 5553444300000000000000000000000000000000000000000000000000000000
[14]: 0000000000000000000000000000000000000000000000000000000000000003
[15]: 4554480000000000000000000000000000000000000000000000000000000000

==> 0xb759e6731df19abD72e0456184890f87dCb6C518  Opyn ETH Call $500 12/25/20 (oETH Call...)

To: Contract 0xcc5d905b9c2c8c9329eb4e25dc086369d6c7777c (Opyn: Options Factory) 
Function: createOptionsContract(string _collateralType, int32 _collateralExp, string _underlyingType, int32 _underlyingExp, int32 _oTokenExchangeExp, uint256 _strikePrice, int32 _strikeExp, string _strikeAsset, uint256 _expiry, uint256 _windowSize)

MethodID: 0xa1b72d8a
[0]:  0000000000000000000000000000000000000000000000000000000000000140
[1]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa
[2]:  0000000000000000000000000000000000000000000000000000000000000180
[3]:  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee
[4]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9
[5]:  000000000000000000000000000000000000000000000000000000000000002e
[6]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa
[7]:  00000000000000000000000000000000000000000000000000000000000001c0
[8]:  000000000000000000000000000000000000000000000000000000005fc9ec80
[9]:  000000000000000000000000000000000000000000000000000000005fc9ec80
[10]: 0000000000000000000000000000000000000000000000000000000000000004
[11]: 5553444300000000000000000000000000000000000000000000000000000000
[12]: 0000000000000000000000000000000000000000000000000000000000000004
[13]: 5745544800000000000000000000000000000000000000000000000000000000
[14]: 0000000000000000000000000000000000000000000000000000000000000004
[15]: 5553444300000000000000000000000000000000000000000000000000000000

==> 0x0376ae94DB1bAd7774eB2BA646FF61715B4b5D82   Opyn WETH Put $460 12/04/20 (oWETH Put...)

To: Contract 0xcc5d905b9c2c8c9329eb4e25dc086369d6c7777c (Opyn: Options Factory) 
Function: createOptionsContract(string _collateralType, int32 _collateralExp, string _underlyingType, int32 _underlyingExp, int32 _oTokenExchangeExp, uint256 _strikePrice, int32 _strikeExp, string _strikeAsset, uint256 _expiry, uint256 _windowSize)

MethodID: 0xa1b72d8a
[0]:  0000000000000000000000000000000000000000000000000000000000000140
[1]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa
[2]:  0000000000000000000000000000000000000000000000000000000000000180
[3]:  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee
[4]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9
[5]:  0000000000000000000000000000000000000000000000000000000000000023
[6]:  fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8
[7]:  00000000000000000000000000000000000000000000000000000000000001c0
[8]:  000000000000000000000000000000000000000000000000000000005fe59c00
[9]:  000000000000000000000000000000000000000000000000000000005fe59c00
[10]: 0000000000000000000000000000000000000000000000000000000000000004
[11]: 5553444300000000000000000000000000000000000000000000000000000000
[12]: 0000000000000000000000000000000000000000000000000000000000000003
[13]: 554e490000000000000000000000000000000000000000000000000000000000
[14]: 0000000000000000000000000000000000000000000000000000000000000004
[15]: 5553444300000000000000000000000000000000000000000000000000000000

==> 0x9E22B1c5804F7aC179b77De79a32e458A0ECb651   Opyn UNI Put $3.5 12/25/20 (oUNI Put ...)



// https://cn.etherscan.com/address/0xde99ea535749f02da84d13e6f8253291e32d3a7f

// From: 0xde99ea535749f02da84d13e6f8253291e32d3a7f 
// To: Contract 0xc0a47dfe034b400b47bdad5fecda2621de6c4d95 (Uniswap: Factory Contract)
// Function: createExchange(address token)
// MethodID: 0x1648f38e
// [0]:  0000000000000000000000007eb6dd0cc2df2eae901f76a151ca82bb7be10d68  = Opyn ETH Call $640 12/25/20 (oETH Call...)  

// To: Contract 0x7eb6dd0cc2df2eae901f76a151ca82bb7be10d68 
// Value: 0.01 Ether
// Function: createETHCollateralOption(uint256 amtToCreate, address receiver) ***
// MethodID: 0xed1f41c3
// [0]:  000000000000000000000000000000000000000000000000000000000061a800  ==> 6400000
// [1]:  000000000000000000000000de99ea535749f02da84d13e6f8253291e32d3a7f

// To: Contract 0x7eb6dd0cc2df2eae901f76a151ca82bb7be10d68 
// Function: approve(address _spender, uint256 _value) ***
// MethodID: 0x095ea7b3
// [0]:  00000000000000000000000018ce10e321f22464bef1f8962d521397df475c3b  =  Uniswap V1 (UNI-V1)
// [1]:  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

// Nov-19-2020 10:00:50 PM +UTC
// To: Contract 0x18ce10e321f22464bef1f8962d521397df475c3b (Uniswap: oETH Call $640 12/25/20) 
// Value: 0.0002230391871 Ether
// Function: addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) ***
// MethodID: 0x422f1043
// [0]:  0000000000000000000000000000000000000000000000000000000000000000
// [1]:  00000000000000000000000000000000000000000000000000000000005fbdcd  ==> 6274509
// [2]:  000000000000000000000000000000000000000000000000000000005fb6ee57  ==>  1605824087 = 2020/11/20 6:14:47

// 构建 WETH Put $460
// To: Contract 0xc0a47dfe034b400b47bdad5fecda2621de6c4d95 (Uniswap: Factory Contract) 
// Function: createExchange(address token)
// MethodID: 0x1648f38e
// [0]:  0000000000000000000000000376ae94db1bad7774eb2ba646ff61715b4b5d82  =  Token Opyn WETH Put $460 12/04/20 

// To:  Contract 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 (USD Coin) 
// Function: approve(address _spender, uint256 _value) ***
// MethodID: 0x095ea7b3
// [0]:  0000000000000000000000000376ae94db1bad7774eb2ba646ff61715b4b5d82
// [1]:  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

// To: Contract 0x7a250d5630b4cf539739df2c5dacb4c659f2488d (Uniswap V2: Router 2)
// Value: 0.042688631284006515 Ether
// Function: swapETHForExactTokens(uint256 amountOut, address[] path, address to, uint256 deadline)
// MethodID: 0xfb3bdb41
// [0]:  0000000000000000000000000000000000000000000000000000000001312d00  ==> 20000000
// [1]:  0000000000000000000000000000000000000000000000000000000000000080
// [2]:  000000000000000000000000de99ea535749f02da84d13e6f8253291e32d3a7f
// [3]:  000000000000000000000000000000000000000000000000000000005fb6f222
// [4]:  0000000000000000000000000000000000000000000000000000000000000003
// [5]:  000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2   ==> Wrapped Ether (WETH) (@$584.5200)
// [6]:  000000000000000000000000c00e94cb662c3520282e6f5717214004a7f26888   ==> Compound (COMP) (@$123.7200)
// [7]:  000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48   ==> USD Coin (USDC) (@$0.9975)
// ==> 0.0426 eth 买了 20USDC

// To: Contract 0x0376ae94db1bad7774eb2ba646ff61715b4b5d82  => Token Opyn WETH Put $460 12/04/20 
// Function: createERC20CollateralOption(uint256 amtToCreate, uint256 amtCollateral, address receiver)
// MethodID: 0x52f89fe3
// [0]:  000000000000000000000000000000000000000000000000000000000001a892  == 108690
// [1]:  00000000000000000000000000000000000000000000000000000000004c4b40  == 5000000
// [2]:  000000000000000000000000de99ea535749f02da84d13e6f8253291e32d3a7f

// To: Contract 0x0376ae94db1bad7774eb2ba646ff61715b4b5d82
// Function: approve(address _spender, uint256 _value) ***
// MethodID: 0x095ea7b3
// [0]:  000000000000000000000000640ed2f98ef97b1a2bd2e44cb0aa5a50748ebf18  = Uniswap V1 (UNI-V1)
// [1]:  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

// To: Contract 0x640ed2f98ef97b1a2bd2e44cb0aa5a50748ebf18 (Uniswap: oWETH Put $460 12/04/20) 
// Value: 0.00036496115 Ether
// Function: addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) ***
// MethodID: 0x422f1043
// [0]:  0000000000000000000000000000000000000000000000000000000000000000
// [1]:  000000000000000000000000000000000000000000000000000000000001a03e  == 106558
// [2]:  000000000000000000000000000000000000000000000000000000005fb6f1e6



// To: Contract 0xc0a47dfe034b400b47bdad5fecda2621de6c4d95 (Uniswap: Factory Contract) 
// Function: createExchange(address token)
// MethodID: 0x1648f38e
// [0]:  0000000000000000000000009e22b1c5804f7ac179b77de79a32e458a0ecb651

// To: Contract 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 (USD Coin) 
// Function: approve(address _spender, uint256 _value) ***
// MethodID: 0x095ea7b3
// [0]:  0000000000000000000000009e22b1c5804f7ac179b77de79a32e458a0ecb651
// [1]:  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

// Interacted With (To): Contract 0x9e22b1c5804f7ac179b77de79a32e458a0ecb651 
// Function: createERC20CollateralOption(uint256 amtToCreate, uint256 amtCollateral, address receiver) ***
// MethodID: 0x52f89fe3
// [0]:  0000000000000000000000000000000000000000000000000000000000d9fb92
// [1]:  00000000000000000000000000000000000000000000000000000000004c4b40
// [2]:  000000000000000000000000de99ea535749f02da84d13e6f8253291e32d3a7f

// To:Contract 0x9e22b1c5804f7ac179b77de79a32e458a0ecb651
// Function: approve(address _spender, uint256 _value) ***
// MethodID: 0x095ea7b3
// [0]:  000000000000000000000000d0b10ffd0647fa3c7c7d7c9430343dfd3152d34c  =  Uniswap: oUNI Put $3.5 12/25/20
// [1]:  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

// To: Contract 0xd0b10ffd0647fa3c7c7d7c9430343dfd3152d34c (Uniswap: oUNI Put $3.5 12/25/20)
// Value: 0.001214016154 Ether
// Function: addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) ***
// MethodID: 0x422f1043
// [0]:  0000000000000000000000000000000000000000000000000000000000000000
// [1]:  0000000000000000000000000000000000000000000000000000000000d5b561  ==> 1400 5601
// [2]:  000000000000000000000000000000000000000000000000000000005fb6f431

// To: Contract 0x354924f645e120b3e981e35b4964b79e63d6a27a (Uniswap: oETH Call $500 12/25/20) 
// Value: 0.0006549764736 Ether
// Function: addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) ***
// MethodID: 0x422f1043
// [0]:  0000000000000000000000000000000000000000000000000000000000000000
// [1]:  00000000000000000000000000000000000000000000000000000000004acc48   ==> 490 1960
// [2]:  000000000000000000000000000000000000000000000000000000005fb6f7ba


// To: Contract 0x39246c4f3f6592c974ebc44f80ba6dc69b817c71 (Opyn: Options Exchange) 
// Value: 0.001266141502321341
// Function: buyOTokens(address receiver, address oTokenAddress, address paymentTokenAddress, uint256 oTokensToBuy)
// MethodID: 0x90a21dbf
// [0]:  000000000000000000000000de99ea535749f02da84d13e6f8253291e32d3a7f
// [1]:  000000000000000000000000c6b11850241c5127eab73af4b6c68bc267cbbff4
// [2]:  0000000000000000000000000000000000000000000000000000000000000000
// [3]:  00000000000000000000000000000000000000000000000000000000000f4240



## 合约
支付 eth 买 
To: Contract 0x39246c4f3f6592c974ebc44f80ba6dc69b817c71 (Opyn: Options Exchange) 
Value: 0.264096950616572382 Ether ($162.78)
Function: buyOTokens(address receiver, address oTokenAddress, address paymentTokenAddress, uint256 oTokensToBuy)
MethodID: 0x90a21dbf
[0]:  0000000000000000000000007098d5ee6c5f1d1641f3a872e9acf0b97cc8aa75  => receiver
[1]:  0000000000000000000000007eb6dd0cc2df2eae901f76a151ca82bb7be10d68  => oTokenAddress = Opyn ETH Call $640 12/25/20
[2]:  0000000000000000000000000000000000000000000000000000000000000000  => paymentTokenAddress
[3]:  000000000000000000000000000000000000000000000000000000017d784000  => oTokensToBuy = 6400000000


支付 卖 eth
To:
 Contract 0x7eb6dd0cc2df2eae901f76a151ca82bb7be10d68 
 Function: addAndSellETHCollateralOption(uint256 amtToCreate, address receiver) ***
Value: 10 Ether ($6,161.3
MethodID: 0xcfbea789
[0]:  000000000000000000000000000000000000000000000000000000017d784000
[1]:  000000000000000000000000c5df4d5ed23f645687a867d8f83a41836fcf8811

SellOTokens>>6400000000
Function: ethToTokenSwapOutput(uint256 tokens_bought, uint256 deadline) ***
参考 https://cn.etherscan.com/tx/0x94a512bdf27f3b51790a18ce6899059cd3b649fabdb595dd9dd9f4582dc0d5fd#eventlog
