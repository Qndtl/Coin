import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

export default function Search() {
  const [coinName, setCoinName] = useState("");
  const [coinData, setCoinData] = useState(null);
  const searchCoin = async (e) => {
    e.preventDefault();
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}`);
    setCoinData(result.data);
  }
  return (
    <div className="container-lg my-3 d-flex flex-column align-items-center">
      <h2 className="fw-bold">Search Coin</h2>
      <form onSubmit={searchCoin}>
        <input className="mt-2" type="text" placeholder="Search" value={coinName} onChange={e => setCoinName(e.target.value)} />
      </form>
      {
        coinData ? <div className="d-flex align-items-center mt-2" style={{ height: "25px" }}>
          <Image src={coinData.image.small} alt={coinData.id} width={20} height={20} />
          <Link href={`/coin/${coinData.id}`}>
            <a className="ms-1" style={{ textDecoration: "none", color: "inherit" }}>
              <span style={{ fontSize: "18px" }}>{coinData.id}</span>
              <span className="ms-3 text-primary fw-bold">Go -&#62;</span>
            </a>
          </Link>
        </div> : null
      }
    </div>
  )
}
