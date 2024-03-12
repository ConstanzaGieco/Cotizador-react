import { Fragment } from "react" //Fragment sirve para reemplazar crear un div
import { Marcas, Years, Planes } from "../constants"
import useCotizador from "../hooks/useCotizador"
import Error from "./Error"

export default function Formulario() {

    const {datos, handleChangeDatos, error, setError, cotizarSeguro} = useCotizador()

    const handleSubmit = e => {
        e.preventDefault()
        if(Object.values(datos).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        cotizarSeguro()
    }

    return (
        <>
            {error && <Error />}
            <form
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label className="block mb-3 font-bold text-gray-500 uppercase">Marca</label>
                    <select name="marca" className="w-full bg-white border border-gray-200" onChange={e => handleChangeDatos(e)} value={datos.marca}>
                        <option value="">-- Selecciona Marca --</option>
                        {Marcas.map(marca => (
                            <option
                                key={marca.id}
                                value={marca.id}
                            >{marca.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="my-5">
                    <label className="block mb-3 font-bold text-gray-500 uppercase">Año</label>
                    <select name="year" className="w-full bg-white border border-gray-200" onChange={e => handleChangeDatos(e)} value={datos.year}>
                        <option value="">-- Selecciona Año del Modelo --</option>
                        {Years.map(year => (
                            <option
                                key={year}
                                value={year}
                            >{year}</option>
                        ))}
                    </select>
                </div>

                <div className="my-5">
                    <label className="block mb-3 font-bold text-gray-500 uppercase">Elige un Plan</label>
                    <div className="flex gap-3 items-center">
                        {Planes.map(plan => (
                            <Fragment key={plan.id}>
                                <label>{plan.nombre}</label> {/* el radio ya tiene asignado el value por medio de plan.id, por lo que no es necesario asignarle value={datos.plan} */}
                                <input type="radio" name='plan' value={plan.id} onChange={e => handleChangeDatos(e)}/>
                            </Fragment>
                        ))}
                    </div>
                </div>

                <input type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold" value='Cotizar'/>
            </form>
        </>
    )
}
