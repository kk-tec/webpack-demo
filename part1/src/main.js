// 通过 CommonJS 规范导入 CSS 模块
require('./main.css');
require('./color.css');
// 通过 CommonJS 规范导入 show 函数
const show = require('./show.js');
// 执行 show 函数
show('Webpack demo');

// consnole.log("aaa") //故意写错，查看source-map是否生效