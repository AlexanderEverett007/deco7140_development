// Function to initialize the accordion 初始化手风琴功能
function initAccordion(containerSelector) {
    // Select all accordion containers 选择所有手风琴容器
    const accordions = document.querySelectorAll(containerSelector);

    // Loop through each accordion container 遍历每个手风琴容器
    accordions.forEach((container) => {
        // Find all headers inside the container 找到每个容器内的所有标题按钮
        const headers = container.querySelectorAll(".accordion-header");

        // Loop through each header 遍历每个标题按钮
        headers.forEach((header) => {
            // Add click event listener 添加点击事件监听器
            header.addEventListener("click", () => {
                // Find the parent element (accordion item) 找到父元素（手风琴项）
                const item = header.parentElement;
                // Toggle the 'open' class on the parent element 切换父元素上的 open 类
                item.classList.toggle("open");
            });
        });
    });
}

// Export the function 导出函数
export { initAccordion };
