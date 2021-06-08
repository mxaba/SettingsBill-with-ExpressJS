// eslint-disable-next-line func-names
module.exports = function () {
  let callCost;
  let smsCost;
  let warningLevel;
  let criticalLevel;
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
    callCost = parseFloat(objectPassed.callCost);
    smsCost = parseFloat(objectPassed.smsCost);
    warningLevel = parseFloat(objectPassed.warningLevel);
    criticalLevel = parseFloat(objectPassed.criticalLevel);
    getBillSettings();
  }

  function actionSetBillSettings(actionPassed) {
    let combinedCost;
    if (actionPassed === 'call') {
      combinedCost = callCost;
    } else if (actionPassed === 'sms') {
      combinedCost = smsCost;
    } actionArray.push({
      type: actionPassed,
      timestamp: new Date(),
      combinedCost,
    });
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

  return {
    setBillSettings,
    getBillSettings,
    actionSetBillSettings,
    getTotals,
    grandTotal,
  };
};
