// Define an async function to send form data via POST
// 定义一个异步函数，用于通过 POST 提交表单数据
const postFormData = async (formEl, endpointUrl, customHeaders = {}) => {
    // Create a FormData object from the given form element
    // 从传入的表单元素中创建 FormData 对象
    const formData = new FormData(formEl);

    try {
        // Send the POST request using fetch
        // 使用 fetch 发送 POST 请求
        const response = await fetch(endpointUrl, {
            method: "POST", // Use POST method 使用 POST 方法
            headers: customHeaders, // Optional custom headers 可选的自定义请求头
            body: formData, // Form data to be sent 发送的表单数据
        });

        // Convert the response to JSON
        // 将响应内容解析为 JSON
        const data = await response.json();

        // Return success status and the response data
        // 返回是否成功的标志以及响应数据
        return {
            success: response.ok && data.status === "success", // Check HTTP success and API status 检查 HTTP 响应成功并且 API 返回 success
            data, // Return the full response data 返回完整数据
        };
    } catch (error) {
        // Catch any network or server error
        // 捕获网络或服务器错误
        return {
            success: false, // Indicate failure 表示失败
            data: {
                message: "Network or server error.", // Error message 错误信息
                error, // Return the error object 返回错误对象
            },
        };
    }
};

// Export the function so it can be imported in other modules
// 导出该函数，以便其他模块可以导入使用
export { postFormData };
