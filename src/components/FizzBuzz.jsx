import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from './functions/functions';

const FizzBuzz = () => {
    const [data, setData] = React.useState([]);

    const [inputRangeA, setInputRangeA] = React.useState('');
    const [inputRangeB, setInputRangeB] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/fizzbuzz');
                setData(response.data);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        }
        fetchData();
    }, [inputRangeA, inputRangeB]);

    const buttonByRange = async () => {
        try {
            if (inputRangeA === inputRangeB) {
                show_alert('Los numeros no deben ser iguales...', 'warning');
            } else {
                const url = `http://127.0.0.1:8000/fizzbuzz/${inputRangeA}/${inputRangeB}`;
                const response = await axios.get(url);
                setData(response.data);
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    const [result, setResult] = React.useState([]);
    const [inputNumber, setInputNumber] = React.useState('');

    const handleButtonClick = async () => {
        try {
            if (inputNumber.trim() === '') {
                show_alert('Completa el campo numero', 'warning');
            } else {
                const url = `http://127.0.0.1:8000/fizzbuzz/${inputNumber}`;
                const response = await axios.get(url);
                setResult(response.data);
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className='row'>
                    <div className='text-center pt-5 pb-5 col-10'>
                        <h1>EL FAMOSO FIZZ BUZZ</h1>
                    </div>
                    <div className='col-4'>
                        <p>
                            Escribe un programa que muestre por consola (con un print) los
                            números de 1 a 100 (ambos incluidos y con un salto de línea entre
                            cada impresión), sustituyendo los siguientes:</p>
                        <p>- Múltiplos de 3 por la palabra fizz.</p>
                        <p>- Múltiplos de 5 por la palabra buzz.</p>
                        <p>- Múltiplos de 3 y de 5 a la vez por la palabra fizzbuzz.</p>
                        <hr></hr>
                        <h3>Busca el Multipo de:</h3>
                        <input type='number' id='numberid' value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} />
                        <button onClick={handleButtonClick}>Calcular</button><br></br><br></br>
                        {result.map((value) => (
                            <h4 key={value.item_id}>Resultado: {value.item_id} | {value.message}</h4>

                        ))}
                        <hr></hr>
                        <p>El contenido de este proyecto lo puedes encontrar en GitHub:</p>
                        <div className='row'>
                            <div className='col-6'>
                                <h3>Back End <a href='#' title='Back End FizzBuzz'><i className="fa-brands fa-github"></i></a></h3>
                                <ul>
                                    <li>Python</li>
                                    <li>FastAPI</li>
                                    <li>Uvicorn</li>
                                    <li>Pydantic</li>
                                </ul>
                            </div>
                            <div className='col-6'>
                                <h3>Front End <a href='#' title='Front End FizzBuzz'><i className="fa-brands fa-github"></i></a></h3>
                                <ul>
                                    <li>React</li>
                                    <li>Bootstrap</li>
                                    <li>Fortawesome-Free</li>
                                    <li>Swal</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-8 text-center'>
                        <h3>Consulta por rango de numeros:</h3>
                        <input type='number' value={inputRangeA} onChange={(e) => setInputRangeA(e.target.value)} />
                        <input type='number' value={inputRangeB} onChange={(e) => setInputRangeB(e.target.value)} />
                        <button onClick={buttonByRange}>Calcular</button><br></br>
                        <h1 className='pt-5'>Resultado</h1>
                        <p>Este es el resultado de la famosa prueba de Fizz Buzz.</p>
                        <p>Pero no nos quedamos solo con un print(), creamos una API para ver los resultados.</p>
                        <table className="table table-sm table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Resultado</th>
                                </tr>
                            </thead>
                            <tbody className='table table-dark table-sm'>
                                {data.map((item) => (
                                    <tr key={item.item_id}>
                                        <td>{item.item_id}</td>
                                        <td>{item.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default FizzBuzz;
