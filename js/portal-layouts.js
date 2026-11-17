(function () {
  var STORAGE_KEY = "portal-login-layout";
  var VALID = ["brand", "deel", "vodafone", "epidemic", "klook", "zoho", "emergent"];
  var body = document.body;
  var select = document.getElementById("layoutSelect");

  function applyLayout(value) {
    if (VALID.indexOf(value) === -1) value = "brand";
    body.setAttribute("data-layout", value);
    if (select && select.value !== value) select.value = value;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (err) {
      /* ignore */
    }
    document.dispatchEvent(
      new CustomEvent("portal-layout-change", { detail: { layout: value } })
    );
  }

  var initial = "brand";
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VALID.indexOf(saved) !== -1) initial = saved;
  } catch (err2) {
    /* ignore */
  }

  if (select) {
    select.addEventListener("change", function () {
      applyLayout(select.value);
    });
  }

  applyLayout(initial);
})();
