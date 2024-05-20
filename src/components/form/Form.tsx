import { useState } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather : (search : SearchType) => Promise<void>
}

export default function Form({fetchWeather} : FormProps) {
    const [search, setSearch] = useState<SearchType>({
        city : '',
        country : ''
    })
    const [alert, setAlert] = useState('')
    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearch({...search, [e.target.name] : e.target.value})
    }
    const handleSubmit = ( e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes('')){
            setAlert('Los campos estan vacios...')
            return
        } else {
            setAlert('')
            fetchWeather(search)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {alert && 
                <Alert>
                    {alert}
                </Alert>
            }
            <div className={styles.field}>
                <label htmlFor="city">Ciudad: </label>
                <input onChange={handleOnChange} value={search.city} className={styles.textbox} type="text" name="city" id="city" placeholder="Ciudad"/>
            </div>
            <div className={styles.field}>
                <label htmlFor="country">País: </label>
                <select onChange={handleOnChange} value={search.country} name="country" id="country" className={styles.textbox}>
                    <option value=""></option>
                    {countries.map(pais=> (
                        <option key={pais.code} value={pais.code}>{pais.name}</option>
                    ))}
                </select>
            </div>
            <input type="submit" value={`Consultar Clima`} className={styles.buttom}/>
        </form>
    )
}
