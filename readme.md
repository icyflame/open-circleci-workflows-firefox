# Redirect to CircleCI - Firefox extension

> Switch from any GitHub repository to it's CircleCI workflows page

A firefox extension that adds a page action to the address bar. Clicking this
page action will open the CircleCI workflows for that repository in the same
tab.

Command to bundle into the extension archive:

```sh
zip -r addon.zip manifest.json background.js icons/
```

Code licensed under MIT.

Copyright (C) 2019 Siddharth Kannan <mail@siddharthkannan.in>
