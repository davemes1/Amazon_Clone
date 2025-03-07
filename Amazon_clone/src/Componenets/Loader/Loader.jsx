
import BeatLoader from 'react-spinners/BeatLoader'

function Loader() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
    }}>
      <BeatLoader color="#36d7b7" />
    </div>
  )
}

export default Loader
