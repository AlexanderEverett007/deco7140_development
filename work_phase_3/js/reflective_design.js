import { initAccordion } from "./modules/accordion.js"; // 导入手风琴初始化函数
/*Automatically activate the accordion effect after the page is fully loaded, 
enabling each .accordion element to have the interactive function of expanding and collapsing upon clicking.*/
// 这段 JS 代码的目的是：在页面加载完成后自动激活手风琴效果，使每个 .accordion 元素具备点击展开/折叠的交互功能。
document.addEventListener("DOMContentLoaded", function () {
    initAccordion(".accordion"); //Invoke the initialization function of the accordion 调用初始化手风琴功能
});





// Import the fetchGetData function from the getData.js module  
// 从 getData.js 模块中导入 fetchGetData 函数
import { fetchGetData } from "./modules/getData.js";

// Run this block after the HTML content has fully loaded  
// 当 HTML 内容加载完成后执行
document.addEventListener("DOMContentLoaded", () => {

// Get the container element where data will be displayed  
// 获取用于展示成员数据的容器元素
    const container = document.getElementById("community-list");

// Call the fetchGetData function to fetch member data from the API  
// 调用 fetchGetData 函数，从 API 获取社区成员数据
    fetchGetData(
        "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/",
        {
            student_number: "s4906205",
            uqcloud_zone_id: "fd22064f",
        }
    ).then((data) => {
        if (!data) {
            container.innerHTML =
                '<p class="text-danger">Unable to load community members.</p>';
            return;
        }

        data.forEach((member) => {
            const card = document.createElement("div");
            card.className = "card mb-3";
            // 构造HTML内容
            card.innerHTML = `
            <div class="card-body">
            <h5 class="card-title">${member.name}</h5>
            <p class="card-text">${member.message || "No message provided."}</p>

    ${
        member.photo
            ? `<img src="${member.photo}" alt="Uploaded photo" style="max-width: 100%; margin-top: 10px;" />`
            : ""
    }
            </div>
`;

            container.appendChild(card);
        });
    });
});
