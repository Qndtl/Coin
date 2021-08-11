import { Line } from 'react-chartjs-2';

export default function Chart({ data }) {
  return (
    <div className="container-lg">
      <Line data={data} />
    </div>
  )
}