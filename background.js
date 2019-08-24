const defaultPageActionTitle = 'Circle CI';
const pageActionEligibleDomains = /^https:\/\/github.com\//;

function isEligible (tab, newURL) {
  const tabURL = tab.url;
  const matchObj = tabURL && tabURL.match(pageActionEligibleDomains);
  return matchObj && matchObj.length > 0 && newURL !== '';
}

function showPageAction (tab, newURL) {
  const title = defaultPageActionTitle + ' => ' + newURL;
  const tabId = tab.id;

  chrome.pageAction.setTitle({ tabId, title });
  chrome.pageAction.show(tabId);
}

function showPageActionIfEligible (tab) {
  const newURL = getWorkflowsURL(tab);
  if (isEligible(tab, newURL)) {
    showPageAction(tab, newURL);
  }
}

function getWorkflowsURL (tab) {
  const tabURL = tab.url || '';
  const accountRepoParts = tabURL.replace(pageActionEligibleDomains, '');
  const components = accountRepoParts.split('/');

  if (components.length >= 2) {
    const account = components[0];
    const repo = components[1];

    if (account !== '' && repo !== '') {
      const fullURL = 'https://circleci.com/gh/' + account + '/' + repo;
      return fullURL;
    }
  }

  return '';
}

chrome.pageAction.onClicked.addListener((tab) => {
  const newURL = getWorkflowsURL(tab);
  if (newURL !== '') {
    chrome.tabs.update({
      url: newURL
    });
  }
});

// Whenever a tab updates, check if it is eligible for this page action. If yes, show the page
// action.
chrome.tabs.onUpdated.addListener((tabID, changeInfo, tab) => {
  showPageActionIfEligible(tab);
});
