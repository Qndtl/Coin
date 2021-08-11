export default function CoinDetail({ data }) {
  //console.log(data)

  return (
    <div className="container-lg">
      <h1 className="fw-bold" style={{ textTransform: "capitalize" }}>{data?.id}</h1>
      <p>{data?.description?.ko === "" ? data?.description?.en : data?.description?.ko}</p>
    </div>
  )
}