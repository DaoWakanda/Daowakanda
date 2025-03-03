import { BountyAppSpec } from '@/artifacts/Bounty.arc32';
import { ApplicationClient } from '@algorandfoundation/algokit-utils/types/app-client';
import * as algokit from '@algorandfoundation/algokit-utils';
import { useWallet } from '@txnlab/use-wallet-react';
import algosdk from 'algosdk';

export const useDeveloperContractActions = () => {
  const { activeAddress, algodClient, transactionSigner } = useWallet();

  const claimReward = async (amount: number, smartContractId: number) => {
    if (!activeAddress) throw new Error('No connected wallet');

    const appClient = new ApplicationClient(
      {
        resolveBy: 'id',
        id: smartContractId,
        app: JSON.stringify(BountyAppSpec),
      },
      algodClient,
    );

    const boxValue = await appClient.getBoxValue(
      algosdk.decodeAddress(activeAddress).publicKey,
    );

    if (!boxValue) {
      throw new Error(
        `No bounty found in smart contract for the address ${activeAddress}`,
      );
    }

    const claimableAmount = algosdk.decodeUint64(boxValue, 'mixed');

    const amountToClaim = Number(algokit.algos(amount));

    if (amountToClaim > claimableAmount) {
      throw new Error(
        `You are trying to claim more than what is available in the smart contract for the address ${activeAddress}`,
      );
    }

    const atomTransactionComposer = new algosdk.AtomicTransactionComposer();
    const suggestedParams = await algodClient.getTransactionParams().do();

    const abiMethod = appClient.getABIMethod('claimBounty');

    if (!abiMethod) {
      throw new Error('Smart contract error:ClaimBounty method not found');
    }

    atomTransactionComposer.addMethodCall({
      appID: smartContractId,
      method: abiMethod,
      methodArgs: [amountToClaim],
      sender: activeAddress,
      suggestedParams: {
        ...suggestedParams,
        flatFee: true,
        fee: 2000,
      },
      signer: transactionSigner,
      boxes: [
        {
          appIndex: smartContractId,
          name: algosdk.decodeAddress(activeAddress).publicKey,
        },
      ],
    });

    const response = await atomTransactionComposer.execute(algodClient, 8);
    return response;
  };

  return {
    claimReward,
  };
};
