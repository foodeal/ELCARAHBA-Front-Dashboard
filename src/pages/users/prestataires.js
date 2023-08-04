import { useCallback, useMemo, useState } from 'react';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PrestatairesTable } from 'src/sections/user/prestataires-table';
import { CustomersSearch } from 'src/sections/user/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import * as XLSX from 'xlsx';
import userServices from '../../core/services/userServices.service';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function PrestatairesPage({ prestataires }) {
  const exportDataToExcel = () => {
  const dataForExcel = prestataires.map((prestataire) => [
    prestataire.nom_prestataire,
    prestataire.prenom_prestataire,
    prestataire.email_prestataire,
    prestataire.tel_prestataire,
  ]);

  const headerForExcel = ['Nom', 'Prénom', 'Email', 'Téléphone'];
  const data = [headerForExcel, ...dataForExcel];
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Prestataires');

  const fileName = 'prestataires.xlsx';
  XLSX.writeFile(workbook, fileName);
}


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
        return applyPagination(prestataires, page, rowsPerPage);
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
  const [nomPrestataire, setNomPrestataire] = useState('');
  const [prenomPrestataire, setPrenomPrestataire] = useState('');
  const [dateNaissance, setDateNaissance] = useState('1992-02-17');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [pays, setPays] = useState('Tunis');
  const [ville, setVille] = useState('');
  const [adresse, setAdresse] = useState('');
  const [motdepasse, setMotdepasse] = useState('');

  const prestataire= {
    "nom_prenom": nomPrestataire + prenomPrestataire,
    "date_naissance": dateNaissance,
    "email": email,
    "tel_utilisateur": telephone,
    "pays_user": pays,
    "ville_user": ville,
    "adresse_user": adresse,
    "motdepasse": motdepasse
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const newPrest = {
      nom_prenom: nomPrestataire,
      prenom_prestataire: prenomPrestataire,
      dateNaissance: dateNaissance,
      email: email,
      tel_prestataire: telephone,
      pays_user: pays,
      ville_user: ville,
      adresse_user: adresse,
      mot_de_passe: motdepasse,
    };

    const access_token = localStorage.getItem(localStorageKeys.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    axios
      .post("https://79.137.85.120:443prestataires/", newPrest)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error occurred while submitting the form:', error);
      });
  };



  if (!prestataires) {
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
        {/* Prestataires  */}
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Les Prestataires {prestataires.length}
                </Typography>
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
                  <DialogTitle>Ajouter un prestataire</DialogTitle>
                  <form onSubmit={handleSubmit}>
                    <DialogContent>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Nom" fullWidth sx={{ width: '50%' }} variant="outlined" required
                            value={nomPrestataire}
                            onChange={(event) => setNomPrestataire(event.target.value)}
                          />
                          <TextField label="Prénom" fullWidth sx={{ width: '50%' }} variant="outlined" required
                            value={prenomPrestataire}
                            onChange={(event) => setPrenomPrestataire(event.target.value)}
                          />

                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Date de naissance" fullWidth sx={{ width: '50%' }} required type='text'
                            value={dateNaissance}
                            onChange={(event) => setDateNaissance(event.target.value)}
                          />
                          <TextField label="Email" fullWidth sx={{ width: '50%' }} required type='email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />

                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Téléphone" fullWidth sx={{ width: '50%' }} required type='number'
                            value={telephone}
                            onChange={(event) => setTelephone(event.target.value)}
                          />
                          <TextField label="Pays" fullWidth sx={{ width: '50%' }} required
                            defaultValue="Tunis"
                            value={pays}
                            onChange={(event) => setPays(event.target.value)}
                          />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Ville" fullWidth sx={{ width: '50%' }} required
                            value={ville}
                            onChange={(event) => setVille(event.target.value)}
                          />
                          <TextField label="Adresse" fullWidth sx={{ width: '50%' }} required
                            value={adresse}
                            onChange={(event) => setAdresse(event.target.value)}
                          />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Mot de passe" fullWidth sx={{ width: '50%' }} required type='password'
                            value={motdepasse}
                            onChange={(event) => setMotdepasse(event.target.value)}
                          />
                          <TextField label="Confirmer mot de passe" fullWidth sx={{ width: '50%' }} required type='password' />
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
            <PrestatairesTable
              count={prestataires.length}
              items={prestataires}
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
    var prestataires = await userServices.getAllPrestataires();
    return {
      props: {
        prestataires
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      props: {
        prestataires: []
      },
    };
  }
}


export default PrestatairesPage;

PrestatairesPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

