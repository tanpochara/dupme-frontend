import { Contract, ethers } from "ethers";
import { useSigner } from "wagmi";
import { STAKER_ADDRESS } from "../constant/address";
import StakerABI from "../abis/StakerABI.json";

export const useStaker = () => {
  const { data: signer, isError } = useSigner();

  const getContract = () => {
    if (isError || !signer) {
      console.log("no singer found");
      return;
    }

    const contract = new ethers.Contract(STAKER_ADDRESS, StakerABI, signer);
    return contract;
  };

  const createRoom = async (amount: number, roomName: string) => {
    const contract = getContract();
    if (!contract) return;

    return await contract.createRoom(roomName, {
      value: ethers.utils.parseEther(`${amount}`),
    });
  };

  const joinRoom = async (amount: number, roomName: string) => {
    const contract = getContract();
    if (!contract) return;

    return await contract.joinRoom(roomName, {
      value: ethers.utils.parseEther(`${amount}`),
    });
  };

  const claimReward = async (roomName: string) => {
    const contract = getContract();
    if (!contract) return;

    return await contract.claimReward(roomName);
  };

  const getRoom = async (roomName: string) => {
    // console.log(process.env.RPC_PROVIDER);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/n1ydcokCWTdCEGPRnHRpZxA5sUyttOWr"
    );
    const contract = new ethers.Contract(STAKER_ADDRESS, StakerABI, provider);

    return await contract.rooms(roomName);
  };

  return {
    createRoom,
    joinRoom,
    getRoom,
    claimReward,
  };
};
