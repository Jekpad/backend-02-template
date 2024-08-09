const sayHello = (name) => {
  if (typeof name == "string" && name.length > 0) {
    return { statusCode: 200, header: "Content-Type: text/plain", message: `Hello, ${name}!` };
  }
  return { statusCode: 400, header: "Content-Type: text/plain", message: `Enter a name` };
};

module.exports = sayHello;
