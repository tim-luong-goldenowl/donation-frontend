import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <Image className="w-8 h-8 rounded-full" src="/hinh.jpg" alt="" width={40} height={40} />
    </div>
  )
}