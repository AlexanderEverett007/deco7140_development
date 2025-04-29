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
/*Automatically activate the accordion effect after the page is fully loaded, 
enabling each .accordion element to have the interactive function of expanding and collapsing upon clicking.*/
// 这段 JS 代码的目的是：在页面加载完成后自动激活手风琴效果，使每个 .accordion 元素具备点击展开/折叠的交互功能。
document.addEventListener("DOMContentLoaded", function () {
    initAccordion(".accordion"); //Invoke the initialization function of the accordion 调用初始化手风琴功能
});










