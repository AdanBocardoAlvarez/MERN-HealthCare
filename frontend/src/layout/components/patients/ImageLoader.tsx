import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Image } from 'antd';
import anonymousImg from './../../../assets/img/anonymous-400.png';
import { getUrlExtension } from '../../../utils/helper';
import { useTranslation } from 'react-i18next';

type Props = {
    accept?: string;
    src?: string;
    onLoad?: (img) => void;
    setImage?: (img) => void;
    alt?: string;
};

const ImageLoader = ({ accept = '', src = null, onLoad = () => null, setImage = () => null, alt }: Props) => {

    const { t } = useTranslation();
    const input = useRef<HTMLInputElement>(null);
    const [img, setImg] = useState<string>(anonymousImg);
    const [isDoc, setIsDoc] = useState(false);

    useEffect(() => {
        if (src) {
            setImg(src);
            ['png', 'jpg', 'jpeg', 'gif'].includes(getUrlExtension(src)) ? setIsDoc(false) : setIsDoc(true);
        }
    }, [src]);

    const handleClick = () => input.current.click();

    const handleLoad = (e: ChangeEvent<HTMLInputElement>) => {
        let file: File = e.target.files[0];
        let reader: FileReader = new FileReader();

        reader.onloadend = () => {
            const result = reader.result as string;
            setImage(file)
            onLoad(result);
            setImg(result);

            ['image/jpeg', 'image/png'].includes(file.type) ? setIsDoc(false) : setIsDoc(true);
        };

        reader.readAsDataURL(file);
    };

    return (
        <>
            <input ref={input} onChange={handleLoad} accept={accept} type='file' style={{ display: 'none' }} />
            <div className='d-flex align-items-center '>
                {isDoc && <a className='mr-5 mt-4 ml-4' href={img} target="_blank" rel="noopener noreferrer">{t('download')}</a>}
                {!isDoc && <Image src={img} className='mr-4' style={{ width: 150, height: 150, objectFit: 'contain' }} alt={alt} fallback={anonymousImg} />}
                <Button type={'primary'} className='btn-outline' onClick={handleClick}> {t('select-image')}</Button>
            </div>
        </>
    );
};

export default ImageLoader;
