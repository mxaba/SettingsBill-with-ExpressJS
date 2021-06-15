// eslint-disable-next-line func-names
module.exports = function () {
  let callCost = 0;
  let smsCost = 0;
  let warningLevel = 0;
  let criticalLevel = 0;
  const actionArray = [];

  function getBillSettings() {
    return {
      callCost,
      smsCost,
      warningLevel,
      criticalLevel,
    };
  }

  function setBillSettings(objectPassed) {
    if (objectPassed.callCost !== '' && objectPassed.smsCost !== '' && objectPassed.warningLevel !== '' && objectPassed.criticalLevel !== '') {
      callCost = parseFloat(objectPassed.callCost);
      smsCost = parseFloat(objectPassed.smsCost);
      warningLevel = parseFloat(objectPassed.warningLevel);
      criticalLevel = parseFloat(objectPassed.criticalLevel);
      getBillSettings();
    }
  }

  function makeCallOrSms(actionPassed) {
    let combinedCost = '';
    // eslint-disable-next-line no-use-before-define
    if (!(grandTotal() >= criticalLevel)) {
      if (actionPassed === 'call') {
        combinedCost = callCost;
      } else if (actionPassed === 'sms') {
        combinedCost = smsCost;
      }
      if (combinedCost !== '') {
        actionArray.push({
          type: actionPassed,
          timestamp: new Date(),
          combinedCost,
        });
      }
    }
  }

  function setCallSms(actionTyp) {
    let total = 0;
    actionArray.forEach((element) => {
      if (element.type === actionTyp) {
        total += element.combinedCost;
      }
    });
    return total.toFixed(2);
  }

  function grandTotal() {
    const callsmsTotal = parseFloat(setCallSms('call')) + parseFloat(setCallSms('sms'));
    return callsmsTotal.toFixed(2);
  }

  function getTotals() {
    const callTotal = setCallSms('call');
    const smsTotal = setCallSms('sms');
    return {
      callTotal,
      smsTotal,
    };
  }

  function addClass() {
    let colorWord;
    if (grandTotal() >= criticalLevel && grandTotal() > 0.00) {
      colorWord = 'danger';
    } if (grandTotal() >= warningLevel && grandTotal() < criticalLevel) {
      colorWord = 'warning';
    }
    return colorWord;
  }

  function getArray() {
    return actionArray;
  }

  function whichActions(actionPassed) {
    const filtered = [];
    console.log(actionPassed);
    actionArray.forEach((element) => {
      console.log(element.type);
      if (element.type === actionPassed) {
        filtered.push(element);
      }
    });
    return filtered;
  }

  return {
    setBillSettings,
    getBillSettings,
    makeCallOrSms,
    getTotals,
    grandTotal,
    addClass,
    getArray,
    whichActions,
  };
};
