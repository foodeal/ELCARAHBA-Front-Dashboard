import { useCallback, useMemo, useState } from 'react';
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

function GaragesPage({ garages }) {
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
    
    const [nomGarage, setNomGarage] = useState('');
    const [heures, setHeuresTravail] = useState('');
    const [jours, setJoursTravail] = useState('');
    const [type, setType] = useState('');
    const [contact, setContact] = useState('');
    const [adresse, setAdresse] = useState('');
    const [prestId,setPrestId] = useState('');
  
    const submitForm = (event) => {
        event.preventDefault(); 
        const newGarage = {
            nom_garage: nomGarage,
            heures_travail: heures,
            jours_travail: jours,
            adresse_garage: adresse,
            contact_garage:contact,
            type_garage: type,
            prestataire_id : prestId,
          };
        // const access_token = localStorage.getItem(localStorageKeys.token);
        const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5MjcwNDk3OCwiZXhwIjoxNjkzMzA5Nzc4fQ.KWCSfNwQ0QQushtWa2OK0icViCGXnkb4lBEPioEIc9U";
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios
          .post("https://79.137.85.120:443/garages/add" , newGarage)
          .then((response) => {
            console.log("Garage ajouté avec succès :", response.data); 
            setOpenDialog(false);
          })
          .catch((error) => {
            console.error('Erreur lors de la soumission du formulaire :', error); 
          });
    }

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
                                    Les garages {garages.length}
                                </Typography>
                                {/* <Stack
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
                                    </Button> */}
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowDownOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                        onClick={exportDataToExcel}
                                    >
                                        Exporter
                                    </Button>
                                {/* </Stack> */}
                            </Stack>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    onClick={handleOpenDialog}
                                >
                                    Ajouter
                                </Button>
                                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center', }}>
                  <DialogTitle>Ajouter un garage</DialogTitle>
                  <form onSubmit={submitForm}>
                    <DialogContent>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Nom garage" fullWidth sx={{ width: '50%' }} required type = 'text'
                            value={nomGarage}
                            onChange={(event) => setNomGarage(event.target.value)}
                          />
                          <TextField label="Heures de travail" fullWidth sx={{ width: '50%' }} required type = 'number'
                            value={heures}
                            onChange={(event) => setHeuresTravail(event.target.value)}
                          />

                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Jours de travail" fullWidth sx={{ width: '50%' }} required type='text'
                            value={jours}
                            onChange={(event) => setJoursTravail(event.target.value)}
                          />
                          <TextField label="Adresse" fullWidth sx={{ width: '50%' }} required type='text'
                            value={adresse}
                            onChange={(event) => setAdresse(event.target.value)}
                          />

                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Contact" fullWidth sx={{ width: '50%' }} required type='text'
                            value={contact}
                            onChange={(event) => setContact(event.target.value)}
                          />
                          <TextField label="Type du garage" fullWidth sx={{ width: '50%' }} 
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                          />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Id du prestataire" fullWidth sx={{ width: '50%' }} required type='text'
                            value={prestId}
                            onChange={(event) => setPrestId(event.target.value)}
                          />
                        </Stack>
                      </Stack>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog}>Annuler</Button>
                      <Button variant="contained" color="primary" type="submit">
                        Enregistrer
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
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

export async function getStaticProps() {
    try {
        const garages = await garagesServices.getAllGarages();
        return {
            props: {
                garages
            },
        };
    } catch (error) {
        console.error('Error fetching garages:', error);
        return {
            props: {
                garages: []
            },
        };
    }
}


export default GaragesPage;

GaragesPage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

