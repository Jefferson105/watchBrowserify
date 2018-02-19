# Watch Browserify

This module aims to watch all files inside a browserify bundle, thus saving building time. 

## Example

_gulpfile.js_
```
    const watchBrowserify = require("./watchBrowserify");
    const browserify = require("browserify");

    var bundle = watchBrowserify(browserify({
        entries: "./src/js/home.jsx",
        extensions: [".js", ".jsx"],
    }));

    bundle.on("update", (bundle) => {
        console.log("Bundle updated");
    });
```

When some file inside the bundle has been changed the event _update_ will be triggered on bundle.