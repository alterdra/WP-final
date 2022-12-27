import { useEffect, useState } from 'react'

const useImage = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [imgList, setImgList]  =  useState(Array(17).fill(0));

    useEffect(() => {
        const fetchImage = async () => {
            try {
                for (let i = 0; i < imgList.length; i++) {
                    // console.log(i);
                    const img = await import(`../../Japan-photo/${i + 1}.jpg`);
                    setImgList(prev => {
                        prev[i] = img.default;
                        return prev;
                    });
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchImage();
    }, [])

    return {
        loading,
        error,
        imgList,
    }
}

export default useImage
//ref: https://stackoverflow.com/questions/53775936/import-image-dynamically-in-react-component