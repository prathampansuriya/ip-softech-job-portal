import React from 'react'
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai'
import { CiLocationOn } from 'react-icons/ci';
import CustomButton from './CustomButton';
import { popularSearch } from '../utils/data';
import { HeroImage } from '../assets';
import { useLocation } from 'react-router-dom';

const SearchInput = ({ placeholder, icon, value, setValue, styles }) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    };

    const clearInput = () => setValue("");

    return (
        <div className={`flex w-full md:w-1/3 items-center ${styles}`}>
            {icon}
            <input
                value={value}
                onChange={(e) => handleOnChange(e)}
                type='text'
                className='w-full md:w-64 p-2 outline-none bg-transparent text-base'
                placeholder={placeholder}
            />
            <AiOutlineCloseCircle
                className='hidden md:flex text-gray-600 text-xl cursor-pointer'
                onClick={clearInput}
            />
        </div>
    );
};

const Header = ({
    title,
    type,
    handleClick,
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
}) => {

    const url = useLocation();
    const showHeroImage = !url.pathname.includes('companies');

    return (
        <div className='bg-[#f7fdfd]'>
            <div className={`container mx-auto px-5 ${type ? "h-[500px]" : "h-[350px]"} flex items-center justify-between relative`}>
                <div className='w-full z-10 md:w-2/3'>
                    <div className='mb-8'>
                        <p className='text-slate-700 font-bold text-4xl'>{title}</p>
                        <span className='text-blue-600 hidden md:block'>Developed by Pratham Pansuriya</span>
                        <span className='text-blue-600 block md:hidden'>Developed by<br></br>Pratham Pansuriya</span>
                    </div>

                    <div className='w-full flex flex-col md:flex-row items-center justify-around bg-white px-2
                    md:px-4 md:py-4 shadow-lg rounded-full'>
                        <div className='flex w-full items-center mb-4 md:mb-0 gap-10'>
                            <SearchInput
                                placeholder="Job title or keywords"
                                icon={<AiOutlineSearch className='text-gray-600 text-xl' />}
                                value={searchQuery}
                                setValue={setSearchQuery}
                            />

                            <SearchInput
                                placeholder='Add Country or City'
                                icon={<CiLocationOn className='text-gray-600 text-xl' />}
                                value={location}
                                setValue={setLocation}
                                styles={"hidden md:flex"}
                            />

                            <div className='mt-4 md:mt-0'>
                                <CustomButton
                                    onClick={handleClick}
                                    title='Search'
                                    containerStyles={
                                        "text-white py-2 md:py-3 px-3 md:px-10 focus:outline-none bg-blue-600 rounded-full md:rounded-md text-sm md:text-base"
                                    }
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {showHeroImage && (
                    <div className='absolute md:relative w-1/2 md:w-1/3 h-auto top-[150px] right-0 md:top-0 md:right-10 2xl:right-[18rem] p-4 md:p-0'>
                        <img src={HeroImage} className='object-contain w-full md:w-auto md:h-full' alt='Hero Image' />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;
