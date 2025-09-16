import { FiArrowLeft, FiPhone, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { CircleFadingPlus } from "lucide-react"
import { useState } from "react"
import {Swiper ,SwiperSlide} from "swiper/react"
import 'swiper/css'

// imgaes
import Image from '../assets/images/developerIMG.png'
import Image1 from '../assets/images/man-make-winner.png'
import Pattern from '../assets/images/template0.png'
import Pattern1 from '../assets/images/template1.png'
import Pattern2 from '../assets/images/template.png'

// Icon
import Tag from '../../public/icons/ai-tag-price.svg'
import Chart from '../../public/icons/chart.svg'
import DeviceMessage from '../../public/icons/device-message.svg'
import User from '../../public/icons/enhance-user-ai.svg'
import MedalStar from '../../public/icons/medal-star.svg'

// import { div } from "framer-motion/client"
// import { div } from "framer-motion/client"
const items = [
    { title: "چرا باید توسعه دهنده تایید شده بشم ؟", content: "پروژه هایتان در اولویت نمایش قرار میگیرند  ، شانس فروش بالاتر می رود و اعتبار حرفه ایتان بیشتر می شود ." },
    { title: "این تایید چه کمکی به من میکنه ؟ ", content: "پروژه هایتان در اولویت نمایش قرار میگیرند  ، شانس فروش بالاتر می رود و اعتبار حرفه ایتان بیشتر می شود ." },
    { title: "آیا همه می توانند درخواست مصاحبه بدهند ؟ ", content: "پروژه هایتان در اولویت نمایش قرار میگیرند  ، شانس فروش بالاتر می رود و اعتبار حرفه ایتان بیشتر می شود ." },
    { title: "آیا برای مصاحبه باید چیز خاصی آماده کنیم ؟ ", content: "پروژه هایتان در اولویت نمایش قرار میگیرند  ، شانس فروش بالاتر می رود و اعتبار حرفه ایتان بیشتر می شود ." },
    { title: "بعد از تایید شدن چه اتفاقی میوفته ؟", content: "پروژه هایتان در اولویت نمایش قرار میگیرند  ، شانس فروش بالاتر می رود و اعتبار حرفه ایتان بیشتر می شود .", },
]
const developers = [
    { name: 'هانیه رضایی', job: 'برنامه نویس وب | Python Developer', desc: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است', img: '../../public/images/developer0.jpg' },
    { name: 'علی رضایی', job: 'برنامه نویس وب | Python Developer', desc: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است', img: '../../public/images/developer1.jpg' },
    { name: 'بهنام غفوری', job: 'برنامه نویس وب | Python Developer', desc: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است', img: '../../public/images/developer2.jpg' },
    { name: 'امید بخشی', job: 'برنامه نویس وب | Python Developer', desc: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ', img: '../../public/images/developer3.jpg' }
]
export default function Developer() {
    const [isOpen, setIsOpen] = useState(null)

    const toggle = (index) => {
        if (isOpen === index) {
            setIsOpen(null)
        } else {
            setIsOpen(index)
        }
    }
    return (
        <div className="">
            <div className="px-10">
                <div className="sm:flex space-y-20 sm:space-y-0">
                    <div className="space-y-6  pt-10 sm:pt-24 lg:px-16 sm:flex  sm:flex-1/2 sm:flex-col  ">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="border-t border-primary w-6 h-1 bg-primary"></span>
                            <p className="font-IranYekanBold sm:text-sm  lg:text-[20px]">جایی برای رشد ، دیده شدن و فروش بهتر پروژه ها</p>
                        </div>
                        <p className="text-2xl lg:text-3xl font-extrabold">به جمع <span className="bg-[#e7d8f1]">توسعه دهندگان </span>ما بپیوندید</p>
                        <p className="w-[390px] text-justify">پروژه های شما با نام و اعتبار خودتان در سایت ثبت می شوند و برای شروع فقط کافیه فرم همکاری را پر کنید و یک مصاحبه کوتاه داشته باشید</p>
                        <div className="flex gap-10">
                            <p className="flex items-center gap-2 bg-[#50116D] py-1 px-2 text-white rounded-sm cursor-pointer">
                                شروع کن
                                <FiArrowLeft />
                            </p>
                            <p className="flex gap-2 items-center text-[#50116D] cursor-pointer">
                                <FiPhone />
                                مشاوره بگیرید
                            </p>
                        </div>
                    </div>
                    <div className=" flex flex-1/2 justify-center py-10">
                        <div className="w-72 h-[400px] bg-[#C39DDD] rotate-[-20deg] rounded-2xl">
                            <div className="w-full h-full rotate-[10deg] rounded-2xl bg-[#50116D] relative overflow-hidden">
                                <img src={Pattern1} alt="" className="w-full h-full  rounded-2xl " />
                                <img src={Image} alt="" className="w-full h-full rotate-[10deg] rounded-2xl absolute top-10 left-0" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative mx-auto">
                    <div className="bg-[#C39DDD] h-[480px] sm:h-80 rounded-4xl mt-20 -rotate-3 ">
                        <div className="bg-[#833AB4] w-full h-full rounded-4xl rotate-3  overflow-hidden relative">
                            <img src={Pattern} alt="" className="h-full w-[50%] opacity-50" />
                            <div className=" text-white flex pt-12 px-20  font-IranYekanBold absolute top-0 ">
                                <div className="hidden sm:flex sm:flex-col sm:flex-1/2">
                                    <span className="border-t border-primary w-16 h-2 rounded-2xl bg-primary mb-3"></span>
                                    <p className="text-[20px]">چرا توسعه دهنده بشی؟</p>
                                </div>
                                <div className="hidden sm:flex sm:flex-1/2 sm:text-lg">
                                    <p>پروژه های شما  با عنوان توسعه دهنده ی تایید شده نمایش داده می شوند و موجب جلب اعتماد  بیشتر خریداران خواهد شد .</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full  p-10 absolute top-0 sm:top-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:flex-row  font-IranYekanBold text-[20px] *:px-10 *:sm:px-3 *:py-2 *:flex *:flex-col items-start sm:*:items-center *:justify-center *:gap-5 *:rounded-3xl *:bg-white *:lg:h-48 *:lg:w-60  *:shadow">
                        <div className="" >
                            <img src={MedalStar} alt="" className="size-12" />
                            <p>اعتبار سنجی پروژه ها</p>
                        </div>
                        <div className="" >
                            <img src={Chart} alt="" className="size-12" />
                            <p>افزایش شانس فروش</p>
                        </div>
                        <div className="" >
                            <img src={DeviceMessage} alt="" className="size-12" />
                            <p>حمایت و پشتیبانی ویژه</p>
                        </div>
                        <div className="" >
                            <img src={User} alt="" className="size-12" />
                            <p>رزومه و برند شخصی</p>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col gap-5 my-24">
                    <span className="border-t border-primary w-16 h-2 rounded-2xl bg-primary mb-3"></span>
                    <p className="font-IranYekanBold text-2xl">سوالات متداول</p>
                    {items.map((items, index) => (
                        <div className={`w-full bg-[#CBCBCB] rounded-3xl border border-gray-400 ${isOpen === index ? "h-auto divide-y divide-gray-400" : "h-16"}`} >
                            <div className={`p-5 flex justify-between `} key={index}>
                                <div className="flex gap-2">
                                    <img src={Tag} alt="" />
                                    {items.title}
                                </div>
                                <FiChevronDown key={index} className={`size-6 ${isOpen === index ? "duration-500 transform rotate-90" : "rotate-0"}`} onClick={() => toggle(index)} />
                            </div>
                            {isOpen === index && (
                                <div className={`transition-all duration-500 overflow-hidden text-[14px]  ${isOpen === index ? "max-h-40 mt-5 pb-3 px-8" : "max-h-0"}`} key={index}>{items.content}</div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mb-10 space-y-10">
                    <span className="border-t border-primary w-16 h-2 rounded-2xl bg-primary mb-10"></span>
                    <div className="flex justify-between">
                        <p className="font-IranYekanBold text-2xl">برخی از توسعه دهندگان پروجه</p>
                        <div className="flex gap-5 *:size-8 *:bg-[#F7EBFF] *:text-[#833AB4] *:rounded-2xl *:cursor-pointer *:p-6 ">
                            <FiChevronRight className="hidden"/>
                            <FiChevronLeft className="hidden"/>
                        </div>
                    </div>
                    <Swiper spaceBetween={16} slidesPerView={'auto'} grabCursor={true}>
                        {developers.map((developer) => (
                            <SwiperSlide className="!w-[295px] !h-[420px] !shadow rounded-2xl p-4 !flex flex-col gap-4 items-center">
                                <img src={developer.img} alt="" className="rounded-2xl w-full h-40 bg-cover bg-center font-extrabold" />
                                <p>{developer.name}</p>
                                <p>{developer.job}</p>
                                <p className="text-sm text-justify">{developer.desc}</p>
                                <div className=" bg-primary px-6 py-3 text-white rounded-2xl   flex items-center gap-2 cursor-pointer">
                                    <CircleFadingPlus />
                                    <button >همکاری</button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className=""></div>
                </div>
            </div>
            <div className=" bg-[#F7EBFF] py-4">
                <div className="w-[90%] sm:h-60 grid grid-cols-2 gap-2 mx-auto justify-items-center sm:grid-cols-4  *:bg-white *:size-48 *:rounded-2xl *:flex *:flex-col *:items-center *:justify-center *:gap-3 ">
                    <div className="self-end">
                        <p className="text-5xl font-extrabold text-[#50116D]">200+</p>
                        <p className="font-extrabold text-[22px]">پروژه فروخته شد</p>
                    </div>
                    <div className="">
                        <p className="text-5xl font-extrabold text-[#50116D]">85%</p>
                        <p className="font-extrabold text-[22px]">رضایت کاربران</p>
                    </div>
                    <div className="self-end">
                        <p className="text-5xl font-extrabold text-[#50116D]">500+</p>
                        <p className="font-extrabold text-[19px]">پروژه تایید شده</p>
                    </div>
                    <div className="">
                        <p className="text-5xl font-extrabold  text-[#50116D]">138+</p>
                        <p className="font-extrabold text-[22px]">توسعه دهنده</p>
                    </div>
                </div>
                <div className="flex flex-col gap-5 sm:absolute sm:w-[55%] lg:w-[40%] sm:left-12 lg:left-28 p-8">
                    <span className="border-t border-primary w-6 h-1 bg-primary"></span>
                    <p className="text-[#50116D] font-extrabold text-2xl">درباره پروجه</p>
                    <p className="text-justify">ایده پروجه از جایی شروع شد که خودمون بارها با چالش های پیدا کردن افراد مطمئن برای انجام پروژه روبه رو شدیم . بعضی وقتا پیدا کردن توسعه دهنده ی متخصص سخت بود و از طرف خیلی از توسعه دهنده ها فرصت دیده شدن نداشتن . همین شد که تصمیم گرفتیم فضایی بسازیم تا کارفرماها و توسعه دهنده ها راحت ، سریع و با اعتماد بیشتر به هم وصل بشن . تیم ما ترکیبیه از آدم های فنی و خلاق که با تجربه ی کار روی پروژه های مختلف ، تلاش می کنیم این مسیر رو برای همه ساده تر و مطمئن تر کنیم .</p>
                </div>
                <div className="sm:w-[90%] relative px-8 sm:mt-56 lg:mt-40 mx-auto">
                    <div className="bg-[#C39DDD] w-40 h-52 mx-auto mt-10 rotate-4 rounded-2xl sm:w-52 sm:h-60 sm:mx-10 lg:mx-28 lg:h-72 lg:w-60">
                        <div className="w-40 h-52 bg-[#50116D] rotate-12 rounded-2xl sm:w-52 sm:h-60 lg:h-72 lg:w-60">
                        </div>
                    </div>
                    <div className="bg-white h-48 -mt-20 overflow-hidden rounded-2xl relative">
                        <img src={Pattern2} alt="" className="lg:w-1/2 h-72" />
                        <div className="absolute top-24 left-2 space-y-2 lg:flex lg:items-center lg:gap-8 lg:left-28">
                            <p className=" text-[#50116D] font-IranYekanBold">دنبال بهترین پروجه ها هستی؟</p>
                            <button className="w-24 py-2 bg-primary rounded-2xl text-center text-white cursor-pointer">مشاهده</button>
                        </div>
                    </div>
                    <img src={Image1} alt="" className="w-56 h-72 absolute -top-2 right-32 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px] sm:right-10 sm:-top-5 lg:right-28" />
                </div>
            </div>
        </div>
    )
}
