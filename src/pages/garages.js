/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import garagesServices from '../core/services/garagesServices.service';
import { GaragesSearch } from 'src/sections/garages/garages-search';
import { GaragesTable } from 'src/sections/garages/garages-table';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import * as XLSX from 'xlsx';
import api from 'src/core/services/helpers/api-get';

function GaragesPage() {
  const [garages, setGarages] = useState([]);
  useEffect(() => {
    const getGarages = async () => {
      try {
        const response = await api.get('https://79.137.85.120:443/garages/');
        setGarages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getGarages();
  }, []);

    const exportDataToExcel = () => {
        const dataForExcel = garages.map((garage) => [
            garage.nom_garage,
            garage.heures_travail,
            garage.jours_travail,
            garage.adresse_garage,
            garage.contact_garage,
            garage.type_garage,
        ]);
    
        const headerForExcel = ['Nom','Heures de travail','Jours de travail','Adresse','Contact','Type'];
        const data = [headerForExcel, ...dataForExcel];
    
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Garages');
    
        const fileName = 'garages.xlsx';
        XLSX.writeFile(workbook, fileName);
      };
    const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

    const useCustomers = (page, rowsPerPage) => {
        return useMemo(
            () => {
                return applyPagination(garages, page, rowsPerPage);
            },
            [page, rowsPerPage]
        );
    };

    const useCustomerIds = (customers) => {
        return useMemo(
            () => {
                return customers.map((customer) => customer.id);
            },
            [customers]
        );
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection = useSelection(customersIds);
    
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

    if (!garages) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                {/* Garages */}
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Les Garages 
                                    {/* {garages.length} */}
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
                                    
                                </Stack>
                            </Stack>
                            <div>
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
                        <GaragesSearch />
                        <GaragesTable
                            count={garages.length}
                            items={garages}
                            onDeselectAll={customersSelection.handleDeselectAll}
                            onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={customersSelection.handleSelectAll}
                            onSelectOne={customersSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={customersSelection.selected}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

// export async function getStaticProps() {
//     try {
//         const garages = await garagesServices.getAllGarages();
//         return {
//             props: {
//                 garages
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching garages:', error);
//         return {
//             props: {
//                 garages: []
//             },
//         };
//     }
// }


export default GaragesPage;

GaragesPage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

