import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Search from "../../components/Search";
import Table from "../../components/Table";
import Head from "next/head";
import Image from "next/image";

const Page = () => {
  const router = useRouter();

  const { data: coins } = useSWR(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=20&page=${router.query.page}&sparkline=false`, async url => {
    const res = await axios.get(url);
    return res.data;
  }, {
    refreshInterval: 1000 * 60 * 5
  });

  const [pageQuery, setPageQuery] = useState(1);

  useEffect(() => {
    if (router?.query?.page) {
      setPageQuery(parseInt(router?.query?.page))
    }
  }, [router?.query?.page, setPageQuery])

  return (
    <>
      <Head>
        <title>Coin Chart | {pageQuery}</title>
        <link rel="icon" href="/bitcoin.ico" />
      </Head>
      <div className="m-0 d-flex flex-column justify-content-center" style={{ minHeight: "100vh" }}>
        <section>
          <Search />
        </section>
        <section>
          {coins ? <Table coins={coins} /> : <div className="container-lg d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Image src="/bitcoin.png" width={50} height={50} alt="coin" />
          </div>}
        </section>
        <section>
          <div className="container-lg d-flex justify-content-center">
            <button className="btn btn-outline-primary rounded-pill mx-3 mb-3" onClick={() => { setPageQuery(pageQuery - 1); router.push(`/page/${pageQuery - 1}`) }} disabled={pageQuery === 1}>Prev</button>
            <button className="btn btn-outline-primary rounded-pill mx-3 mb-3" onClick={() => { setPageQuery(pageQuery + 1); router.push(`/page/${pageQuery + 1}`) }}>Next</button>
          </div>
        </section>
      </div>
    </>
  )
}

export default Page;


/* export const getServerSideProps = async (context) => {
  const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=20&page=${context.params.page}&sparkline=false`);
  const coins = res.data;

  return {
    props: {
      coins,
    }
  }
}*/
