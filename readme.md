# Open CircleCI Workflows - Firefox extension

> Switch from any GitHub repository to it's CircleCI workflows page

A firefox extension that adds a page action to the address bar. Clicking this
page action will open the CircleCI workflows for that repository in the same
tab.

![page-action-screenshot][1]
![page-action-new-link][2]

## Development

Command to bundle into the extension archive:

```sh
zip -r addon.zip manifest.json background.js icons/
```

Code licensed under MIT.

Copyright (C) 2019 Siddharth Kannan <mail@siddharthkannan.in>

[1]: img/page-action-screenshot.png
[2]: img/page-action-new-link.png
