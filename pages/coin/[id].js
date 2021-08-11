import axios from "axios";
import { useRouter } from "next/dist/client/router"
import Chart from "../../components/Chart";
import CoinDetail from "../../components/CoinDetail";
import SmallTable from "../../components/SmallTable";
import Head from "next//head";

export default function Coin({ coinData, coinChartData }) {
  const router = useRouter();

  //console.log(coinData, coinChartData)

  const dateArr = [];
  const priceArr = [];

  coinChartData?.prices?.map(data => {
    const date = new Date(data[0]);
    dateArr.push(`${date.getMonth() + 1}/${date.getDate()}`);
    priceArr.push(data[1].toFixed(0).toLocaleString());
  })

  const data = {
    labels: dateArr,
    datasets: [
      {
        label: router?.query?.id,
        data: priceArr
      }
    ]
  }

  if (!coinData || !coinChartData) {
    return (
      <>
        <Head>
          <title style={{ textTransform: "capitalize" }}>Coin |</title>
        </Head>
        <h1>Loading...</h1>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title style={{ textTransform: "capitalize" }}>Coin | {coinData.id}</title>
        </Head>
        <div className="container-lg">
          <section>
            <Chart data={data} />
          </section>
          <section className="my-5">
            <SmallTable coinData={coinData} />
          </section>
          <section>
            <CoinDetail data={coinData} />
          </section>
        </div>
      </>
    )
  }
}

export const getStaticPaths = async () => {
  /* const res = await axios.get("https://api.coingecko.com/api/v3/coins/list");
  const coins = res.data;
  const paths = coins.map(coin => ({
    params: {
      id: coin.id
    }
  })); */

  return {
    paths: [{ params: { id: "bitcoin" } }, { params: { id: "ethereum" } }, { params: { id: "tether" } }],
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${context.params.id}`);
  const coinData = res.data;

  const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${context.params.id}/market_chart?vs_currency=krw&days=7`);
  const coinChartData = result.data;

  return {
    props: {
      coinData,
      coinChartData
    }
  }
}