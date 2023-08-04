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
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
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
  const exportDataToExcel = () => {
    const dataForExcel = clients.map((demande) => [
    
    ]);

    const headerForExcel = ['Nom','Prénom', 'Email', 'Adresse','Téléphone'];
    const data = [headerForExcel, ...dataForExcel];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');

    const fileName = 'clients.xlsx';
    XLSX.writeFile(workbook, fileName);
  };
    const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
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
    
      const [nomUtilisateur, setNomUtilisateur] = useState('');
      const [prenomUtilisateur, setPrenomUtilisateur] = useState('');
      const [dateNaissance, setDateNaissance] = useState('1992-02-17');
      const [email, setEmail] = useState('');
      const [telephone, setTelephone] = useState('');
      const [pays, setPays] = useState('Tunis');
      const [ville, setVille] = useState('');
      const [adresse, setAdresse] = useState('');
      const [motdepasse, setMotdepasse] = useState('');
    
      const user = {
        "nom_prenom": nomUtilisateur + prenomUtilisateur,
        "date_naissance": dateNaissance,
        "email": email,
        "tel_utilisateur": telephone,
        "pays_user": pays,
        "ville_user": ville,
        "adresse_user": adresse,
        "motdepasse": motdepasse
      };
    
      const submitForm = (event) => {
        event.preventDefault();
        fetch("https://79.137.85.120:443/users/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
    
        // Reset the form state
        setNomUtilisateur('');
        setPrenomUtilisateur('');
        setDateNaissance('1992-02-17');
        setEmail('');
        setTelephone('');
        setPays('Tunis');
        setVille('');
        setAdresse('');
        setMotdepasse('');
      }

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
                                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center', }}>
                  <DialogTitle>Ajouter une demande</DialogTitle>
                  <form onSubmit={submitForm}>
                    <DialogContent>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Nom" fullWidth sx={{ width: '50%' }} variant="outlined" required
                            value={nomUtilisateur}
                            onChange={(event) => setNomUtilisateur(event.target.value)}
                          />
                          <TextField label="Prénom" fullWidth sx={{ width: '50%' }} variant="outlined" required
                            value={prenomUtilisateur}
                            onChange={(event) => setPrenomUtilisateur(event.target.value)}
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