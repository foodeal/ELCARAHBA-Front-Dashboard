import { useCallback, useMemo, useState } from 'react';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PrestatairesTable } from 'src/sections/user/prestataires-table';
import { ExpertsTable } from 'src/sections/user/experts-table';
import { CustomersSearch } from 'src/sections/user/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import * as XLSX from 'xlsx';
import userServices from '../../core/services/userServices.service';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
function ExpertsPage({ experts }) {
  const exportDataToExcel = () => {
    const dataForExcel = experts.map((user) => [
      user.nom_prenom_expert,
      user.mail_expert,
      user.telephone_expert,
      user.domaine_expert,
      // Add other fields you want to export from the clients array
    ]);

    const headerForExcel = ['Nom', 'Email', 'Téléphone','Domaine'];
    const data = [headerForExcel, ...dataForExcel];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Experts');

    const fileName = 'experts.xlsx';
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
                return applyPagination(experts, page, rowsPerPage);
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
  const [nomExpert, setNomExpert] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [domaine, setDomaine] = useState('');


  const submitForm = (event) => {
    event.preventDefault(); 
    const newExpert = {
      nom_prenom_expert : nomExpert ,
      mail_expert : email ,
      telephone_expert : telephone ,
      domaine_expert :domaine ,
    };
    // const access_token = localStorage.getItem(localStorageKeys.token);
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5MjcwNDk3OCwiZXhwIjoxNjkzMzA5Nzc4fQ.KWCSfNwQ0QQushtWa2OK0icViCGXnkb4lBEPioEIc9U";
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
      .post("https://79.137.85.120:443/experts/add", newExpert)
      .then((response) => {
        console.log("Expert ajouté avec succès :", response.data); 
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la soumission du formulaire :', error); 
      });
  };

    if (!experts) {
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
                {/* Experts  */}
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Les Experts {experts.length}
                                </Typography>
                                      <Button color="inherit"startIcon={(  <SvgIcon fontSize="small"><ArrowDownOnSquareIcon /></SvgIcon> )} onClick={exportDataToExcel}  >
                                    Exporter 
                                    </Button>
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
                                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth sx={{display: 'flex',alignItems: 'center',justifyContent: 'center',}}>
                  <DialogTitle>Ajouter un expert</DialogTitle>
                  <form onSubmit={submitForm}>
                    <DialogContent>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Nom" fullWidth sx={{ width: '50%' }} variant="outlined" required
                            value={nomExpert }
                            onChange={(event) => setNomExpert(event.target.value)}
                          />
                          <TextField label="Email" fullWidth sx={{ width: '50%' }} variant="outlined" required type='email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />

                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Téléphone" fullWidth sx={{ width: '50%' }} required 
                            value={telephone}
                            onChange={(event) => setTelephone(event.target.value)}
                          />
                          <TextField label="Domaine " fullWidth sx={{ width: '50%' }} required 
                            value={domaine}
                            onChange={(event) => setDomaine(event.target.value)}
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
                        <CustomersSearch />
                        <ExpertsTable
                            count={experts.length}
                            items={experts}
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
        const experts = await userServices.getAllExpert();
        return {
            props: {
                experts
            },
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            props: {
                experts: []
            },
        };
    }
}


export default ExpertsPage;

ExpertsPage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

