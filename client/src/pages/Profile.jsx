import React from 'react'
import { useState, useEffect } from 'react'
import { DisplayCampaign } from '../components';

import { useStateContext } from '../context';

const Profile = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState([]) 

  const { address,contract,getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getUserCampaigns()
    console.log(data)
    setCampaign(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);
 

  return (
    <DisplayCampaign
    title='All Campaign'
    isLoading={isLoading}
    campaign={campaign}
    />
  )
}

export default Profile