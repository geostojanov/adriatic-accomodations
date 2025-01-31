import { useParams } from 'react-router-dom'

// styles
import './Accomodation.css'

export default function Accomodation() {
  const { id } = useParams()
  return (
    <div className='accomodation'>
      <h2>Accomodation detail - { id }</h2>
    </div>
  )
}
