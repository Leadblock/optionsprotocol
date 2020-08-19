import {
  OptionsFactoryInstance,
  OTokenInstance,
  Erc20MintableInstance
} from '../../build/types/truffle-types';

import BigNumber from 'bignumber.js';
const {time, expectRevert, expectEvent} = require('@openzeppelin/test-helpers');

const OTokenContract = artifacts.require('oToken');
const OptionsFactory = artifacts.require('OptionsFactory');
const MintableToken = artifacts.require('ERC20Mintable');

import Reverter from '../utils/reverter';

contract('OptionsContract: weth put', accounts => {
  const reverter = new Reverter(web3);

  const creatorAddress = accounts[0];
  const firstOwner = accounts[1];
  const tokenHolder = accounts[2];

  let optionsFactory: OptionsFactoryInstance;
  let oWeth: OTokenInstance;
  // let oracle: MockwethoundOracleInstance;
  let weth: Erc20MintableInstance;
  let usdc: Erc20MintableInstance;

  const usdcAmount = '1000000000'; // 1000 USDC
  const wethAmount = '1000000000000000000000'; // 1000 weth

  const _name = 'TH put 250';
  const _symbol = 'oEth 250';

  before('set up contracts', async () => {
    const now = (await time.latest()).toNumber();
    const expiry = now + time.duration.days(30).toNumber();
    const windowSize = expiry; // time.duration.days(1).toNumber();

    // 1. Deploy mock contracts
    // 1.2 Mock weth contract
    weth = await MintableToken.new();
    await weth.mint(creatorAddress, wethAmount); // 1000 weth
    await weth.mint(tokenHolder, wethAmount);

    // 1.3 Mock USDC contract
    usdc = await MintableToken.new();
    await usdc.mint(creatorAddress, usdcAmount);
    await usdc.mint(firstOwner, usdcAmount);

    // 2. Deploy the Options Factory contract and add assets to it
    optionsFactory = await OptionsFactory.deployed();

    await optionsFactory.addAsset('WETH', weth.address);
    await optionsFactory.addAsset('USDC', usdc.address);

    // Create the unexpired options contract
    const optionsContractResult = await optionsFactory.createOptionsContract(
      'USDC',
      -6,
      'WETH',
      -18,
      -6,
      25,
      -5,
      'USDC',
      expiry,
      windowSize,
      {from: creatorAddress}
    );

    const optionsContractAddr = optionsContractResult.logs[1].args[0];
    oWeth = await OTokenContract.at(optionsContractAddr);

    await reverter.snapshot();
  });

  describe('New option parameter test', () => {
    it('should have basic setting', async () => {
      await oWeth.setDetails(_name, _symbol, {
        from: creatorAddress
      });

      assert.equal(await oWeth.name(), String(_name), 'set name error');
      assert.equal(await oWeth.symbol(), String(_symbol), 'set symbol error');
    });

    it('should update parameters', async () => {
      await oWeth.updateParameters('100', '500', 0, 10, {from: creatorAddress});
    });

    it('should open empty vault', async () => {
      await oWeth.openVault({
        from: creatorAddress
      });
      const vault = await oWeth.getVault(creatorAddress);
      assert.equal(vault[0].toString(), '0');
      assert.equal(vault[1].toString(), '0');
      assert.equal(vault[2].toString(), '0');
    });

    it('should add USDC collateral successfully', async () => {
      await usdc.approve(oWeth.address, usdcAmount, {from: creatorAddress});
      await oWeth.addERC20Collateral(creatorAddress, usdcAmount, {
        from: creatorAddress
      });

      // test that the vault's balances have been updated.
      const vault = await oWeth.getVault(creatorAddress);
      assert.equal(vault[0].toString(), usdcAmount);
      assert.equal(vault[1].toString(), '0');
      assert.equal(vault[2].toString(), '0');
    });

    it('should add USDC collateral and Mint', async () => {
      const amountToIssue = new BigNumber('4000000'); // 1000 usdc can issue 4 250 put.

      await usdc.approve(oWeth.address, usdcAmount, {from: firstOwner});

      await expectRevert(
        oWeth.createERC20CollateralOption(
          amountToIssue.plus(1).toString(),
          usdcAmount,
          firstOwner,
          {
            from: firstOwner
          }
        ),
        'unsafe to mint'
      );

      await oWeth.createERC20CollateralOption(
        amountToIssue.toString(),
        usdcAmount,
        firstOwner,
        {
          from: firstOwner
        }
      );

      // test that the vault's balances have been updated.
      const vault = await oWeth.getVault(firstOwner);
      assert.equal(vault[0].toString(), usdcAmount);
      assert.equal(vault[1].toString(), amountToIssue.toString());
      assert.equal(vault[2].toString(), '0');
    });

    it('should not exercise without underlying allowance', async () => {
      await oWeth.transfer(tokenHolder, '4000000', {from: firstOwner}); // transfer 80 oWeth

      await expectRevert(
        oWeth.exercise('4000000', [firstOwner], {
          from: tokenHolder
        }),
        'transfer amount exceeds allowance.'
      );
    });

    it('should be able to exercise', async () => {
      const amountToExercise = '4000000';
      const underlyingRequired = (
        await oWeth.underlyingRequiredToExercise(amountToExercise)
      ).toString();

      await weth.approve(oWeth.address, underlyingRequired, {
        from: tokenHolder
      });

      const exerciseTx = await oWeth.exercise(amountToExercise, [firstOwner], {
        from: tokenHolder
      });

      expectEvent(exerciseTx, 'Exercise', {
        amtUnderlyingToPay: underlyingRequired,
        amtCollateralToPay: '1000000000'
      });

      // test that the vault's balances have been updated.
      const vault = await oWeth.getVault(firstOwner);
      assert.equal(vault[0].toString(), '0');
      assert.equal(vault[1].toString(), '0');
      assert.equal(vault[2].toString(), underlyingRequired);
    });
  });
});
