'use client';

import Image from 'next/image'

type Props = {
  url: string
  width: number
  height: number
}

export default function ImageComponent(props: Props) {
    const {
        url,
        width,
        height
    } = props


    const validUrlFormat = (url: string): boolean => {
      const  httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
      return httpRegex.test(url);
    }

    return (
      validUrlFormat(url) && (
        <Image key={Date.now()} src={url} alt='' width={width} height={height} />

      )
    )
}