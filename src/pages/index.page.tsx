import { ConnectButton, useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { ReactElement, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { parseEther } from 'viem';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { abi } from '~common/consts';
import { GeneralLayout } from '~layouts';

const HomePage = () => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const addRecentTransaction = useAddRecentTransaction();

  const { config } = usePrepareContractWrite({
    address: '0x7F48247521BFC69B64B6a1f637730f647DA58DD7',
    abi,
    functionName: 'safeMint',
    args: [
      address,
    ],
    value: parseEther('0.01'),
  });

  const { write, data } = useContractWrite(config);
  useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      toast.success(t('home:nft_minted'));
    },
    onError: () => {
      toast.error(t('home:mint_failed'));
    },
  });

  const mintToken = () => {
    write?.();
  };

  useEffect(() => {
    if (data?.hash) {
      addRecentTransaction({
        hash: data?.hash,
        description: 'Mint NFT!',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <NextSeo title={t('home:title')} />
      <div className="fixed right-4 top-4">
        <ConnectButton />
      </div>
      <div className="flex h-screen flex-col">
        <div className="m-auto text-center">
          <div className="text-center h-fit text-xl">
              <button
                type="button"
                onClick={() => {
                  mintToken();
                }}>
                Mint
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18next = await serverSideTranslations(locale as string, [
    'home',
    'general',
  ]);

  return {
    props: {
      ...i18next,
    },
  };
};

export default HomePage;
