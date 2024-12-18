import React , {useContext, createContext} from "react";

import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x300621bc83627D4daCD6A835f7A046C8A2804d91');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.target,
					new Date(form.deadline).getTime(), // deadline,
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaign = async () => {
    const campaign = await contract.call('getCampaign');

    const parsedCampaign = campaign.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i,
    }));

    console.log(parsedCampaign);
    return parsedCampaign;
  } 

  const getUserCampaigns = async () => {
    const allCampaign = await getCampaign();

    const filteredCampaigns = allCampaign.filter((campaign) => 
    campaign.owner === address
    )
    return filteredCampaigns;

  }

  const donate = async (pId, amount) => {
   const data = await contract.call('donateCampaign', [pId], { value: ethers.utils.parseEther(amount)})

   return data;
  }

  const getDonations = async (pId, amount) => {
   const donations = await contract.call('getDonaters', [pId]);
   const numberOfDonations = donations[0].length; 

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator:donations[0][i],
        donations:ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  return(
    <StateContext.Provider 
         value={{ 
          address, 
          contract, 
          connect,
          createCampaign:publishCampaign,
          getCampaign,
          getUserCampaigns,
          donate,
          getDonations
        }}>
        { children }
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);

