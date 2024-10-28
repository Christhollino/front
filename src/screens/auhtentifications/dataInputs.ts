type inputType = {
    name: string,
    placeholder: string,
    type: string,
    required: boolean,
    icon?: string,
    pattern?: string
}[];

export const clientData: inputType = [
    { name: "name", placeholder: "Nom du voyageur", type: "text", required: true, icon: "user.svg", pattern: "^[a-zA-Z ]+$" },
    { name: "lastname", placeholder: "Prenom du voyageur", type: "text", required: true, icon: "user.svg", pattern: "^[a-zA-Z ]+$" },
    { name: "password", placeholder: "Mot de passe", type: "password", required: true, icon: "lock.svg" },
    { name: "mail", placeholder: "Email", type: "email", required: true, icon: "mail.svg", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
    { name: "adresse", placeholder: "Adresse du voyageur", type: "text", required: true, icon: "location.svg" },
    { name: "cin", placeholder: "Numero CIN", type: "number", required: true, icon: "card.svg" },
    { name: "num_tel", placeholder: "034 00 000 00", type: "number", required: true, icon: "phone.svg", pattern: "^(034|033|032|038|036)\\d{7}$" },
    { name: "close_num", placeholder: "Numero telephone proche (faculatif)", type: "number", required: false, icon: "phone.svg" },
];

export const cooperativeData: inputType = [
    { name: "nif", placeholder: "NIF", type: "text", required: true, icon: "user.svg", pattern: "^[0-9a-zA-Z]+$" },
    { name: "stat", placeholder: "Stat", type: "text", required: true, icon: "lock.svg", pattern: "^[0-9a-zA-Z]+$" },
    { name: "name", placeholder: "nom du cooperative", type: "text", required: true, icon: "user.svg", pattern: "^[a-zA-Z0-9 ]+$" },
    { name: "centre", placeholder: "Votre centre", type: "text", required: true, icon: "location.svg" },
    { name: "mail", placeholder: "Adresse mail", type: "text", required: true, icon: "mail.svg", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
    { name: "num_tel", placeholder: "034 00 000 00", type: "number", required: true, icon: "phone.svg", pattern: "^(034|033|032|038|036)\\d{7}$" },
    { name: "password", placeholder: "Mot de passe", type: "password", required: true, icon: "lock.svg" },
];


