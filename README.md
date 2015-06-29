主要技术:

angular es6 jspm

前期准备:

安装node.js

在中国你需要安装cnpm，用cnpm代替npm，这样速度会快些 npm install cnmp -g

然后就是2个命令来初始化工程所有需要的环境

cnpm install browser-sync                                 --save-dev      
cnpm install connect-modrewrite                           --save-dev
cnpm install conventional-changelog                       --save-dev
cnpm install david                                        --save-dev
cnpm install del                                          --save-dev
cnpm install es6-module-loader                            --save-dev
cnpm install gulp                                         --save-dev
cnpm install gulp-autoprefixer                            --save-dev
cnpm install gulp-bump                                    --save-dev
cnpm install gulp-bytediff                                --save-dev
cnpm install gulp-cache                                   --save-dev
cnpm install gulp-cdnizer                                 --save-dev
cnpm install gulp-changed                                 --save-dev
cnpm install gulp-concat                                  --save-dev
cnpm install gulp-filter                                  --save-dev
cnpm install gulp-flatten                                 --save-dev
cnpm install gulp-gh-pages                                --save-dev
cnpm install gulp-header                                  --save-dev
cnpm install gulp-help                                    --save-dev
cnpm install gulp-htmlhint                                --save-dev
cnpm install gulp-if                                      --save-dev
cnpm install gulp-imagemin                                --save-dev
cnpm install gulp-inject                                  --save-dev
cnpm install gulp-istanbul-enforcer                       --save-dev
cnpm install gulp-jshint                                  --save-dev
cnpm install gulp-jsonmin                                 --save-dev
cnpm install gulp-load-plugins                            --save-dev
cnpm install gulp-minify-css                              --save-dev
cnpm install gulp-minify-html                             --save-dev
cnpm install gulp-ng-annotate                             --save-dev
cnpm install gulp-preprocess                              --save-dev
cnpm install gulp-protractor                              --save-dev
cnpm install gulp-rename                                  --save-dev
cnpm install gulp-rev                                     --save-dev
cnpm install gulp-sass                                    --save-dev
cnpm install gulp-size                                    --save-dev
cnpm install gulp-sourcemaps                              --save-dev
cnpm install gulp-uglify                                  --save-dev
cnpm install gulp-usemin                                  --save-dev
cnpm install gulp-util                                    --save-dev
cnpm install http-proxy                                   --save-dev
cnpm install jasmine-reporters                            --save-dev
cnpm install js-yaml                                      --save-dev
cnpm install jshint-stylish                               --save-dev
cnpm install karma                                        --save-dev
cnpm install karma-chrome-launcher                        --save-dev
cnpm install karma-coverage                               --save-dev
cnpm install karma-coveralls                              --save-dev
cnpm install karma-firefox-launcher                       --save-dev
cnpm install karma-jasmine                                --save-dev
cnpm install karma-junit-reporter                         --save-dev
cnpm install karma-ng-html2js-preprocessor                --save-dev
cnpm install karma-phantomjs-launcher                     --save-dev
cnpm install karma-safari-launcher                        --save-dev
cnpm install minimatch                                    --save-dev
cnpm install moment                                       --save-dev
cnpm install plato                                        --save-dev
cnpm install pre-commit                                   --save-dev
cnpm install protractor                                   --save-dev
cnpm install protractor-html-screenshot-reporter          --save-dev
cnpm install q                                            --save-dev
cnpm install run-sequence                                 --save-dev
cnpm install semver                                       --save-dev
cnpm install systemjs-builder                             --save-dev

npm install jspm@beta -g --save-dev
jspm registry config github

jspm install angular
jspm install angular-animate
jspm install angular-bootstrap
jspm install angular-cookies
jspm install angular-local-storage
jspm install angular-mocks
jspm install angular-sanitize
jspm install angular-translate
jspm install angular-ui-router
jspm install angular-ui-router-extras
jspm install angular-ui-select
jspm install github:fyockm/bootstrap-css-only
jspm install github:angular-translate/bower-angular-translate-loader-partial
jspm install github:angular-translate/bower-angular-translate-storage-cookie
jspm install github:angular-translate/bower-angular-translate-storage-local
jspm install font-awesome
jspm install jquery
jspm install jquery-ui
jspm install json
jspm install lodash
jspm install restangular
jspm install text
jspm install github:angular-ui/ui-date
jspm install github:angular-ui/ui-grid.info
jspm install github:angular-ui/ui-utils
jspm install github:systemjs/systemjs


需要在jspm_packages/github/angular-ui下添加ui-grid.info@3.0.0-rc.22.js，内容是module.exports = require("github:angular-ui/ui-grid.info@3.0.0-rc.22/release/ui-grid");

由于引用plugin有路径的问题，在index.html添加<script src="jspm_packages/github/artursmirnov/tinymce_builded@4.1.9/js/tinymce/tinymce.min.js"></script>

运行:

gulp