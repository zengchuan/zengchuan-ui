System.config({
  "baseURL": "./",
  "transpiler": "traceur",
  "traceurOptions": {
    "optional": [
      "runtime"
    ]
  },
  "defaultJSExtensions": true,
  "paths": {
    "*": "*.js",
    "zengchuan-ui/*": "app/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "zc-bootstrap": "app/core/boot/bootstrap.js",
    "zc-bootstrap.test": "app/core/boot/bootstrap.test.js"
  }

});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.4.1",
    "angular-animate": "github:angular/bower-angular-animate@1.4.1",
    "angular-bootstrap": "github:angular-ui/bootstrap-bower@0.13.0",
    "angular-cookies": "github:angular/bower-angular-cookies@1.4.1",
    "angular-loading-bar": "github:chieffancypants/angular-loading-bar@0.7.1",
    "angular-local-storage": "npm:angular-local-storage@0.2.2",
    "angular-mocks": "github:angular/bower-angular-mocks@1.4.1",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.4.1",
    "angular-translate": "github:angular-translate/bower-angular-translate@2.7.2",
    "angular-translate/bower-angular-translate-loader-partial": "github:angular-translate/bower-angular-translate-loader-partial@2.7.2",
    "angular-translate/bower-angular-translate-storage-cookie": "github:angular-translate/bower-angular-translate-storage-cookie@2.7.2",
    "angular-translate/bower-angular-translate-storage-local": "github:angular-translate/bower-angular-translate-storage-local@2.7.2",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "angular-ui-router-extras": "github:christopherthielen/ui-router-extras@0.0.13",
    "angular-ui-select": "github:angular-ui/ui-select@0.12.0",
    "angular-ui/ui-date": "github:angular-ui/ui-date@0.0.8",
    "angular-ui/ui-grid.info": "github:angular-ui/ui-grid.info@3.0.0-rc.22",
    "angular-ui/ui-tinymce": "github:angular-ui/ui-tinymce@0.0.9",
    "angular-ui/ui-utils": "github:angular-ui/ui-utils@0.2.3",
    "babel": "npm:babel-core@5.6.11",
    "babel-runtime": "npm:babel-runtime@5.6.11",
    "font-awesome": "npm:font-awesome@4.3.0",
    "fyockm/bootstrap-css-only": "github:fyockm/bootstrap-css-only@3.3.4",
    "jquery": "github:components/jquery@2.1.4",
    "jquery-ui": "github:components/jqueryui@1.11.4",
    "json": "github:systemjs/plugin-json@0.1.0",
    "lodash": "npm:lodash@3.9.3",
    "restangular": "github:mgonto/restangular@1.5.1",
    "text": "github:systemjs/plugin-text@0.0.2",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "github:angular-translate/bower-angular-translate-storage-cookie@2.7.2": {
      "angular-translate": "github:angular-translate/bower-angular-translate@2.7.2"
    },
    "github:angular-translate/bower-angular-translate-storage-local@2.7.2": {
      "angular-translate": "github:angular-translate/bower-angular-translate@2.7.2"
    },
    "github:angular-translate/bower-angular-translate@2.7.2": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular-ui/ui-utils@0.2.3": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-angular-animate@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-angular-cookies@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-angular-mocks@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-angular-sanitize@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:components/jqueryui@1.11.4": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:mgonto/restangular@1.5.1": {
      "angular": "github:angular/bower-angular@1.4.1",
      "lodash": "npm:lodash@3.9.3"
    },
    "npm:babel-runtime@5.6.11": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:font-awesome@4.3.0": {
      "css": "github:systemjs/plugin-css@0.1.13"
    },
    "npm:lodash@3.9.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

