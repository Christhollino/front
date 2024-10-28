import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosError} from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Réutilisation des styles existants pour le design et les boutons

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ActionButton = styled.button<{ deleteButton?: boolean }>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: ${({ deleteButton }) => (deleteButton ? 'red' : '#007bff')};

    &:hover {
        color: ${({ deleteButton }) => (deleteButton ? '#b30000' : '#0056b3')};
    }
`;

const SubmitButton = styled.button`
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

const FormGroup = styled.div`
    margin-bottom: 15px;

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: white;
    border: 1px solid red;
    color: red;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 0, 0, 0.1);
    }
`;

const FormContainer = styled.div`
    width: 500px;
    margin: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
`;

// Styles pour le formulaire modal
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const TableCell = styled.td`
    padding: 15px; /* Augmentation du padding */
    border: 1px solid #ddd;
    font-size: 14px; /* Taille de police des cellules */
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2; /* Changer la couleur de fond des lignes paires */
    }

    &:hover {
        background-color: #e0f7fa; /* Change la couleur de fond lors du survol */
        transition: background-color 0.3s ease; /* Transition douce pour le changement de couleur */
    }
`;

const ToggleButton = styled.button`
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

// Les styles pour le tableau et les cellules
const TableContainer = styled.div`
    margin: 20px auto;
    width: 80%;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 4px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #069e01;
        color: white;
        font-weight: bold;
    }
`;

// Interface pour Voiture et les erreurs
interface Voiture {
    id: number;
    matricule: string;
    chauffeurId: number;
    status: string;
}

interface VoitureData {
    matricule: string;
    chauffeurId: number;
    status: string;
}

// Interface pour le type Chauffeur
interface Chauffeur {
    id: number;
    name: string;
    lastname: string;
}


// Liste de statuts possibles
const statusOptions = ["occupé", "disponible"];

// Composant principal pour la gestion des voitures
export function VoiturePag() {
    const [voitures, setVoitures] = useState<Voiture[]>([]);
    const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);
    const [data, setVoiture] = useState<VoitureData>({
        matricule: '',
        chauffeurId: 0,
        status: 'disponible',
    });

    const [formVisible, setFormVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingVoitureId, setEditingVoitureId] = useState<number | null>(null);

    // Charger la liste des chauffeurs et des voitures
    useEffect(() => {
        const fetchChauffeurs = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/chauffeur', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
                    },
                });
                // Trier les chauffeurs par ordre alphabétique (nom)
                const sortedChauffeurs = response.data.sort((a: Chauffeur, b: Chauffeur) => 
                    a.name.localeCompare(b.name)
                );
                setChauffeurs(sortedChauffeurs);
            } catch (error) {
                console.error('Erreur lors du chargement des chauffeurs:', error);
            }
        };

        const fetchVoitures = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/voiture', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
                    },
                });
                
                setVoitures(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Gestion d'erreur Axios
                    if (error.response) {
                        console.error('Erreur lors du chargement des voitures:', error.response.data);
                        console.error('Statut de la réponse:', error.response.status);
                    } else if (error.request) {
                        console.error('Aucune réponse reçue:', error.request);
                    } else {
                        console.error('Erreur:', error.message);
                    }
                } else {
                    // Gestion d'erreur générale
                    console.error('Erreur inconnue:', error);
                }
            }
        };

        fetchChauffeurs();
        fetchVoitures();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setVoiture({ ...data, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (editMode && editingVoitureId !== null) {
                const response = await axios.put(`http://127.0.0.1:3000/voiture/update/${editingVoitureId}`, data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
                    },
                });
            } else {
                const response = await axios.post('http://127.0.0.1:3000/voiture/create', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
                    },
            });
        }
            setVoiture({ matricule: '', id_chauffeur: '', status: ''});
            setError({ matricule: ''});
            setFormVisible(false);
            //setSuccessVisible(true);

            // Recharger les voitures après ajout
            const voituresResponse = await axios.get('http://127.0.0.1:3000/voiture', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
                },
            });
            setVoitures(voituresResponse.data);
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorResponse = axiosError.response?.data as ErrorResponse;

            if (errorResponse.field === 'matricule') {
                setError((prev) => ({ ...prev, matricule: errorResponse.message }));
            } else {
                console.error('Erreur lors de l\'ajout du chauffeur : ', error);
            }
        }
    };

    const handleEdit = (voiture: Voiture) => {
        setVoiture({
            matricule: voiture.matricule,
            chauffeurId: voiture.chauffeurId,
            status: voiture.status,
        });
        setEditingVoitureId(voiture.id);
        setEditMode(true);
        setFormVisible(true);
    };

    const toggleFormVisibility = () => {
        setEditMode(false);
        setEditingVoitureId(null);
        setVoiture({ matricule: '', chauffeurId: 0, status: 'disponible' });
        setFormVisible((prev) => !prev);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/voiture/delet/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
                },
            });
            setVoitures((prevVoitures) => prevVoitures.filter((voiture) => voiture.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la voiture:', error);
        }
    };

    return (
        <div>
            <ToggleButton onClick={toggleFormVisibility}>
                {editMode ? 'Modifier une Voiture' : 'Ajouter une Voiture'}
            </ToggleButton>

            {formVisible && (
                <ModalOverlay>
                    <FormContainer>
                        <CloseButton onClick={() => setFormVisible(false)}>X</CloseButton>
                        <h2>{editMode ? 'Modifier une Voiture' : 'Ajouter une Voiture'}</h2>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <label htmlFor="matricule">Matricule</label>
                                <input
                                    type="text"
                                    id="matricule"
                                    name="matricule"
                                    value={data.matricule}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="chauffeurId">Chauffeur</label>
                                <select
                                    id="chauffeurId"
                                    name="chauffeurId"
                                    value={data.chauffeurId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Sélectionnez un chauffeur</option>
                                    {chauffeurs.map((chauffeur) => (
                                        <option key={chauffeur.id} value={chauffeur.id}>
                                            {chauffeur.name} {chauffeur.lastname}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <SubmitButton type="submit">
                                {editMode ? 'Modifier' : 'Ajouter'}
                            </SubmitButton>
                        </form>
                    </FormContainer>
                </ModalOverlay>
            )}

            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Matricule</th>
                            <th>Chauffeur</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {voitures.map((voiture) => (
                            <TableRow key={voiture.id}>
                                <TableCell>{voiture.matricule}</TableCell>
                                <TableCell>
                                    {chauffeurs.find((ch) => ch.id === voiture.chauffeurId)?.name || 'N/A'}
                                </TableCell>
                                <TableCell>{voiture.status}</TableCell>
                                <TableCell>
                                    <ButtonContainer>
                                        <ActionButton onClick={() => handleEdit(voiture)}>
                                            <FaEdit />
                                        </ActionButton>
                                        <ActionButton onClick={() => handleDelete(voiture.id)} deleteButton>
                                            <FaTrash />
                                        </ActionButton>
                                    </ButtonContainer>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </StyledTable>
            </TableContainer>
        </div>
    );
}
