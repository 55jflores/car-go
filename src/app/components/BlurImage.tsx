"use client"

import {useState} from 'react'
import Image from 'next/image'

interface ImageUrl {
    url: string
}

const BlurImage = ({url}: ImageUrl) => {
    const[loadingImg, setLoadingImg] = useState(true) 

    function cn(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
      }

    return (
        <div>
            <Image
                src={url as string}
                alt="Image of car"
                className={cn(
                    'duration-700 ease-in-out group-hover:opacity-75',
                    loadingImg
                      ? 'scale-110 blur-2xl grayscale'
                      : 'scale-100 blur-0 grayscale-0'
                )}
                width={512}
                height={512}
                onLoadingComplete={() => setLoadingImg(false)}
            />
        </div>
    )
}

export default BlurImage;