const config = require("./config");
const http = require("http");
const sayHello = require("./modules/hello");

const server = http
  .createServer((request, response) => {
    // Написать обработчик запроса:
    // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
    // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
    // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
    // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
    // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500

    const url = new URL(request.url, `http://${config.host}`);

    if (url.pathname == "/") {
      const hello = url.searchParams.get("hello");
      const users = url.searchParams.get("users");

      if (typeof hello === "string") {
        result = sayHello(hello);

        response.statusCode = result.statusCode;
        response.header = result.header;
        response.end(result.message);
      }

      if (users !== null) {
        response.statusCode = 200;
        response.header = "Content-Type: application/json";
        response.end(`{test:124,}`);
      }

      response.statusCode = 200;
      response.header = "Content-Type: text/plan";
      response.end("Hello, World!");
    }

    response.statusCode = 500;
    response.end();
  })

  .listen(config.port, config.host, () =>
    console.log(`Server is running on http://${config.host}:${config.port}`)
  );
