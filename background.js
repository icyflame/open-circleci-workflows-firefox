const defaultPageActionTitle = "Circle CI";
const pageActionEligibleDomains = /^https:\/\/github.com\//;

function isEligible(tab, newURL) {
  const tabURL = tab.url;
  const matchObj = tabURL && tabURL.match(pageActionEligibleDomains);
  return matchObj && matchObj.length > 0 && newURL !== "";
}

function showPageAction(tab, newURL) {
  const title = defaultPageActionTitle + " => " + newURL;
  const tabId = tab.id;

  browser.pageAction.setTitle({ tabId, title });
  browser.pageAction.show(tabId);
}

function showPageActionIfEligible(tab) {
  const newURL = getWorkflowsURL(tab);
  if (isEligible(tab, newURL)) {
    showPageAction(tab, newURL);
  }
}

function getWorkflowsURL(tab) {
  const tabURL = tab.url || "";
  const accountRepoParts = tabURL.replace(pageActionEligibleDomains, "");
  const components = accountRepoParts.split("/");

  if (components.length >= 2) {
    const account = components[0];
    const repo = components[1];

    if (account != "" && repo != "") {
      const fullURL = "https://circleci.com/gh/" + account + "/" + repo;
      return fullURL;
    }
  }

  return "";
}

browser.pageAction.onClicked.addListener((tab) => {
  const newURL = getWorkflowsURL(tab);
  if (newURL !== "") {
    browser.tabs.update({
      url: newURL
    });
  }
});

// Whenever a tab updates, check if it is eligible for this page action. If yes, show the page
// action.
browser.tabs.onUpdated.addListener((tabID, changeInfo, tab) => {
  showPageActionIfEligible(tab);
});
