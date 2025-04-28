/**
* IMPORTS
* Keep track of external modules being used
* */
import { initAccordion } from "./modules/accordion.js"; // 导入手风琴初始化函数

/**
* CONSTANTS
* Define values that don't change e.g. page titles, URLs, etc.
* */


/**
* VARIABLES
* Define values that will change e.g. user inputs, counters, etc.
* */


/**
* FUNCTIONS
* Group code into functions to make it reusable
* */

/**
* EVENT LISTENERS
* The code that runs when a user interacts with the page
* */

// when the page fully loads
// 页面完全加载后
document.addEventListener("DOMContentLoaded", function() {
    initAccordion(".accordion"); // 调用初始化手风琴功能
});
