// addEventListener('fetch', event => {
//   event.respondWith(handleRequest(event.request))
// })
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
  
    // 新增：检查用户是否直接访问代理地址
    if (url.pathname === '/' || url.pathname === '/proxy/') {
      return new Response('404 Not Found', {
        headers: { 'Content-Type': 'text/html' },
        status: status
      });
    }
  
    const actualUrlStr = url.pathname.replace("/proxy/","") + url.search + url.hash
  
    const actualUrl = new URL(actualUrlStr)
  
    const modifiedRequest = new Request(actualUrl, {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: 'follow'
    });
  
    const response = await fetch(modifiedRequest);
    const modifiedResponse = new Response(response.body, response);
  
    // 添加允许跨域访问的响应头
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  
    return modifiedResponse;
  }
}
