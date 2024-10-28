// import React, { useState } from 'react';
// import styled from 'styled-components';
// import axios, { AxiosError } from 'axios';

// const FormContainer = styled.div`
//     max-width: 600px;
//     margin: 50px auto;
//     padding: 20px;
//     background-color: #f9f9f9;
//     border-radius: 10px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const FormGroup = styled.div`
//     margin-bottom: 15px;

//     label {
//         display: block;
//         margin-bottom: 5px;
//         font-weight: bold;
//     }

//     input {
//         width: 100%;
//         padding: 10px;
//         font-size: 16px;
//         border: 1px solid #ccc;
//         border-radius: 5px;
//     }
// `;

// const SubmitButton = styled.button`
//     display: block;
//     width: 100%;
//     padding: 10px;
//     background-color: #4CAF50;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     font-size: 16px;
//     cursor: pointer;

//     &:hover {
//         background-color: #45a049;
//     }
// `;

// const ErrorMessage = styled.div`
//     color: red;
//     margin-top: 5px; // Ajustement de l'espacement
// `;

// // Interface pour la réponse d'erreur
// interface ErrorResponse {
//     message: string;
//     field?: string; // Optionnel pour gérer les champs spécifiques
// }

// export function ChauffeurPag() {
//     const [data, setChauffeur] = useState({
//         name: '',
//         lastname: '',
//         num_tel: '',
//         cin: '',
//         adress: '',
//     });

