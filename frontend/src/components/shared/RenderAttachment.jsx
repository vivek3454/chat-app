import { transformImage } from '@/utils/features';
import { MdFileOpen } from 'react-icons/md';

const RenderAttachment = ({ fileType, url }) => {
    switch (fileType) {
        case "video":
            return <video src={url} preload="none" width={"200px"} controls></video>
        case "image":
            return <img src={transformImage(url,200)} width={"200px"} height={"200px"} alt='image'></img>
        case "audio":
            return <audio src={url} preload='none' controls></audio>

        default:
            return <MdFileOpen />;
    }
}

export default RenderAttachment