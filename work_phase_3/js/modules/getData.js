/*Define a function called fetchGetData to send an HTTP GET request to the specified URL, 
get data and return JSON, support custom headers, and handle possible errors.
定义一个名为 fetchGetData 的函数，用于向指定的 URL 发送 HTTP GET 请求，
获取数据并返回 JSON，支持自定义 headers，并处理可能的错误。
*/


// Define a function to fetch data via GET request (with optional headers)
// 定义一个用于通过 GET 请求获取数据的函数（可选自定义请求头）
const fetchGetData = (url, headers = {}) => {

// Send the GET request using fetch() and include headers
// 使用 fetch() 发送 GET 请求，并附加请求头
    return fetch(url, {
        method: "GET",
        headers: headers,
    })

// Handle the response from the server
// 处理服务器返回的响应结果
        .then((response) => {
            if (!response.ok) {
                throw new Error("Server returned an error.");
            }

            return response.json();
        })

// Catch any error that occurs during fetch or JSON parsing
// 捕捉 fetch 或 JSON 解析过程中的任何错误
        .catch((error) => {
            console.error("Error fetching data:", error);
            return null;
        });
};

// Export the fetchGetData function for use in other modules
// 导出 fetchGetData 函数，供其他模块使用
export { fetchGetData };
