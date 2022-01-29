var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path')
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (error, filelist) {
        var title = 'welcome';
        var description = 'Hello, Node.js';
        /* var list = 
        `<ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>`
        */

        /*var list = templatelist(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>
        `);
        response.writeHead(200);
        response.end(template);
        */

        var list = template.list(filelist);
        var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>
        `);
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir('./data', function (error, filelist) {
        //패스 필터
        var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf-8', function (err, description) {
        var title = queryData.id;
        // 보안책으로 입력받은값 변환
        var sanitizedTitle = sanitizeHtml(title);
        var sanitizeDescription = sanitizeHtml(description);

        var list = template.list(filelist);
        //삭제를 a태그로 안하는 이유 :: GET방식이라서
        //보안 취약 , 사용자가 건드릴수있음.
        var html = template.HTML(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizeDescription} `, `
        <a href="/create">create</a>
        <a href="/update?id=${sanitizedTitle}">update</a>
        <form action="/delete_process" method="post" onsubmit="">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
        </form>
        `);
        response.writeHead(200);
        response.end(html);
      });
    });
    }
  }else if(pathname === '/create'){
    fs.readdir('./data', function(error, filelist){
    var title = 'WEB - create';
    var list = template.list(filelist);
    var html = template.HTML(title, list, `
    <form action="/create_process" method="post">
    <p><input type="text" name="title" placeholder="title"></p>
    <p>
      <textarea name="description" placeholder="description"></textarea>
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
    `, '');
    response.writeHead(200);
    response.end(html);
    });
  } else if(pathname === '/create_process'){
    var body = '';
    request.on('data' , function(data){
      body += data;

      //데이터가 너무많을경우 강제종료
      if (body.length > 1e6){
        request.connection.destroy();
      }

    });
    request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`,description, 'utf8', function(err){
        // 200 = 성공
        // 302 = 리다이렉션
        // 301 = 영구적으로바뀜
        response.writeHead(302, {location: `/?id=${title}`});
        response.end();
      })
      console.log(post);
    });
    
  }else if(pathname === '/update'){
    fs.readdir('./data', function (error, filelist) {
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf-8', function (err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(title, list, 
          `
          <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
        <textarea name="description" placeholder="description" >${description}</textarea>
      </p>
      <p>
      <input type="submit">
    </p>
  </form>
          `, `<a href="/create">create</a>
        <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if(pathname === '/update_process'){
    var body = '';
    request.on('data' , function(data){
      body += data;

      //데이터가 너무많을경우 강제종료
      if (body.length > 1e6){
        request.connection.destroy();
      }

    });
    request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`,`data/${title}`, function(err){
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {location: `/?id=${title}`});
          response.end();
      });
    });
  });
  }
  else if(pathname === '/delete_process'){
    var body = '';
    request.on('data' , function(data){
      body += data;

      //데이터가 너무많을경우 강제종료
      if (body.length > 1e6){
        request.connection.destroy();
      }

    });
    request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(){
        response.writeHead(302, {location: `/`});
        response.end();
      });
  });
  }
  else {
    response.writeHead(404);
    response.end('Not found');

  }

});
app.listen(3000);