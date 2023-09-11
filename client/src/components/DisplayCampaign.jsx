import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'


import FundCard from './FundCard'

const DisplayCampaign = ({ title, isLoading, campaign }) => {
  
    const navigate = useNavigate();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }

    return (
    <div>
        <h1 className='font-epilogue font-semibold text-[18px] text-white text-white'>{title} ({campaign.length}) </h1>
    
         <div className='flex flex-wrap mt-[20px] gap-[26px]'>
            {isLoading && (
                <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain'/>
            )}

            {!isLoading && campaign.length === 0 && (
                <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>You Have not created any Campaigns yet</p>
            )}

            {!isLoading && campaign.length > 0 && campaign.map((campaign) => 
               <FundCard 
                 key={campaign.id}
                 {...campaign} 
                 handleClick={() => handleNavigate(campaign)} 
                 />)}
         </div>
     

    </div> 
  )
}

export default DisplayCampaign