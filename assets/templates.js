(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['mainModel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"row\">\n  <div class=\"col-md-4\">\n      <div class=\"card form-card\">\n          <div class=\"pre-scrollable\">\n"
    + ((stack1 = container.invokePartial(partials.marketInputs,depth0,{"name":"marketInputs","data":data,"indent":"              ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "          </div>\n      </div><!-- /.card -->\n      <!-- <a class=\"small\" href=\"#\">Help</a><br><br>a modal -->\n  </div>\n  <div class=\"col-md-8 text-xs-center\">\n      <div class=\"row\">\n          <div class=\"col-md-12\">\n              <div class=\"card\">\n                <div id='progress'>\n"
    + ((stack1 = container.invokePartial(partials.progressbar,depth0,{"name":"progressbar","data":data,"indent":"                  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </div>\n                <div id=\"chart\">\n                </div>\n                <div id=\"hist\">\n                </div>\n              </div>\n          </div>\n      </div>\n  </div>\n</div>\n<div class='row'>\n  <div class=\"col-md-4\">\n      <div class=\"card form-card\" id='showValues'>\n"
    + ((stack1 = container.invokePartial(partials.showValues,depth0,{"name":"showValues","data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "      </div><!-- /.card -->\n  </div>\n  <div class=\"col-md-8 text-xs-center\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"card\">\n            <div id='riskContributions'>\n            </div>\n          </div>\n        </div>\n    </div>\n  </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['marketInputs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"small marketRisk\">\n    <fieldset class=\"form-group\">\n        <label for=\"a\">a</label>\n        <input type=\"text\" class=\"form-control form-control-sm\" id=\"a\" placeholder=\".2\">\n    </fieldset>\n    <fieldset class=\"form-group\">\n        <label for=\"sigma\">sigma</label>\n        <input type=\"text\" class=\"form-control form-control-sm\" id=\"sigma\" placeholder=\".04\">\n    </fieldset>\n    <fieldset class=\"form-group\">\n        <label for=\"n\">n</label>\n        <input type=\"text\" class=\"form-control form-control-sm\" id=\"n\" placeholder=\"1000\">\n    </fieldset>\n    <fieldset class=\"form-group\">\n        <label for=\"t\">Days to simulate</label>\n        <input type=\"text\" class=\"form-control form-control-sm\" id=\"t\" placeholder=\"10\">\n    </fieldset>\n    <button id='marketSubmit' type=\"submit\" class=\"btn btn-sm btn-info-outline\">Submit</button>\n</form>\n";
},"useData":true});
templates['progressbar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<progress id='progressBar' style='"
    + alias4(((helper = (helper = helpers.style || (depth0 != null ? depth0.style : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"style","hash":{},"data":data}) : helper)))
    + "' class=\"progress progress-info\" value=\""
    + alias4(((helper = (helper = helpers.progress || (depth0 != null ? depth0.progress : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"progress","hash":{},"data":data}) : helper)))
    + "\" max=\"100\">0%</progress>\n";
},"useData":true});
templates['showValues'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "      <li class=\"list-group-item\">"
    + alias2(alias1((depth0 != null ? depth0.label : depth0), depth0))
    + ": "
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class='card'>\n  <ul class=\"list-group list-group-flush\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.overview : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </ul>\n</div>\n";
},"useData":true});
})();