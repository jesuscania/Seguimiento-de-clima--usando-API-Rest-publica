import axios from "axios"
import { SearchType } from "../types"
import { z } from 'zod'
import { useState } from "react"

//tipado para consultas de un apiRest
const Weather =  z.object({
    name : z.string(),
    main : z.object({
        temp : z.number(),
        temp_max : z.number(),
        temp_min : z.number()
    })
})

export type weatherType = z.infer<typeof Weather>

export default function useWeather() {

    const [weather, setWeather] = useState<weatherType>({
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })
    const [notFound, setNotFound] = useState(false)

    const [loading, setLoading] = useState(false)

    const fetchWeather = async (search : SearchType) => {
        try {
            const apiKey = import.meta.env.VITE_WEATHER_KEY
            setLoading(true)
            setNotFound(false)
            setWeather({        
                name: '',
                main: {
                    temp: 0,
                    temp_max: 0,
                    temp_min: 0}
            })
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`
            const {data} = await axios(geoUrl)    
            if(!data[0]){
                setNotFound(true)
                return
            }
            const weatherUrl = await `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}`
            const {data : weatherData} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherData)
            if(result.success){
                setWeather(result.data)
            } else {
                console.log('Error de consulta al api(type)')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    return {
        fetchWeather,
        weather,
        loading,
        notFound
    }
}
