const config = require("./config");
const http = require("http");

const sayHello = require("./modules/hello");
const getUsers = require("./modules/users");
const getFavicon = require("./modules/favicon");

const server = http
  .createServer((request, response) => {
    const url = new URL(request.url, `http://${config.host}`);

    if (url.pathname === "/favicon.ico") {
      const faviconData = getFavicon();

      if (faviconData.length === 0) {
        response.statusCode = 404;
        response.end();
        return;
      }

      response.statusCode = 200;
      response.header = "Content-Type: image/x-icon";
      response.end(faviconData);
      return;
    }

    if (url.pathname == "/") {
      const hello = url.searchParams.get("hello");
      const users = url.searchParams.get("users");

      if (typeof hello === "string") {
        result = sayHello(hello);

        response.statusCode = result.statusCode;
        response.header = result.header;
        response.end(result.message);
        return;
      }

      if (users !== null) {
        const result = getUsers();
        console.log(result);

        response.statusCode = 200;
        response.header = "Content-Type: application/json";
        response.end(result);
        return;
      }

      response.statusCode = 200;
      response.header = "Content-Type: text/plan";
      response.end("Hello, World!");
      return;
    }

    response.statusCode = 500;
    response.end();
  })

  .listen(config.port, config.host, () =>
    console.log(`Сервер запущен по адресу: http://${config.host}:${config.port}`)
  );
