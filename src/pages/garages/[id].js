import { useRouter } from 'next/router';
import garagesServicesService from 'src/core/services/garagesServices.service';
import { useCallback, useState, useEffect } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
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


function GarageDetails() {

    const router = useRouter();
    const { id } = router.query;

    const [oldGarage, setGarage] = useState(null);

    useEffect(() => {
        if (id) {
            garagesServicesService.getGarageDetails(id).then((data) => {
                setGarage(data);
            });
        }
    }, [id]);

    if (!oldGarage) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Arrow to go back styled using tailwind css */}
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
            <GarageDetailsForm garage={oldGarage} />
        </>
    );

};

const types = [
    {
        label: 'Tous',
        value: 'all'
    },
    {
        label: 'Partielle',
        value: 'half'
    },
];

function GarageDetailsForm({ garage }) {

    const [values, setValues] = useState({
        nom_garage: '',
        heures_travail: '',
        jours_travail: '',
        adresse_garage: '',
        contact_garage: '',
        type_garage: '',
    });

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            <Card>
                <CardHeader
                    subheader="Vous pouvez modifier les informations"
                    title="Détails de garage"
                />
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
                                    helperText="Entrer le nom de garage"
                                    label="Nom garage"
                                    name="nom_garage"
                                    onChange={handleChange}
                                    required
                                    value={garage.nom_garage}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Heures de travail"
                                    name="heures_travail"
                                    onChange={handleChange}
                                    required
                                    value={garage.heures_travail}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Jours de travail"
                                    name="jours_travail"
                                    onChange={handleChange}
                                    required
                                    value={garage.jours_travail}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    onChange={handleChange}
                                    type="number"
                                    value={values.phone}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Adresse de garage"
                                    name="adresse_garage"
                                    onChange={handleChange}
                                    required
                                    value={garage.adresse_garage}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Contact"
                                    name="contact_garage"
                                    onChange={handleChange}
                                    required
                                    value={garage.contact_garage}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Type de garage"
                                    name="type_garage"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={garage.type_garage}
                                >
                                    {types.map((option) => (
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
        </form>
    );
}

export async function getStaticPaths() {
    const garages = await garagesServicesService.getAllGarages();
    const paths = garages.map((garage) => ({
        params: { id: garage.id.toString() },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { id } = params;
    try {
        const garage = await garagesServicesService.getGarageDetails(id);
        return {
            props: {
                garage,
            },
        };
    } catch (error) {
        console.error('Error fetching garage details:', error);
        return {
            props: {
                garage: null,
            },
        };
    }
}

GarageDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default GarageDetails;

