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

function ExpertDetails() {

    const router = useRouter();
    const { id } = router.query;

    const [oldExpert, setExpert] = useState(null);

    useEffect(() => {
        if (id) {
            userServicesService.getExpert(id).then((data) => {
                setExpert(data);
            });
        }
    }, [id]);

    if (!oldExpert) {
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
            <ExpertDetailsForm
                expert={oldExpert}
            />
        </>
    );
};

function ExpertDetailsForm({ expert }) {

    const [values, setValues] = useState({
        nom_prenom_expert: '',
        mail_expert: '',
        telephone_expert: '',
        domaine_expert: '',
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
                title="Détails de L'expert" />
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
                                helperText="Entrer le nom de l'expert"
                                label="Nom"
                                name="nom_prenom_expert"
                                onChange={handleChange}
                                required
                                value={expert.nom_prenom_expert} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Domaine de l'expert"
                                name="domaine_expert"
                                onChange={handleChange}
                                required
                                value={expert.domaine_expert} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                name="mail_expert"
                                onChange={handleChange}
                                required
                                value={expert.mail_expert} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Numéro de téléphone"
                                name="telephone_expert"
                                onChange={handleChange}
                                type="number"
                                value={expert.telephone_expert} />
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
    const experts = await userServicesService.getAllExpert();

    const paths = experts.map((expert) => ({
        params: { id: expert.id.toString() },
    }));

    console.log(paths);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { id } = params;
    try {
        var expert = await userServicesService.getExpert(id);
        return {
            props: {
                expert: expert,
            },
        };
    } catch (error) {
        console.error('Error fetching expert details:', error);
        return {
            props: {
                expert: null,
            },
        };
    }
}


ExpertDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default ExpertDetails;