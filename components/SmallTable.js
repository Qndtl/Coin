import Image from "next/image";

export default function SmallTable({ coinData }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Rank</th>
          <th>Price</th>
          <th>24h</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Image src={coinData?.image.small} width={25} height={25} alt={coinData.symbol} /></td>
          <td>{coinData?.market_cap_rank}</td>
          <td>&#8361;{coinData?.market_data.current_price.krw.toLocaleString()}</td>
          <td className={coinData?.market_data.price_change_percentage_24h < 0 ? "text-danger" : "text-success"}>{coinData?.market_data.price_change_percentage_24h.toFixed(2)}%</td>
        </tr>
      </tbody>
    </table>
  )
}