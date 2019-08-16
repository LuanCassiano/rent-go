import axios from 'axios'

export const getGeoInfo = async (data) => {
    
    if(!data) throw new Error()

    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.street}.json?types=address&access_token=pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ`)

    const res = response.data.features[0]

    const coordinates = res.geometry.coordinates

    return coordinates
}

export const getDirectionInfo = async (latt1, long1, latt2, long2) => {

    if(!latt1 || !latt2 || !long1 || !long2) throw new Error()

    const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${long1},${latt1};${long2},${latt2}.json?access_token=pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ&geometries=geojson`)
    const path = response.data.routes[0].geometry.coordinates

    return path
}