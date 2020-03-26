import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('/incidents/query', {
            headers: {
                Authorization: ongId
            }
        }).then( response => {
            setIncidents(response.data)
        }).catch( error => {

        });
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(error) {
            alert('Não foi possível deletar o incidente, tente mais tarde.')
        }
    }

    async function handleLogout(){
        localStorage.removeItem('ongId');
        localStorage.removeItem('ongName');
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Hero"/>
                <span>Bem vindo, {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogout}>
                    <FiPower size="18" color="#e02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
              {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>
                    
                    <strong>Descrição</strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} typ="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
              ))}
            </ul>

        </div>
    )
}