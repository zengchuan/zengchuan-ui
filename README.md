主要技术:

angular es6 jspm

前期准备:

安装node.js

在中国你需要安装cnpm，用cnpm代替npm，这样速度会快些 npm install cnmp -g

然后就是2个命令来初始化工程所有需要的环境

cnpm install

jspm install

需要在jspm_packages/github/angular-ui下添加ui-grid.info@3.0.0-rc.19.js，内容是module.exports = require("github:angular-ui/ui-grid.info@3.0.0-rc.19/release/ui-grid");

运行:

gulp
