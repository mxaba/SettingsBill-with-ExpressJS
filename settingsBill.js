// eslint-disable-next-line func-names
module.exports = function () {
  let callCost;
  let smsCost;
  let warningLevel;
  let criticalLevel;

  function getBillSettings() {
    return {
      callCost,
      smsCost,
      warningLevel,
      criticalLevel,
    };
  }

  function setBillSettings(objectPassed) {
    callCost = Number(objectPassed.callCost);
    smsCost = Number(objectPassed.smsCost);
    warningLevel = Number(objectPassed.warningLevel);
    criticalLevel = Number(objectPassed.criticalLevel);
    getBillSettings();
  }

  return {
    setBillSettings,
    getBillSettings,
  };
};
