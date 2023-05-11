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

    const [values, setValues] = useState({
        nom_utilisateur: '',
        prenom_utilisateur: '',
        date_naissance: '',
        email: '',
        tel_utilisateur: '',
        role: '',
        pays_user: '',
        ville_user: '',
        adresse_user: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        console.log(values);
    }, [values]);

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
                                name="nom_utilisateur"
                                onChange={handleChange}
                                required
                                value={user.nom_utilisateur} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Prenom"
                                name="prenom_utilisateur"
                                onChange={handleChange}
                                required
                                value={user.prenom_utilisateur} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                required
                                value={user.email} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Numéro de téléphone"
                                name="tel_utilisateur"
                                onChange={handleChange}
                                type="number"
                                value={user.tel_utilisateur} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Adresse"
                                name="adresse_user"
                                onChange={handleChange}
                                required
                                value={user.adresse_user} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Select State"
                                name="ville_user"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={user.ville_user}
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
                <Button variant="contained">
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