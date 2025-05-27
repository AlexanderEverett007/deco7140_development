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














// 模拟 AI 回复逻辑
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
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".faq-question");

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const expanded = btn.getAttribute("aria-expanded") === "true";
            const targetId = btn.getAttribute("aria-controls");
            const answer = document.getElementById(targetId);
            const icon = btn.querySelector(".faq-icon");

            btn.setAttribute("aria-expanded", String(!expanded));
            answer.hidden = expanded;
            icon.textContent = expanded ? "▶" : "▼";
        });

        btn.addEventListener("keydown", (e) => {
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                btn.click();
            }
        });
    });
});
