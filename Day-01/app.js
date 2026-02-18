const express = require ("express")
/**
 * const express = require ("express")
 * Explanation:

Task Completed
In Node.js, require is a built-in function used to import modules, libraries, or files into your application. It allows you to access and use code from external sources, such as third-party packages (like Express) or your own custom modules, enabling modular programming. Without require, you'd have to write all code in a single file, making projects harder to maintain and scale. For example, in your Day-01/app.js, const express = require("express") loads the Express framework so you can create a web server
 */

const app = express()
/** 
 * const app = express()
 * Explanation:
 * why we use require"


Task Completed
In Node.js, const app = express() creates an instance of the Express application. Express is a web framework for Node.js that simplifies building web servers and APIs. This line initializes an Express app object, which you can then use to define routes, middleware, and start the server. In your Day-01/app.js, this sets up the foundation for handling HTTP requests.
 */

app.listen(3000)

/*
app.listen(3000)
Explanation:

In Node.js, app.listen(3000) starts the Express server and makes it listen for incoming HTTP requests on port 3000.

*/