//     // État des erreurs pour chaque champ spécifique
//     const [error, setError] = useState<{
//         num_tel: string;
//         cin: string;
//     }>({
//         num_tel: '',
//         cin: '',
//     });

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setChauffeur({ ...data, [name]: value });
//         // Réinitialiser l'erreur pour le champ modifié
//         setError({ ...error, [name]: '' });
//     };

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post('http://127.0.0.1:3000/chauffeur/create', data, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
//                 },
//             });
//             console.log('Chauffeur ajouté : ', response.data);
//             // Réinitialiser le formulaire après succès
//             setChauffeur({ name: '', lastname: '', num_tel: '', cin: '', adress: '' });
//             setError({ num_tel: '', cin: '' }); // Réinitialiser les erreurs
//         } catch (error) {
//             const axiosError = error as AxiosError; // Assertion de type
//             const errorResponse = axiosError.response?.data as ErrorResponse; // Type de réponse d'erreur

//             // Vérification des erreurs pour les champs spécifiques
//             if (errorResponse.field === 'num_tel') {
//                 setError(prev => ({ ...prev, num_tel: errorResponse.message }));
//             } else if (errorResponse.field === 'cin') {
//                 setError(prev => ({ ...prev, cin: errorResponse.message }));
//             } else {
//                 console.error('Erreur lors de l\'ajout du chauffeur : ', error);
//             }
//         }
//     };

//     return (
//         <FormContainer>
//             <h2>Ajouter un Chauffeur</h2>
//             <form onSubmit={handleSubmit}>
//                 <FormGroup>
//                     <label htmlFor="name">Nom</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={data.name}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <label htmlFor="lastname">Prénom</label>
//                     <input
//                         type="text"
//                         id="lastname"
//                         name="lastname"
//                         value={data.lastname}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <label htmlFor="num_tel">Numéro de Téléphone</label>
//                     <input
//                         type="tel"
//                         id="num_tel"
//                         name="num_tel"
//                         value={data.num_tel}
//                         onChange={handleInputChange}
//                         required
//                     />
//                     {error.num_tel && <ErrorMessage>{error.num_tel}</ErrorMessage>}
//                 </FormGroup>
//                 <FormGroup>
//                     <label htmlFor="cin">Numéro CIN</label>
//                     <input
//                         type="tel"
//                         id="cin"
//                         name="cin"
//                         value={data.cin}
//                         onChange={handleInputChange}
//                         required
//                     />
//                     {error.cin && <ErrorMessage>{error.cin}</ErrorMessage>}
//                 </FormGroup>
//                 <FormGroup>
//                     <label htmlFor="adress">Adresse</label>
//                     <input
//                         type="text"
//                         id="adress"
//                         name="adress"
//                         value={data.adress}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </FormGroup>
//                 <SubmitButton type="submit">Enregistrer</SubmitButton>
//             </form>
//         </FormContainer>
//     );
// }

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import axios, { AxiosError } from 'axios';

// const ModalOverlay = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
// `;

// const FormContainer = styled.div`
//     width: 500px; // Réduire la largeur du formulaire
//     margin: 20px;
//     padding: 20px;
//     background-color: #f9f9f9;
//     border-radius: 10px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     position: relative;
// `;

// const CloseButton = styled.button`
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     background: white;
//     border: 1px solid red;
//     color: red;
//     border-radius: 5px;
//     width: 30px;
//     height: 30px;
//     cursor: pointer;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     &:hover {
//         background-color: rgba(255, 0, 0, 0.1);
//     }
// `;

// const FormGroup = styled.div`
//     margin-bottom: 15px;

//     label {
//         display: block;
//         margin-bottom: 5px;
//         font-weight: bold;
//     }

//     input {
//         width: 100%;
//         padding: 10px;
//         font-size: 16px;
//         border: 1px solid #ccc;
//         border-radius: 5px;
//     }
// `;

// const SubmitButton = styled.button`
//     display: block;
//     width: 100%;
//     padding: 10px;
//     background-color: #4caf50;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     font-size: 16px;
//     cursor: pointer;

//     &:hover {
//         background-color: #45a049;
//     }
// `;

// const ErrorMessage = styled.div`
//     color: red;
//     margin-top: 5px;
// `;

// const ToggleButton = styled.button`
//     margin: 20px auto;
//     padding: 10px 20px;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;

//     &:hover {
//         background-color: #0056b3;
//     }
// `;

// const SuccessMessage = styled.div`
//     color: green;
//     margin-top: 15px;
//     font-weight: bold;
//     text-align: center;
// `;

// interface ChauffeurData {
//     name: string;
//     lastname: string;
//     num_tel: string;
//     cin: string;
//     adress: string;
// }

// interface ErrorResponse {
//     message: string;
//     field?: string;
// }

// export function ChauffeurPag() {
//     const [data, setChauffeur] = useState<ChauffeurData>({
//         name: '',
//         lastname: '',
//         num_tel: '',
//         cin: '',
//         adress: '',
//     });

//     const [error, setError] = useState<{
//         num_tel: string;
//         cin: string;
//     }>({
//         num_tel: '',
//         cin: '',
//     });

//     const [formVisible, setFormVisible] = useState(false);
//     const [successVisible, setSuccessVisible] = useState(false); // État pour gérer la visibilité du message de succès

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setChauffeur({ ...data, [name]: value });
//         setError({ ...error, [name]: '' });
//     };

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post('http://127.0.0.1:3000/chauffeur/create', data, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
//                 },
//             });
//             console.log('Chauffeur ajouté : ', response.data);
//             console.log('Response status:', response.status); // Ajouté pour le débogage

//             setChauffeur({ name: '', lastname: '', num_tel: '', cin: '', adress: '' });
//             setError({ num_tel: '', cin: '' });
//             setFormVisible(false);
//             setSuccessVisible(true); // Afficher le message de succès
//         } catch (error) {
//             const axiosError = error as AxiosError;
//             const errorResponse = axiosError.response?.data as ErrorResponse;

//             if (errorResponse.field === 'num_tel') {
//                 setError(prev => ({ ...prev, num_tel: errorResponse.message }));
//             } else if (errorResponse.field === 'cin') {
//                 setError(prev => ({ ...prev, cin: errorResponse.message }));
//             } else {
//                 console.error('Erreur lors de l\'ajout du chauffeur : ', error);
//             }
//         }
//     };

//     const toggleFormVisibility = () => {
//         setFormVisible(prev => !prev);
//         setSuccessVisible(false); // Réinitialiser le message de succès lors du changement de visibilité du formulaire
//     };

//     const closeModal = () => {
//         setFormVisible(false);
//     };

//     const closeSuccessMessage = () => {
//         setSuccessVisible(false); // Fermer le message de succès
//     };

//     return (
//         <div>
//             <ToggleButton onClick={toggleFormVisibility}>
//                 Ajouter un Chauffeur
//             </ToggleButton>

//             {formVisible && (
//                 <ModalOverlay>
//                     <FormContainer>
//                         <CloseButton onClick={closeModal}>X</CloseButton>
//                         <h2>Ajouter un Chauffeur</h2>
//                         <form onSubmit={handleSubmit}>
//                             <FormGroup>
//                                 <label htmlFor="name">Nom</label>
//                                 <input
//                                     type="text"
//                                     id="name"
//                                     name="name"
//                                     value={data.name}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <label htmlFor="lastname">Prénom</label>
//                                 <input
//                                     type="text"
//                                     id="lastname"
//                                     name="lastname"
//                                     value={data.lastname}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <label htmlFor="num_tel">Numéro de Téléphone</label>
//                                 <input
//                                     type="tel"
//                                     id="num_tel"
//                                     name="num_tel"
//                                     value={data.num_tel}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                                 {error.num_tel && <ErrorMessage>{error.num_tel}</ErrorMessage>}
//                             </FormGroup>
//                             <FormGroup>
//                                 <label htmlFor="cin">Numéro CIN</label>
//                                 <input
//                                     type="tel"
//                                     id="cin"
//                                     name="cin"
//                                     value={data.cin}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                                 {error.cin && <ErrorMessage>{error.cin}</ErrorMessage>}
//                             </FormGroup>
//                             <FormGroup>
//                                 <label htmlFor="adress">Adresse</label>
//                                 <input
//                                     type="text"
//                                     id="adress"
//                                     name="adress"
//                                     value={data.adress}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </FormGroup>
//                             <SubmitButton type="submit">Enregistrer</SubmitButton>
//                         </form>

//                         {successVisible && ( // Afficher le message de succès si ajouté avec succès
//                             <SuccessMessage>
//                                 Chauffeur ajouté
//                                 <button onClick={closeSuccessMessage}>OK</button>
//                             </SuccessMessage>
//                         )}
//                     </FormContainer>
//                 </ModalOverlay>
//             )}
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around; /* Espace entre les boutons */
    align-items: center;
`;

const ActionButton = styled.button<{ deleteButton?: boolean }>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px; /* Taille de l'icône */
    color: ${({ deleteButton }) => (deleteButton ? 'red' : '#007bff')}; /* Couleur rouge si bouton supprimer */

    &:hover {
        color: ${({ deleteButton }) => (deleteButton ? '#b30000' : '#0056b3')}; /* Couleur au survol */
    }
`;

// Styles pour le tableau
const TableContainer = styled.div`
    margin: 20px auto;
    width: 80%;
    border: 1px solid #ddd; /* Bordure autour du tableau */
    border-radius: 8px; /* Coins arrondis */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 4px; /* Réduction de l'espacement des cellules */
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #069e01;
        color: white; /* Couleur verte pour les en-têtes */
        font-weight: bold;
    }
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

const TableCell = styled.td`
    padding: 15px; /* Augmentation du padding */
    border: 1px solid #ddd;
    font-size: 14px; /* Taille de police des cellules */
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

const FormContainer = styled.div`
    width: 500px;
    margin: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
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

const ErrorMessage = styled.div`
    color: red;
    margin-top: 5px;
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

// Interface Chauffeur et erreurs
interface Chauffeur {
    id: number;
    name: string;
    lastname: string;
    num_tel: string;
    cin: string;
    adress: string;
}

interface ChauffeurData {
    name: string;
    lastname: string;
    num_tel: string;
    cin: string;
    adress: string;
}

interface ErrorResponse {
    message: string;
    field?: string;
}

// Composant principal
export function ChauffeurPag() {
    const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);
    const [data, setChauffeur] = useState<ChauffeurData>({
        name: '',
        lastname: '',
        num_tel: '',
        cin: '',
        adress: '',
    });

    const [error, setError] = useState<{ num_tel: string; cin: string }>({
        num_tel: '',
        cin: '',
    });

    const [formVisible, setFormVisible] = useState(false);
    //const [successVisible, setSuccessVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingChauffeurId, setEditingChauffeurId] = useState<number | null>(null);

    // Charger la liste des chauffeurs
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
        fetchChauffeurs();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setChauffeur({ ...data, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (editMode && editingChauffeurId !== null) {
                const response = await axios.put(`http://127.0.0.1:3000/chauffeur/update/${editingChauffeurId}`, data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
                    },
                });
            } else {
                const response = await axios.post('http://127.0.0.1:3000/chauffeur/create', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
                    },
            });
        }
            setChauffeur({ name: '', lastname: '', num_tel: '', cin: '', adress: '' });
            setError({ num_tel: '', cin: '' });
            setFormVisible(false);
            //setSuccessVisible(true);

            // Recharger les chauffeurs après ajout
            const chauffeursResponse = await axios.get('http://127.0.0.1:3000/chauffeur', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
                },
            });
            setChauffeurs(chauffeursResponse.data);
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorResponse = axiosError.response?.data as ErrorResponse;

            if (errorResponse.field === 'num_tel') {
                setError((prev) => ({ ...prev, num_tel: errorResponse.message }));
            } else if (errorResponse.field === 'cin') {
                setError((prev) => ({ ...prev, cin: errorResponse.message }));
            } else {
                console.error('Erreur lors de l\'ajout du chauffeur : ', error);
            }
        }
    };

    const handleEdit = (chauffeur: Chauffeur) => {
        setChauffeur({
            name: chauffeur.name,
            lastname: chauffeur.lastname,
            num_tel: chauffeur.num_tel,
            cin: chauffeur.cin,
            adress: chauffeur.adress,
        });
        setEditingChauffeurId(chauffeur.id);
        setEditMode(true);
        setFormVisible(true);
    };

    const toggleFormVisibility = () => {
        // Vérifiez si le formulaire est déjà visible
        if (formVisible) {
            // Si le formulaire est visible et qu'on le ferme, réinitialisez les données
            setEditMode(false);
            setEditingChauffeurId(null);
            setChauffeur({ name: '', lastname: '', num_tel: '', cin: '', adress: '' }); // Réinitialisez les données
        } else {
            // Sinon, ouvrez simplement le formulaire d'ajout
            setChauffeur({ name: '', lastname: '', num_tel: '', cin: '', adress: '' }); // Assurez-vous de réinitialiser ici aussi
        }
        setFormVisible((prev) => !prev);
        //setSuccessVisible(false);
    };

    const closeModal = () => {
        setFormVisible(false);
        setEditMode(false);
        setEditingChauffeurId(null);
    };

    // const closeSuccessMessage = () => {
    //     setSuccessVisible(false);
    // };

    // Fonction pour gérer la suppression d'un chauffeur
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/chauffeur/delet/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('itatitraToken')}`,
                },
            });
            // Mettre à jour la liste des chauffeurs après la suppression
            setChauffeurs((prevChauffeurs) => prevChauffeurs.filter((chauffeur) => chauffeur.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du chauffeur:', error);
        }
    };

    return (
        <div>
            <ToggleButton onClick={toggleFormVisibility}>
            Ajouter un Chauffeur
            </ToggleButton>

            {formVisible && (
                <ModalOverlay>
                    <FormContainer>
                        <CloseButton onClick={closeModal}>X</CloseButton>
                        <h2>{editMode ? 'Modifier un Chauffeur' : 'Ajouter un Chauffeur'}</h2>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <label htmlFor="name">Nom</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="lastname">Prénom</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={data.lastname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="num_tel">Numéro de téléphone</label>
                                <input
                                    type="text"
                                    id="num_tel"
                                    name="num_tel"
                                    value={data.num_tel}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.num_tel && <ErrorMessage>{error.num_tel}</ErrorMessage>}
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="cin">CIN</label>
                                <input
                                    type="text"
                                    id="cin"
                                    name="cin"
                                    value={data.cin}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.cin && <ErrorMessage>{error.cin}</ErrorMessage>}
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="adress">Adresse</label>
                                <input
                                    type="text"
                                    id="adress"
                                    name="adress"
                                    value={data.adress}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                            <SubmitButton type="submit">{editMode ? 'Modifier' : 'Ajouter'}</SubmitButton>
                        </form>
                    </FormContainer>
                </ModalOverlay>
            )}

            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Numéro de téléphone</th>
                            <th>CIN</th>
                            <th>Adresse</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chauffeurs.map((chauffeur) => (
                            <TableRow key={chauffeur.id}>
                                <TableCell>{chauffeur.name}</TableCell>
                                <TableCell>{chauffeur.lastname}</TableCell>
                                <TableCell>{chauffeur.num_tel}</TableCell>
                                <TableCell>{chauffeur.cin}</TableCell>
                                <TableCell>{chauffeur.adress}</TableCell>
                                <TableCell>
                                    <ButtonContainer>
                                        <ActionButton onClick={() => handleEdit(chauffeur)}>
                                            <FaEdit />
                                        </ActionButton>
                                        <ActionButton deleteButton onClick={() => handleDelete(chauffeur.id)}>
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

