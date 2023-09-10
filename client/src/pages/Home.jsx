import React from 'react'
import { useState, useEffect } from 'react'
import { DisplayCampaign } from '../components';

import { useStateContext } from '../context';

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState([]) 

  const { address,contract,getCampaign } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getCampaign()
    setCampaign(data)
    setIsLoading(false)
  }



  useState(() => {
    if(contract) fetchCampaigns();
  },[address,contract])
 

  return (
    <DisplayCampaign
    title='All Campaign'
    isLoading={isLoading}
    campaign={campaign}
    />
  )
}

export default Home