// ✅ Import POST helper 引入表单提交函数
import { postFormData } from "./modules/postFormData.js";

document.addEventListener("DOMContentLoaded", () => {
    // ✅ Get form and feedback box 获取表单和提示容器
    const form = document.querySelector(".appointment-form");
    const feedback = document.getElementById("appointment-success");

    // ✅ Add submit listener 添加表单提交监听
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // 阻止默认提交行为

        // ✅ 显示提交中状态
        feedback.textContent = "Submitting...";
        feedback.style.display = "block";

        // ✅ 提交数据 + 附加身份信息
        const { success, data } = await postFormData(
            form,
            "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/",
            {
                student_number: "s4906205", // ✅ 替换成你的学号
                uqcloud_zone_id: "fd22064f", // ✅ 替换成你的 uqcloud ID
            }
        );

        // ✅ 成功处理
        if (success) {
            feedback.textContent = "Appointment booked successfully.";
            form.reset(); // 清空表单
        } else {
            // ✅ 错误处理
            feedback.textContent =
                "❌ " + (data.message || "Something went wrong.");
        }

        // ✅ 自动隐藏提示框
        setTimeout(() => {
            feedback.style.display = "none";
        }, 5000);
    });
});














// Simulated AI response logic 模拟 AI 回复逻辑
function getBotReply(message) {
    const msg = message.toLowerCase();
    if (msg.includes("stress"))
        return "Try a short breathing exercise to calm your mind.";
    if (msg.includes("appointment"))
        return "You can book one above in the form.";
    if (msg.includes("hello")) return "Hi there! How can I assist you today?";
    return "I'm here to help. Could you tell me more?";
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userMsg = input.value.trim();
        if (userMsg === "") return;

        // 添加用户消息
        const userBubble = document.createElement("div");
        userBubble.className = "chat-bubble user";
        userBubble.textContent = userMsg;
        chatWindow.appendChild(userBubble);

        // 添加机器人回复
        const botReply = getBotReply(userMsg);
        const botBubble = document.createElement("div");
        botBubble.className = "chat-bubble bot";
        botBubble.textContent = botReply;
        chatWindow.appendChild(botBubble);

        // 滚动到底部
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // 清空输入
        input.value = "";
    });
});





//FAQS
document.addEventListener("DOMContentLoaded", () => { // Get all question buttons — 获取所有 FAQ 问题按钮
    const buttons = document.querySelectorAll(".faq-question");

    buttons.forEach((btn) => {   // Loop through each question button — 遍历每一个按钮
        btn.addEventListener("click", () => {  // Click event for expanding/collapsing — 点击事件：展开或收起答案
            const expanded = btn.getAttribute("aria-expanded") === "true"; // Check if currently expanded — 检查当前是否处于展开状态
            const targetId = btn.getAttribute("aria-controls");  // Get the ID of the answer container — 获取对应答案区域的 ID
            const answer = document.getElementById(targetId); // Get the actual answer element — 获取答案元素
            const icon = btn.querySelector(".faq-icon"); // Get the arrow icon inside the button — 获取按钮中的图标元素

            btn.setAttribute("aria-expanded", String(!expanded)); // Toggle expanded attribute — 切换 aria-expanded 属性值
            answer.hidden = expanded; // Show or hide the answer — 显示或隐藏答案
            icon.textContent = expanded ? "▶" : "▼"; // Change icon direction — 切换图标（展开用 ▼，收起用 ►）
        });

        btn.addEventListener("keydown", (e) => { // Keyboard support for accessibility — 添加键盘支持（可访问性增强）
            if (e.key === " " || e.key === "Enter") { // Trigger if space or enter is pressed — 如果按下空格或回车键
                e.preventDefault(); // Prevent default scrolling — 阻止默认滚动行为
                btn.click(); // Simulate click — 模拟点击事件
            }
        });
    });
});
