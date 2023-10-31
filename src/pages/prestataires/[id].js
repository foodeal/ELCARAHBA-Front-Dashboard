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

function PrestataireDetails() {

    const router = useRouter();
    const { id } = router.query;

    const [oldPrestataire, setPrestataire] = useState(null);

    useEffect(() => {
        if (id) {
            userServicesService.GetPrestataire(id).then((data) => {
                setPrestataire(data);
            });
        }
    }, [id]);

    if (!oldPrestataire) {
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
                {/* <Button variant="contained">
                    Retourner
                </Button> */}
            </div>
            <PrestataireDetailsForm
                prestataire={oldPrestataire}
            />
        </>
    );
};

function PrestataireDetailsForm({ prestataire }) {

    const [values, setValues] = useState({
        nom_prestataire: '',
        prenom_prestataire: '',
        email_prestataire: '',
        tel_prestataire: '',
        raison_sociale: '',
        role: '',
        pays_prestataire: '',
        ville_prestataire: '',
        adresse_prestataire: '',
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
                title="Détails de prestataire" />
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
                                helperText="Entrer le nom de prestataire"
                                label="Nom"
                                name="nom_prestataire"
                                onChange={handleChange}
                                required
                                value={prestataire.nom_prestataire} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Prenom"
                                name="prenom_prestataire"
                                onChange={handleChange}
                                required
                                value={prestataire.prenom_prestataire} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                name="email_prestataire"
                                onChange={handleChange}
                                required
                                value={prestataire.email_prestataire} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Numéro de téléphone"
                                name="tel_prestataire"
                                onChange={handleChange}
                                type="number"
                                value={prestataire.tel_prestataire} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Adresse"
                                name="adresse_prestataire"
                                onChange={handleChange}
                                required
                                value={prestataire.adresse_prestataire} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Select State"
                                name="ville_prestataire"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={prestataire.ville_prestataire}
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
    const prestataires = await userServicesService.getAllPrestataires();

    const paths = prestataires.map((user) => ({
        params: { id: user.id.toString() },
    }));

    console.log(paths);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { id } = params;
    try {
        var prestataire = await userServicesService.GetPrestataire(id);
        return {
            props: {
                prestataire: prestataire,
            },
        };
    } catch (error) {
        console.error('Error fetching prestataire details:', error);
        return {
            props: {
                prestataire: null,
            },
        };
    }
}


PrestataireDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default PrestataireDetails;