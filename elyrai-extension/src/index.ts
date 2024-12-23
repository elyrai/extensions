import handlerJUP from "./jupiter/handler";
import handlerMET from "./meteora/handler";

(function () {
  console.log("Hello from Elyrai Extension!");

  let currentUrl = window.location.href;

  const observer = new MutationObserver(async () => {
    if (currentUrl !== window.location.href) {
      currentUrl = window.location.href;
      if (currentUrl.includes("meteora")) {
        await handlerMET();
      } else {
        await handlerJUP();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(async () => {
    if (currentUrl.includes("meteora")) {
      handlerMET();
    } else {
      handlerJUP();
    }
  }, 1000);
})();
