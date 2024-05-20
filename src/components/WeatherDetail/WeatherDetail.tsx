import { formatTemperature } from "../../utils";
import { weatherType } from "../../hooks/useWeather";
import styles from './WeatherDetail.module.css'


export default function WeatherDetail({weather} : {weather : weatherType}) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Localidad: <span className={styles.cityText}>{weather.name}</span></h2>
            <p className={styles.r}>Temperatura Actual : <span className={styles.P_temp}>{formatTemperature(weather.main.temp)}&deg;C</span></p>
            <div className={styles.container2}>
                <p className={styles.p}>Min: <span className={styles.temp}>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
                <p className={styles.p}>Max: <span className={styles.temp}>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
            </div>
        </div>
    )
}
