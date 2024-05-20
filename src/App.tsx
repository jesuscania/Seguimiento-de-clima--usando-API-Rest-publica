import styles from "./App.module.css"
import Loading from "./components/Loading/Loading"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"
import Form from "./components/form/Form"
import useWeather from "./hooks/useWeather"

function App() {

  const { fetchWeather, weather, loading, notFound } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Clima</h1>
      <div className={styles.container}>
        <Form
        fetchWeather={fetchWeather}
        />
        {loading &&
          <Loading />
        }
        {notFound &&
          <p className={styles.notfound}>Localidad no encontrada</p>
        }
        {!(weather.name === '') && 
        <WeatherDetail 
        weather = {weather}
        />
      }
      </div>
    </>
  )
}

export default App
