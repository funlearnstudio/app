(function (window) {
  'use strict';

  console.log("🧠 [Templates Core] Loaded");

  /* ================================
   * 年級 alias & 工具
   * ================================ */
  const GRADE_ALIAS = {
    "國七上": "國七", "國七下": "國七",
    "國八上": "國八", "國八下": "國八",
    "國九上": "國九", "國九下": "國九"
  };

  const CORE_GRADES = ["國七", "國八", "國九"];

  function normalizeTags(tags = []) {
    return tags.map(t => GRADE_ALIAS[t] || t);
  }

  function extractGrade(tags = []) {
    return normalizeTags(tags).find(t => CORE_GRADES.includes(t));
  }

  function waitForRigorous(cb) {
    if (
      !window.RigorousGenerator ||
      !window.RigorousGenerator.registerTemplate
    ) {
      return setTimeout(() => waitForRigorous(cb), 50);
    }
    cb(window.RigorousGenerator);
  }

  window.TemplateCore = {
    normalizeTags,
    extractGrade,
    CORE_GRADES,
    waitForRigorous
  };

})();
