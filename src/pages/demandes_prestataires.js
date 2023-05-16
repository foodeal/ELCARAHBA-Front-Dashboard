import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useCallback, useMemo, useState } from 'react';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import userServicesService from 'src/core/services/userServices.service';
import { CustomersSearch } from 'src/sections/user/customers-search';
import { DemandesTable } from 'src/sections/user/demandes-table';
import {
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

function PrestatairesWaitingForApprovalPage({ demandes }) {
    const useDemandes = (page, rowsPerPage) => {
        return useMemo(
            () => {
                return applyPagination(demandes, page, rowsPerPage);
            },
            [page, rowsPerPage]
        );
    };

    const useDemandeIds = (demandes) => {
        return useMemo(
            () => {
                return demandes.map((demande) => demande.id);
            },
            [demandes]
        );
    };

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event) => {
            setRowsPerPage(event.target.value);
        },
        []
    );

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const lesDemandes = useDemandes(page, rowsPerPage);
    const demandesIds = useDemandeIds(lesDemandes);
    const demandesSelection = useSelection(demandesIds);

    if (!demandes) {
        return <div>Loading...</div>
    }



    return (
        <>
            <Head>
                <title>
                    Demandes | Elcarhba
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}>

                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Les demandes en attentes {demandes.length}
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowUpOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Importer
                                    </Button>
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowDownOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Exporter
                                    </Button>
                                </Stack>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                >
                                    Ajouter
                                </Button>
                            </div>
                        </Stack>
                        <CustomersSearch />
                        <DemandesTable
                            count={demandes.length}
                            items={demandes}
                            onDeselectAll={demandesSelection.handleDeselectAll}
                            onDeselectOne={demandesSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={demandesSelection.handleSelectAll}
                            onSelectOne={demandesSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={demandesSelection.selected}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export async function getStaticProps() {
    try {
        const demandes = await userServicesService.getAllDemandes();
        return {
            props: {
                demandes
            },
        };
    } catch (error) {
        console.error('Error fetching demandes:', error);
        return {
            props: {
                demandes: []
            },
        };
    }
}



PrestatairesWaitingForApprovalPage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default PrestatairesWaitingForApprovalPage;