import Head from 'next/head';
import { useRouter } from 'next/router';
import carnetServicesService from 'src/core/services/carnetServices.service';
import { useCallback, useState, useEffect } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import {
    Button
} from '@mui/material';
import { CarnetCard } from 'src/sections/carnets/carnet_card';

function CarnetDetails() {
    const router = useRouter();
    const { id } = router.query;

    const [carnet, setCarnet] = useState(null);

    useEffect(() => {
        if (id) {
            carnetServicesService.getCarnet(id).then((data) => {
                setCarnet(data);
            });
        }
    }, [id]);

    if (!carnet) {
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
            <CarnetDetailsForm carnet={oldCarnet} />
        </>
    );
}

function CarnetDetailsForm({ carnet }) {
    const [values, setValues] = useState({
        date_vidange: '',
        klm_vidange: '',
        klm_plaque: '',
        date_batterie: '',
        date_assurance: '',
        date_visite: '',
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
        <>
            <Head>
                <title>
                    Carnet | Elcarhba
                </title>
            </Head>
            <CarnetCard carnet={carnet}></CarnetCard>
        </>
    );
}

export async function getStaticPaths() {
    const carnets = await carnetServicesService.getAllCarnets();
    const paths = carnets.map((carnet) => ({
        params: { id: carnet.id.toString() },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { id } = params;
    try {
        const carnet = await carnetServicesService.getCarnet(id);
        return {
            props: {
                carnet,
            },
        };
    } catch (error) {
        console.error('Error fetching carnet details:', error);
        return {
            props: {
                carnet: null,
            },
        };
    }
}

export default CarnetDetails;

CarnetDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);