const httpProxy = require("http-proxy");
const http = require("http");

const PORT = process.env.PORT || 8080;

const ALLOW_DOMAINS = [

]

http.createServer((req, res) => {

  if (!req.headers['host']) return badRequest(res, "No host header");

  const host = req.headers['host'];

  if (!ALLOW_DOMAINS.includes(host)) return badRequest(res, "Host not allowed");

  console.log("Proxy HTTP request for:", host);
  
  const target = "https://" + host;

  const proxy = httpProxy.createProxyServer({});
  proxy.web(req, res, {target: target}, (error) => {
    console.log("Proxy error:", error);
    return badRequest(res, "Proxy error");
  });

}).listen(PORT);

const badRequest = (res, message) => {
  res.writeHead(400, { "Content-Type": "text/plain" });
  res.end(message);
}
