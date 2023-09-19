import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from './functions/functions';

const FizzBuzz = () => {
    const [inputRangeA, setInputRangeA] = useState('');
    const [inputRangeB, setInputRangeB] = useState('');

    const [data, setData] = useState([]); // Estado para almacenar los datos de la API
    // Función para cargar los datos de la API usando Axios
    const fetchData = async () => {
        try {
            if (inputRangeA === '' && inputRangeB === '') {
                const response = await axios.get('http://127.0.0.1:8000/fizzbuzz');
                setData(response.data);
            }
            else if (inputRangeA === inputRangeB) {
                show_alert('Los numeros no deben ser iguales...', 'warning');
            } else {
                const url = 'http://127.0.0.1:8000/fizzbuzz/' + inputRangeA.toString() + '/' + inputRangeB.toString();
                const response = await axios.get(url);
                setData(response.data);
            }

        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };
    // Cargar los datos de la API cuando el componente se monte
    useEffect(() => {
        fetchData();
    }, []); // El segundo argumento vacío asegura que esto se ejecute solo una vez al montar el componente

    const [inputNumber, setInputNumber] = useState('');
    const [result, setResult] = useState([]);

    const handleButtonClick = async () => {
        try {
            if (inputNumber.trim() === '') {
                show_alert('Completa el campo numero', 'warning');
            } else {
                const url = 'http://127.0.0.1:8000/fizzbuzz/' + inputNumber.toString();
                const response = await axios.get(url);
                setResult(response.data);
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    return (
        <div className="App" data-bs-theme="light">
            <div className="container mt-5">
                <div className='row'>
                    <div className='col-10'>
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
                        <h3>Consulta por rango de numeros:</h3>
                        <input type='number' value={inputRangeA} onChange={(e) => setInputRangeA(e.target.value)} />
                        <input type='number' value={inputRangeB} onChange={(e) => setInputRangeB(e.target.value)} />
                        <button onClick={fetchData}>Calcular</button><br></br>
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
                    <div className='col-6'>
                        <h1>Resultado</h1>
                        <p>Este es el resultado de la famosa prueba de Fizz Buzz.</p>
                        <p>Pero no nos quedamos solo con un print(), tenemos más consultas en las otras dos pestañas.</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Resultado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.item_id}>
                                        <td>{item.item_id}</td>
                                        <td>{item.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Anterior</a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">Siguiente</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default FizzBuzz;
