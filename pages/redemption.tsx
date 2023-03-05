export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: true,
      destination: '/dashboard/rewards',
    },
  }
}

/**
 * This was linked in https://www.ironfish.network/blog/2023/02/28/testnet-rewards,
 * so we should retain the link and redirect.
 */
export default function Redemption() {
  return null
}
