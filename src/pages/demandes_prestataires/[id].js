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


function DemandeDetails() {

    const router = useRouter();
    const { id } = router.query;

    const [oldPrestataire, setPrestataire] = useState();

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
                    </Grid>
                </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained">
                    Approuver
                </Button>
            </CardActions>
        </Card>
    </form>;
}

// export async function getStaticPaths() {
//     const demandes = await userServicesService.getAllDemandes();

//     const paths = demandes.map((demande) => ({
//         params: { id: demande.id.toString() },
//     }));

//     console.log(paths);
//     return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//     const { id } = params;
//     try {
//         demande = await userServicesService.getDemande(id);
//         return {
//             props: {
//                 demande: demande,
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching user details:', error);
//         return {
//             props: {
//                 demande: null,
//             },
//         };
//     }
// }


DemandeDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default DemandeDetails;