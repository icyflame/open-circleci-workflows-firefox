allTabs = browser.tabs.query({
});

allTabs.then((tabs) => {
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs[i];
    browser.pageAction.setIcon({ tabId: tab.id, path: "icons/cutouts-60.png" });
    browser.pageAction.setTitle({ tabId: tab.id, title: "Circle CI" });
    browser.pageAction.show(tab.id);
  }
});


browser.pageAction.onClicked.addListener((tab) => {
  console.log(tab);
  browser.tabs.update({
    url: "https://circleci.com",
    active: false
  });
});
