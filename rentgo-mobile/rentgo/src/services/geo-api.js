import axios from 'axios'

export const getGeoInfo = async (data) => {
    
    if(!data) throw new Error()

    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.street}.json?types=address&access_token=pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ`)

    const res = response.data.features[0]
    console.log('res', res)

    const coordinates = res.geometry.coordinates

    return coordinates
}