import Link from 'next/link'
import Image from 'next/image'

const Table = ({ coins }) => {
  return (
    <>
      <div className="container-lg">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Img</th>
              <th scope="col">ID</th>
              <th scope="col">24h%</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {
              coins?.map(coin => <tr key={coin.id}>
                <td scope="row">
                  <Link href={`/coin/${coin.id}`}>
                    <a>
                      <Image src={coin.image} width={25} height={25} alt={coin.id} />
                    </a>
                  </Link>
                </td>
                <td className="fw-bold align-middle">
                  <Link href={`/coin/${coin.id}`}>
                    <a style={{ textDecoration: "none", color: "inherit", fontSize: "12px" }}>{coin.id.toUpperCase()}</a>
                  </Link>
                </td>
                <td style={{ fontSize: "12px" }} className={coin.price_change_percentage_24h !== null && coin.price_change_percentage_24h > 0 ? "text-success fw-bold" : "text-danger fw-bold"}>
                  {coin.price_change_percentage_24h !== null ? coin.price_change_percentage_24h.toFixed(2) : "0.00"}
                </td>
                <td style={{ fontSize: "12px" }} className="fw-bold">&#8361;{coin.current_price.toLocaleString()}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table;