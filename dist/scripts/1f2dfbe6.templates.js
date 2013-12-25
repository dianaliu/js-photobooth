Ember.TEMPLATES.application=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h="",i=this.escapeExpression;return e.buffer.push('<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n  <div class="container">\n    <div class="navbar-header">\n      <a class="navbar-brand" href="#">~+In†erne† Phø†obøø†h+~</a>\n    </div>\n  </div>\n</div>\n\n<div class="container">\n  '),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"outlet",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push('\n\n  <hr />\n  <footer>\n    <p><a href="https://twitter.com/dianagliu">@dianagliu</a></p>\n  </footer>\n</div>\n'),h}),Ember.TEMPLATES.camera=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h="",i=this.escapeExpression;return e.buffer.push('<div class="jumbotron">\n  <div class="container">\n    <div id="camera">\n      <!-- Video shows a live stream from the camera -->\n      <video id="video" autoplay>Sorry, your browser isn\'t supported.</video>\n      <!-- what is canva spreview for? -->\n      <div id="canvas-preview"></div>\n      <!-- What is canvas used for? -->\n      <canvas id="photo"></canvas>\n    </div>\n\n    <div id="camera_controls">\n      <button class="btn btn-primary btn-large" '),f={},g={},e.buffer.push(i(c.action.call(b,"takePicture",{hash:{},contexts:[b],types:["STRING"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push(">Take Picture</button>\n    </div>\n  </div>\n</div>\n\n"),h}),Ember.TEMPLATES.gallery=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f="";return b.buffer.push("\n      <li>\n        <img "),d={src:a},e={src:"STRING"},b.buffer.push(k(c.bindAttr.call(a,{hash:{src:"source"},contexts:[],types:[],hashContexts:d,hashTypes:e,data:b}))),b.buffer.push(' class="img-thumbnail img-responsive">\n        <button '),e={},d={},b.buffer.push(k(c.action.call(a,"deletePhoto",{hash:{},contexts:[a],types:["STRING"],hashContexts:d,hashTypes:e,data:b}))),b.buffer.push(' type="button" class="btn btn-danger">\n          <span class="glyphicon glyphicon-remove"></span>\n          Delete\n        </button>\n      </li>\n      '),f}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j="",k=this.escapeExpression,l=this;return e.buffer.push('<div class="panel panel-default">\n  <div class="panel-heading">\n    <h3>Photo Gallery</h3>\n    <button '),h={},i={},e.buffer.push(k(c.action.call(b,"clearGallery",{hash:{},contexts:[b],types:["STRING"],hashContexts:i,hashTypes:h,data:e}))),e.buffer.push(' type="button" class="btn btn-danger">\n      <span class="glyphicon glyphicon-trash"></span>\n      Delete All Photos\n    </button>\n  </div>\n\n  <div class="panel-body">\n    <ul class="list-unstyled">\n      '),h={},i={},g=c.each.call(b,"controller",{hash:{},inverse:l.noop,fn:l.program(1,f,e),contexts:[b],types:["ID"],hashContexts:i,hashTypes:h,data:e}),(g||0===g)&&e.buffer.push(g),e.buffer.push("\n    </ul>\n  </div>\n</div>\n\n"),j}),Ember.TEMPLATES.index=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h,i,j="",k=c.helperMissing,l=this.escapeExpression;return e.buffer.push('<div id="errorMessage" class="alert alert-warning">\n  <p>Camera is not available.</p>\n</div>\n'),g={},h={},i={hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e},e.buffer.push(l((f=c.outlet||b.outlet,f?f.call(b,"camera",i):k.call(b,"outlet","camera",i)))),e.buffer.push('\n\n<div class="row">\n<!--   <div class="col-md-6">\n    <h2>Stickers</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>\n  </div> -->\n  <div class="col-md-6">\n    '),g={},h={},i={hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e},e.buffer.push(l((f=c.outlet||b.outlet,f?f.call(b,"gallery",i):k.call(b,"outlet","gallery",i)))),e.buffer.push("\n  </div>\n</div>\n\n"),j});