import { useCallback, useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { useRouter } from 'next/router';

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import userServicesService from 'src/core/services/userServices.service';
import { apiUrl, ApiUrlsEnum } from 'src/core/services/helpers';
const states = [
    {
        value: 'Ariana',
        label: 'Ariana'
    },
    {
        value: 'Béja',
        label: 'Béja'
    },
    {
        value: 'Ben Arous',
        label: 'Ben Arous'
    },
    {
        value: 'Bizerte',
        label: 'Bizerte'
    },
    {
        value: 'Gabès',
        label: 'Gabès'
    },
    {
        value: 'Gafsa',
        label: 'Gafsa'
    },
    {
        value: 'Jendouba',
        label: 'Jendouba'
    },
    {
        value: 'Kairouan',
        label: 'Kairouan'
    },
    {
        value: 'Kasserine',
        label: 'Kasserine'
    },
    {
        value: 'Kébili',
        label: 'Kébili'
    },
    {
        value: 'Le Kef',
        label: 'Le Kef'
    },
    {
        value: 'Mahdia',
        label: 'Mahdia'
    },
    {
        value: 'La Manouba',
        label: 'La Manouba'
    },
    {
        value: 'Médenine',
        label: 'Médenine'
    },
    {
        value: 'Monastir',
        label: 'Monastir'
    },
    {
        value: 'Nabeul',
        label: 'Nabeul'
    },
    {
        value: 'Sfax',
        label: 'Sfax'
    },
    {
        value: 'Sidi Bouzid',
        label: 'Sidi Bouzid'
    },
    {
        value: 'Siliana',
        label: 'Siliana'
    },
    {
        value: 'Sousse',
        label: 'Sousse'
    },
    {
        value: 'Tataouine',
        label: 'Tataouine'
    },
    {
        value: 'Tozeur',
        label: 'Tozeur'
    },
    {
        value: 'Tunis',
        label: 'Tunis'
    },
    {
        value: 'Zaghouan',
        label: 'Zaghouan'

    }
];

function UserDetails() {

    const router = useRouter();
    const { id } = router.query;

    const [oldUser, setUser] = useState(null);

    useEffect(() => {
        if (id) {
            userServicesService.getUser(id).then((data) => {
                setUser(data);
            });
        }
    }, [id]);

    if (!oldUser) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='
                flex
                items-center
                justify-center
                mt-6
                mb-6
                ml-6
                hover:text-blue-600
                cursor-pointer
            '>
                <Button variant="contained">
                    Retourner
                </Button>
            </div>
            <UserDetailsForm
                user={oldUser}
            />
        </>
    );
};

function UserDetailsForm({ user }) {

    const [nom_prenom, setNomPrenom] = useState(user.nom_utilisateur + " " + user.prenom_utilisateur);
    const [date_naissance, setDateNaissance] = useState(user.date_naissance);
    const [email, setEmail] = useState(user.email);
    const [tel_utilisateur, setTelUtilisateur] = useState(user.tel_utilisateur);
    const [ville_user, setVilleUser] = useState(user.ville_user);
    const [adresse_user, setAdresseUser] = useState(user.adresse_user);

    const updateUser = {
        "nom_prenom": nom_prenom,
        "date_naissance": date_naissance,
        "email": email,
        "tel_utilisateur": tel_utilisateur,
        "pays_user": user.pays_user,
        "ville_user": ville_user,
        "adresse_user": adresse_user,
        "motdepasse": user.motdepasse
    };

    const handleSubmit = (event) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODQ2OTEyOTQsImV4cCI6MTY4NTI5NjA5NH0.hjZEv7-KdEpN2QTC8uYH0xpcJvcF1mCy-ssZfOqL3lE";
        event.preventDefault();
        console.log(updateUser);
        // 👇 Send a fetch request to Backend API to update the user.
        fetch(apiUrl + "/users/" + user.id, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateUser),
        }).then((message) => console.log(message)).catch((error) => console.log(error));
    };

    return <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
    >
        <Card>
            <CardHeader
                subheader="Vous pouvez modifier ces informtions"
                title="Détails de l'utilisateurs" />
            <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                helperText="Entrer le nom de l'utilisateur"
                                label="Nom"
                                name="nom_prenom"
                                onChange={(event) => setNomPrenom(event.target.value)}
                                required
                                value={nom_prenom} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Date de naissance"
                                name="date_naissance"
                                onChange={(event) => setDateNaissance(event.target.value)}
                                required
                                value={date_naissance} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                value={email} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Numéro de téléphone"
                                name="tel_utilisateur"
                                onChange={(event) => setTelUtilisateur(event.target.value)}
                                type="number"
                                value={tel_utilisateur} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Adresse"
                                name="adresse_user"
                                onChange={(event) => setAdresseUser(event.target.value)}
                                required
                                value={adresse_user} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Select State"
                                name="ville_user"
                                onChange={(event) => setVilleUser(event.target.value)}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={ville_user}
                            >
                                {states.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" type='submit'>
                    Enregistrer
                </Button>
            </CardActions>
        </Card>
    </form>;
}

export async function getStaticPaths() {
    const users = await userServicesService.getAllUsers();

    const paths = users.map((user) => ({
        params: { id: user.id.toString() },
    }));

    console.log(paths);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { id } = params;
    try {
        user = await userServicesService.getUser(id);
        return {
            props: {
                user: user,
            },
        };
    } catch (error) {
        console.error('Error fetching user details:', error);
        return {
            props: {
                user: null,
            },
        };
    }
}


UserDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default UserDetails;