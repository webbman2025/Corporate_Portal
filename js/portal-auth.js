(function () {
  var form = document.getElementById("portalLoginForm");
  if (!form) return;

  var config = window.PORTAL_AUTH || {};
  var homeUrl = config.homeUrl;
  var isZh = config.lang === "zh";

  var bannerEl = document.getElementById("authBanner");
  var bannerLive = document.getElementById("authBannerLive");
  var userId = document.getElementById("userId");
  var password = document.getElementById("password");
  var submitBtn = document.getElementById("submitLogin");
  var toggleBtn = document.getElementById("togglePassword");

  var messages = {
    en: {
      error: "The company ID or password you entered doesn’t match our records. Check your details or use Need help? below.",
      locked: "This account is temporarily locked after several failed sign-in attempts. Wait 15 minutes or contact your account service manager to unlock it.",
      timeout: "Your session expired. Sign in again to continue to your account.",
      empty: "Enter your company / user ID and password to sign in.",
      signingIn: "Signing in…",
      success: "Signed in (prototype demo). This folder includes login only — add the post-login hub separately if needed."
    },
    zh: {
      error: "公司戶口 / 用戶名稱或密碼不正確。請檢查資料或使用下方「需要協助？」。",
      locked: "由於多次登入失敗，此戶口已暫時鎖定。請等候 15 分鐘或聯絡客戶服務經理解除鎖定。",
      timeout: "你的工作階段已逾時。請重新登入以繼續使用戶口。",
      empty: "請輸入公司 / 用戶名稱及密碼。",
      signingIn: "登入中…",
      success: "已登入（原型示範）。此資料夾只包含登入頁 — 如需登入後首頁請另外加入。"
    }
  };

  var msg = isZh ? messages.zh : messages.en;

  function showBanner(type, text) {
    if (!bannerEl) return;
    bannerEl.hidden = false;
    bannerEl.className = "auth-banner auth-banner--" + type;
    bannerEl.textContent = text;
    if (bannerLive) {
      bannerLive.textContent = text;
    }
  }

  function hideBanner() {
    if (!bannerEl) return;
    bannerEl.hidden = true;
    bannerEl.textContent = "";
    if (bannerLive) bannerLive.textContent = "";
  }

  var params = new URLSearchParams(window.location.search);
  var state = params.get("state");
  if (state === "error") showBanner("error", msg.error);
  else if (state === "locked") showBanner("error", msg.locked);
  else if (state === "timeout") showBanner("info", msg.timeout);

  if (toggleBtn && password) {
    toggleBtn.addEventListener("click", function () {
      var show = password.type === "password";
      password.type = show ? "text" : "password";
      toggleBtn.textContent = show
        ? isZh ? "隱藏" : "Hide"
        : isZh ? "顯示" : "Show";
      toggleBtn.setAttribute("aria-pressed", show ? "true" : "false");
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideBanner();

    var idVal = (userId && userId.value.trim()) || "";
    var passVal = (password && password.value.trim()) || "";

    if (!idVal || !passVal) {
      showBanner("error", msg.empty);
      if (!idVal && userId) userId.focus();
      else if (password) password.focus();
      return;
    }

    if (passVal.toLowerCase() === "fail") {
      var url = new URL(window.location.href);
      url.searchParams.set("state", "error");
      window.history.replaceState({}, "", url);
      showBanner("error", msg.error);
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = msg.signingIn;
    }

    window.setTimeout(function () {
      if (homeUrl) {
        window.location.href = homeUrl;
        return;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = isZh ? "登入" : "Sign in";
      }
      showBanner("info", msg.success);
    }, 650);
  });

  function openHelpFromHash() {
    var help = document.getElementById("help");
    if (!help) return;
    if (window.location.hash === "#help") {
      help.open = true;
      window.setTimeout(function () {
        help.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }
  }

  openHelpFromHash();
  window.addEventListener("hashchange", openHelpFromHash);
})();
