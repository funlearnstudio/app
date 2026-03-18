(function () {
  function runTemplateHealthCheck(times = 10) {
    const G = window.RigorousGenerator;
    if (!G || !G.templates) {
      console.error("❌ Generator not ready");
      return;
    }

    const report = [];

    Object.entries(G.templates).forEach(([name, tpl]) => {
      let ok = 0, fail = 0;

      for (let i = 0; i < times; i++) {
        try {
          const r = tpl.fn();
          if (r && r.question && r.options) ok++;
          else fail++;
        } catch {
          fail++;
        }
      }

      report.push({
        template: name,
        tags: tpl.tags,
        ok,
        fail
      });
    });

    console.table(report);
    return report;
  }

  window.runTemplateHealthCheck = runTemplateHealthCheck;
})();
