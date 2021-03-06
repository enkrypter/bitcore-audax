import { BitcoreLibAudax } from 'crypto-wallet-core';
import _ from 'lodash';
import { IChain } from '..';
import { BtcChain } from '../btc';

const Errors = require('../../errors/errordefinitions');

export class AudaxChain extends BtcChain implements IChain {
  constructor() {
    super(BitcoreLibAudax);
  }

  validateAddress(wallet, inaddr, opts) {
    const A = BitcoreLibAudax.Address;
    let addr: {
      network?: string;
      toString?: (cashAddr: boolean) => string;
    } = {};
    try {
      addr = new A(inaddr);
    } catch (ex) {
      return Errors.INVALID_ADDRESS;
    }
    if (addr.network.toString() != wallet.network) {
      return Errors.INCORRECT_ADDRESS_NETWORK;
    }
    if (!opts.noCashAddr) {
      if (addr.toString(true) != inaddr) return Errors.ONLY_CASHADDR;
    }
    return;
  }
}
