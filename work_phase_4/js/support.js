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
            feedback.textContent =
                "Appointment booked successfully.";
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
