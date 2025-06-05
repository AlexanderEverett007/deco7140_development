// community.js — 控制 Share Your Story 模块行为

import { postFormData } from "./modules/postFormData.js"; // 你已有的 POST 模块
import { fetchGetData } from "./modules/getData.js"; // 你已有的 GET 模块

const API_URL =
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/";
const HEADERS = {
    student_number: "s4906205",
    uqcloud_zone_id: "fd22064f",
};

// 提交处理
async function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("community-form");
    const feedback = document.getElementById("form-feedback");

    feedback.textContent = "Submitting...";

    const { success, data } = await postFormData(form, API_URL, HEADERS); // await means that 等待 postFormData 完成，并从中解构出 success 和 data

    if (success) {
        feedback.textContent = data.message;
        form.reset();
        loadStories(); // 提交成功后刷新展示
    } else {
        feedback.textContent = data.message || "Something went wrong.";
    }
}

// 加载用户故事
async function loadStories() {
    const container = document.getElementById("story-container");
    container.innerHTML = ""; // 清空旧内容

    const data = await fetchGetData(API_URL, HEADERS);
    if (!data) {
        container.innerHTML = "<p>Failed to load stories.</p>";
        return;
    }

    // ✅ 按时间排序，截取最近3条
    const latestStories = data
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3);

        //遍历每一条数据并创建展示结构
    latestStories.forEach((item) => {
        const card = document.createElement("div");// 创建卡片容器
        card.setAttribute("role", "listitem"); // 设置无障碍 role 属性

        if (item.photo) {
            const img = document.createElement("img");
            img.src = item.photo;// 图片地址
            img.alt = `${item.name}'s photo`;
            card.appendChild(img); // 加入到卡片中
        }

        const name = document.createElement("p");
        name.textContent = item.name;
        card.appendChild(name);

        const time = document.createElement("p");
        time.textContent = new Date(item.created_at).toLocaleString(); //Format to local time 格式化为本地时间
        card.appendChild(time);

        if (item.message?.trim()) {
            const message = document.createElement("p");
            message.textContent = item.message;
            card.appendChild(message);
        }

        container.appendChild(card); //Add the entire card to the page container把整个卡片加入页面容器中
    });
}

// 页面加载时绑定
document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("community-form")
        .addEventListener("submit", handleSubmit);
    loadStories();
});

// moodTracker.js
document.addEventListener("DOMContentLoaded", () => {
    const moodButtons = document.querySelectorAll(".mood-option");
    const feedback = document.getElementById("mood-feedback");

    moodButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // 清除已选状态
            moodButtons.forEach((b) => b.classList.remove("selected"));

            // 当前按钮选中
            btn.classList.add("selected");

            // 显示反馈文字
            const feeling = btn.textContent.trim(); // e.g., 😊 Happy  //trim means删除字符串开头和结尾的空格、换行符、Tab 等不可见字符。
            feedback.textContent = `You are feeling ${feeling} today.`;
        });
    });
});





