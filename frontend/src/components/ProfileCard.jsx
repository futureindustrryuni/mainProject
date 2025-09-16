import User from '/images/User.jpg'
import { GoVerified  ,GoLocation} from 'react-icons/go'
import { HiOutlineMail } from 'react-icons/hi'
import { MdEventNote } from 'react-icons/md'
import { RiGlobalLine } from 'react-icons/ri'
import { FaInstagram ,FaWhatsapp,FaFacebook, FaGithub, FaLinkedinIn, FaLinkedin  } from 'react-icons/fa'
import { AiOutlineLinkedin } from 'react-icons/ai'
export default function ProfileCard({ name='هانیه', email='hanirezaee@gmail.com', site="www.wonkapost.ir", locaion="خراسان رضوی ، مشهد", date="1401/01/12" }) {
    return (
        <>
            <div className='w-[100%] h-auto'>
                <div className='w-full bg-white mx-auto border-1 border-gray-300 rounded-2xl relative mt-10 px-2  lg:-mt-30 dark:bg-gray-800 dark:border-gray-800 '>
                    <div className='absolute top-0 left-1/2 transform -translate-x-1/2  -mt-12 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:mt-20'>
                        <img src={User} alt="" className='w-24 h-24 rounded-full border-white shadow object-cover border-4 lg:w-28 lg:h-28' />
                    </div>
                    <div className='mt-14 mx-auto flex mb-8 lg:mt-36'>
                        <div className='flex gap-2 mx-auto items-center'>
                            <GoVerified  className='dark:text-primary'/>
                            <h2 className='dark:text-white'>{name}</h2>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-x-10 gap-y-6 mt-4 lg:grid-cols-1 lg:pr-4 text-gray-500 text-sm dark:text-gray-300'>
                        <div className='flex gap-2 items-center  '>
                            <HiOutlineMail size={20} className='dark:text-primary'/>
                            <p>{email}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <RiGlobalLine size={20} className='dark:text-primary'/>
                            <p>{site}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <GoLocation size={20} className='dark:text-primary'/>
                            <p>{locaion}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <MdEventNote size={20} className='dark:text-primary'/>
                            <p>{date + " عضویت"}</p>
                        </div>
                    </div>
                    <div className='mt-10 mx-auto flex mb-4 lg:mt-20'>
                        <div className='flex gap-2 mx-auto items-center bg-thirdry rounded-lg px-3 py-1 dark:bg-primary/30'>
                            <GoLocation color='orange'/>
                            <p className='text-sm text-primary'>درخواست</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5 w-full '>
                    <div className='mx-auto  bg-thirdry flex gap-5 justify-center rounded-lg mb-10 py-2 w-52 lg:w-full dark:bg-gray-800'>
                        <FaWhatsapp size={20} color='orange'/>
                        <FaInstagram size={20} color='orange'/>
                        <FaLinkedin    size={20} color='orange'/>
                        <FaGithub size={20} color='orange'/>
                    </div>
                </div>
            </div>


        </>

    )
}