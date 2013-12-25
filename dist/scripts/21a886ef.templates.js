Ember.TEMPLATES.application=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h="",i=this.escapeExpression;return e.buffer.push('<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n  <div class="container">\n    <div class="navbar-header">\n      <a class="navbar-brand" href="/">~+In†erne† Phø†obøø†h+~</a>\n    </div>\n  </div>\n</div>\n\n<div class="container">\n  '),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"outlet",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push('\n\n  <hr />\n  <footer>\n    <p><span class="glyphicon glyphicon-flash"></span>Made by <a href="https://twitter.com/dianagliu">@dianagliu</a></p>\n  </footer>\n</div>\n'),h}),Ember.TEMPLATES.camera=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h="",i=this.escapeExpression;return e.buffer.push('<div class="container">\n  <div id="camera">\n    <!-- Video shows a live stream from the camera -->\n    <video id="video" autoplay>Sorry, your browser isn\'t supported.</video>\n    <!-- what is canva spreview for? -->\n    <div id="canvas-preview"></div>\n    <!-- What is canvas used for? -->\n    <canvas id="photo"></canvas>\n  </div>\n\n  <div id="camera_controls">\n    <button class="btn btn-primary btn-large" '),f={},g={},e.buffer.push(i(c.action.call(b,"takePicture",{hash:{},contexts:[b],types:["STRING"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push('>\n      <span class="glyphicon glyphicon-camera"></span>\n      Take Picture\n    </button>\n  </div>\n</div>\n\n\n'),h}),Ember.TEMPLATES.gallery=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f="";return b.buffer.push("\n    <button "),d={},e={},b.buffer.push(l(c.action.call(a,"clearGallery",{hash:{},contexts:[a],types:["STRING"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push(' type="button" class="btn btn-danger">\n      <span class="glyphicon glyphicon-trash"></span>\n      Delete All Souls\n    </button>\n    '),f}function g(a,b){var d,e,f="";return b.buffer.push("\n      <li>\n        <img "),d={src:a},e={src:"STRING"},b.buffer.push(l(c.bindAttr.call(a,{hash:{src:"source"},contexts:[],types:[],hashContexts:d,hashTypes:e,data:b}))),b.buffer.push(' class="img-thumbnail img-responsive">\n        <button '),e={},d={},b.buffer.push(l(c.action.call(a,"deletePhoto",{hash:{},contexts:[a],types:["STRING"],hashContexts:d,hashTypes:e,data:b}))),b.buffer.push(' type="button" class="btn btn-danger">\n          <span class="glyphicon glyphicon-remove"></span>\n          Delete\n        </button>\n      </li>\n      '),f}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var h,i,j,k="",l=this.escapeExpression,m=this;return e.buffer.push('<div class="panel panel-default">\n  <div class="panel-heading">\n    <h3>\n      <span class="glyphicon glyphicon-lock"></span>\n      Saved Souls\n    </h3>\n    '),i={},j={},h=c["if"].call(b,"model",{hash:{},inverse:m.noop,fn:m.program(1,f,e),contexts:[b],types:["ID"],hashContexts:j,hashTypes:i,data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push('\n  </div>\n\n  <div class="panel-body">\n    <ul class="list-unstyled">\n      '),i={},j={},h=c.each.call(b,"controller",{hash:{},inverse:m.noop,fn:m.program(3,g,e),contexts:[b],types:["ID"],hashContexts:j,hashTypes:i,data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n    </ul>\n  </div>\n</div>\n\n"),k}),Ember.TEMPLATES.index=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h,i,j="",k=c.helperMissing,l=this.escapeExpression;return e.buffer.push('<div id="errorMessage" class="alert alert-warning">\n  <p>Hi, click \'Allow\' up there to split your soul. We\'ll keep it safe for you.</p>\n</div>\n\n<div class="row">\n  <div class="col-md-8">\n    '),g={},h={},i={hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e},e.buffer.push(l((f=c.outlet||b.outlet,f?f.call(b,"camera",i):k.call(b,"outlet","camera",i)))),e.buffer.push('\n  </div>\n\n  <div class="col-md-4">\n    '),g={},h={},i={hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e},e.buffer.push(l((f=c.outlet||b.outlet,f?f.call(b,"gallery",i):k.call(b,"outlet","gallery",i)))),e.buffer.push("\n  </div>\n</div>\n\n"),j});