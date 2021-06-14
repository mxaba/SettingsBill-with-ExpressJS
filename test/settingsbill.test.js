/* eslint-disable no-undef */
const assert = require('assert');
const settingsBill = require('../settingsBill');

describe('Settings Bill Function', () => {
  describe('Setting the values one by one', () => {
    it('Should be able to set the call cost', () => {
      const settingsBillInstance = settingsBill();
      settingsBillInstance.setBillSettings({ callCost: 2.6 });
      assert.equal(2.6, settingsBillInstance.getBillSettings().callCost);
    }); it('Should be able to set the sms cost', () => {
      const settingsBillInstance = settingsBill();
      settingsBillInstance.setBillSettings({ smsCost: 1.6 });
      assert.equal(1.6, settingsBillInstance.getBillSettings().smsCost);
    }); it('Should be able to set the Warning Level', () => {
      const settingsBillInstance = settingsBill();
      settingsBillInstance.setBillSettings({ warningLevel: 10 });
      assert.equal(10, settingsBillInstance.getBillSettings().warningLevel);
    }); it('Should be able to set the Critical Level', () => {
      const settingsBillInstance = settingsBill();
      settingsBillInstance.setBillSettings({ criticalLevel: 15 });
      assert.equal(15, settingsBillInstance.getBillSettings().criticalLevel);
    });
  });
  describe('Setting the values in one argument', () => {
    it('Should be able to set callCost, smsCost, warningLevel, CriticalLevel', () => {
      const settingsBillInstance = settingsBill();
      const ara = {
        callCost: 2.6,
        smsCost: 1.6,
        warningLevel: 10,
        criticalLevel: 15,
      };
      settingsBillInstance.setBillSettings(ara);
      assert.deepEqual(ara, settingsBillInstance.getBillSettings());
    });
  });

  describe('Setting Functions for colors', () => {
    const settingsBillInstance = settingsBill();
    const ara = {
      callCost: 2,
      smsCost: 1,
      warningLevel: 10,
      criticalLevel: 12,
    };
    settingsBillInstance.setBillSettings(ara);
    settingsBillInstance.makeCallOrSms('sms');
    settingsBillInstance.makeCallOrSms('call');
    settingsBillInstance.makeCallOrSms('call');
    settingsBillInstance.makeCallOrSms('sms');
    settingsBillInstance.makeCallOrSms('call');
    settingsBillInstance.makeCallOrSms('sms');
    settingsBillInstance.makeCallOrSms('call');
    it('Should be able to set callCost, smsCost, warningLevel, CriticalLevel', () => {
      assert.deepEqual(ara, settingsBillInstance.getBillSettings());
    });
    it('Should return warning when the cost is above or equal the warning level', () => {
      assert.equal(11.00, settingsBillInstance.grandTotal());
      assert.equal('warning', settingsBillInstance.addClass());
    }); it('Should return danger when the cost is above or equal the critical level', () => {
      settingsBillInstance.makeCallOrSms('call');
      assert.equal(13.00, settingsBillInstance.grandTotal());
      assert.equal('danger', settingsBillInstance.addClass());
    }); it('Should not add once the grand total is above or equal critica level', () => {
      settingsBillInstance.makeCallOrSms('call');
      settingsBillInstance.makeCallOrSms('call');
      settingsBillInstance.makeCallOrSms('call');
      settingsBillInstance.makeCallOrSms('call');
      assert.equal(13.00, settingsBillInstance.grandTotal());
      assert.equal('danger', settingsBillInstance.addClass());
    });
  });

  describe('Settings Bill function for getting colors, calls and sms', () => {
    const settingsBillInstance = settingsBill();
    const ara = {
      callCost: 2.6,
      smsCost: 1.6,
      warningLevel: 10,
      criticalLevel: 15,
    };
    settingsBillInstance.setBillSettings(ara);
    it('Should be able to set callCost, smsCost, warningLevel, CriticalLevel', () => {
      assert.deepEqual(ara, settingsBillInstance.getBillSettings());
    }); it('Should be able to make a call and record the date', () => {
      settingsBillInstance.makeCallOrSms('call');
      settingsBillInstance.makeCallOrSms('call');
      assert.equal(5.2, settingsBillInstance.getTotals().callTotal);
    }); it('Should be able to make a sms and record the date', () => {
      settingsBillInstance.makeCallOrSms('sms');
      settingsBillInstance.makeCallOrSms('sms');
      settingsBillInstance.makeCallOrSms('sms');
      assert.equal(4.8, settingsBillInstance.getTotals().smsTotal);
    }); it('Should return the grnad total of both sms and call', () => {
      assert.equal(10.00, settingsBillInstance.grandTotal());
    }); it('Should return the grnad total of both sms and call', () => {
      assert.equal(10.00, settingsBillInstance.grandTotal());
    });
  });
});
