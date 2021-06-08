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

  function setBillSettings(param) {
    callCost = Number(param.callCost);
    smsCost = Number(param.smsCost);
    warningLevel = Number(param.warningLevel);
    criticalLevel = Number(param.criticalLevel);
    getBillSettings();
  }

  return {
    setBillSettings,
    getBillSettings,
  };
};
