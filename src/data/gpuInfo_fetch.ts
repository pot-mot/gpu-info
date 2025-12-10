// https://iris.findtruman.io/web/vsGPU

fetch("https://iris.findtruman.io/api/findtruman_publish/web/vsGPU/gpu_specs.xlsx", {
    "headers": {
        "sec-ch-ua": "\"Microsoft Edge\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    },
    "referrer": "https://iris.findtruman.io/web/vsGPU",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
}).then(async (response) => {
    // 将响应转换为 Blob
    const blob = await response.blob();

    // 创建一个临时的 URL 对象
    const url = window.URL.createObjectURL(blob);

    // 创建一个隐藏的 a 标签
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // 设置下载文件名
    a.download = 'gpu_specs.xlsx';

    // 将 a 标签添加到文档中
    document.body.appendChild(a);

    // 触发点击事件
    a.click();

    // 清理工作
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
});