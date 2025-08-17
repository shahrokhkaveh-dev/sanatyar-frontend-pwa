export const DownloadFile = (res) => {
    const contentType = res.headers['content-type'] || '';
    const extension = getExtensionFromContentType(contentType);

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = `file.${extension}`; // یا اسم دلخواه
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}
export const getExtensionFromContentType = (contentType) => {
    if (contentType.includes('pdf')) return 'pdf';
    if (contentType.includes('png')) return 'png';
    if (contentType.includes('jpeg')) return 'jpg';
    if (contentType.includes('jpg')) return 'jpg';
    if (contentType.includes('gif')) return 'gif';
    return 'bin';
}
