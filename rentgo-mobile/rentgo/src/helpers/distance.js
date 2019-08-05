import axios from 'axios'

export const getDistance = async (lattOrigem, longOrigem, lattDest, longDest) => {

    if(!lattOrigem || !longOrigem || !lattDest || !longDest) {
        return null
    }

    const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${longOrigem},${lattOrigem};${longDest},${lattDest}.json?access_token=pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ`)

    const distance = response.data.routes[0].distance
    const formattedDistance = distance.toString()
    const newdistance = formattedDistance.substr(-20, 3)

    return newdistance
}