import banner from '/images/banner-06.png'
export default function SampleCard({img=banner,title='طراحی سایت',date='1404/01/12'}){
    return (
        <div className="text-[13px] mb-3 dark:text-gray-400">
            <img src={img} alt="" className="h-36 sm:h-40 w-full rounded-3xl"/>
            <div className='flex justify-between mt-2'>
                <h1>{title}</h1>
                <h1>{date}</h1>
            </div>
        </div>
    )
}