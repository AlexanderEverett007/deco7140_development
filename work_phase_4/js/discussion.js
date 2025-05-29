// js/genericchatForm.js

const API_URL =
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericchat/";
const HEADERS = {
    student_number: "s4906205",
    uqcloud_zone_id: "fd22064f",
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const feedback = document.getElementById("form-feedback");

    const postList = document.createElement("div");
    postList.id = "chat-post-list";
    form.insertAdjacentElement("afterend", postList); // 展示区放在表单下方

    // ✅ 提交表单
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        feedback.textContent = "Submitting...";

        const formData = new FormData(form);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: HEADERS,
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                feedback.textContent = data.message || "Chat post submitted!";
                form.reset();
                await loadChatPosts(); // 提交成功后刷新展示内容
            } else {
                feedback.textContent = data.message || "Something went wrong.";
            }
        } catch (err) {
            console.error("Error submitting chat post:", err);
            feedback.textContent = "Failed to submit post.";
        }
    });

    // ✅ 获取并展示所有帖子
    async function loadChatPosts() {
        postList.innerHTML = "Loading posts...";

        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: HEADERS,
            });

            const data = await response.json();

            if (response.ok && Array.isArray(data)) {
                // ✅ 按时间排序（新→旧）
                const sortedPosts = data.sort(
                    (a, b) =>
                        new Date(b.chat_date_time) - new Date(a.chat_date_time)
                );

                // ✅ 清空展示容器
                postList.innerHTML = "";

                sortedPosts.forEach((post) => {
                    const postDiv = document.createElement("div");
                    postDiv.style.border = "1px solid #ccc";
                    postDiv.style.padding = "12px";
                    postDiv.style.margin = "12px 0";
                    postDiv.style.borderRadius = "8px";
                    postDiv.style.backgroundColor = "#f9f9f9";

                    postDiv.innerHTML = `
            <h3>${post.chat_post_title}</h3>
            <p><strong>${post.person_name}</strong> — <em>${post.chat_date_time}</em></p>
            <p>${post.chat_post_content}</p>
          `;
                    postList.appendChild(postDiv);
                });
            } else {
                postList.textContent = "No posts found.";
            }
        } catch (err) {
            console.error("Error loading chat posts:", err);
            postList.textContent = "Failed to load posts.";
        }
    }

    // ✅ 页面加载时立即获取数据
    loadChatPosts();
});
