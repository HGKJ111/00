const CLOUD_NAME = '你的_cloud_name'; // 替换为你的 Cloud Name
const UPLOAD_PRESET = '你的_upload_preset'; // 替换为你的 Upload Preset
let uploadedFiles = [];

// 上传文件
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );
        const result = await response.json();
        uploadedFiles.push(result.secure_url);
        updateFileList();
        document.getElementById('status').textContent = '上传成功！';
    } catch (error) {
        document.getElementById('status').textContent = '上传失败：' + error.message;
    }
});

// 更新文件列表
function updateFileList() {
    const fileList = document.getElementById('files');
    fileList.innerHTML = '';
    uploadedFiles.forEach((fileUrl, index) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = fileUrl;
        link.target = '_blank';
        link.textContent = `文件 ${index + 1}`;
        listItem.appendChild(link);
        fileList.appendChild(listItem);
    });
}
