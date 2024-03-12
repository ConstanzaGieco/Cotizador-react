import { useCallback, useMemo, useRef } from "react"
import useCotizador from "../hooks/useCotizador"
import {Marcas, Planes} from '../constants/index'

export default function Resultado() {

    const {resultado, datos} = useCotizador()
    const { marca, plan, year } = datos
    //useRef es lo mismo que useCallback, solo que no necesita una funcion como parametro
    const yearRef = useRef(year)

    //useCallback se usa para evitar el re-render de react, si no lo coloco y por ejemplo cambio de plan o de marca, me va a cambiar los datos en el Resumen cuando lo que quiero es que se mantengan esos datos y cambien en sí cuando se le de a Cotizar.
    //useCallback tiene dos parametros, la funcion y cuándo sí quiero que se haga el re-render.
    const [nombreMarca] = useCallback(
        Marcas.filter(m => m.id === Number(marca)), 
        [resultado]
    )

    //useMemo es lo mismo que useCallback, solo que necesita primero un arrow function y beneficia la optimidad de la app
    const [nombrePlan] = useMemo(() =>
        Planes.filter(p => p.id === Number(plan)),
        [resultado]    
    )
    
    if(resultado === 0) return null

  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
        <h2 className="text-gray-600 font-black text-3xl">
            Resumen
        </h2>
        <p className="my-2">
            <span className="font-bold">Marca: </span>
            {nombreMarca.nombre}
        </p>
        <p className="my-2">
            <span className="font-bold">Plan: </span>
            {nombrePlan.nombre}
        </p>
        <p className="my-2">
            <span className="font-bold">Año del auto: </span>
            {yearRef.current}
        </p>
        <p className="my-2 text-2xl">
            <span className="font-bold">Total Cotización: </span>
            {resultado}
        </p>
    </div>
  )
}
