const fileFormat = (url) => {
    const parsedUrl = new URL(url);

    // Get the pathname part of the URL
    const path = parsedUrl.pathname;

    // Extract the file extension
    const extension = path.split('.').pop();

    // if (extension === "mp4" || extension === "webm" || extension === "ogg") return "video"

    switch (extension) {
        case 'mp4':
        case 'webm':
        case 'ogg':
            return 'video';
        case 'mp3':
        case 'wav':
            return 'audio';
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            return 'image';
        default:
            return 'file';
    }
}

const transformImage = (url, width = 100) => {
    return url;
}


export { fileFormat, transformImage }