/* eslint-disable react/jsx-max-props-per-line */
import Head from 'next/head';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import * as XLSX from 'xlsx';
import api from 'src/core/services/helpers/api-get';

function PrestatairesWaitingForApprovalPage() {

  const [demandes, setDemandes] = useState([]);
  useEffect(() => {
    const getDemandes = async () => {
      try {
        const response = await api.get('https://79.137.85.120:443/prestataire_dmd/');
        setDemandes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDemandes();
  }, []);



  const exportDataToExcel = () => {
    const dataForExcel = demandes.map((demande) => [
      demande.nom_prenom,
    
    ]);

    const headerForExcel = ['Nom','Prénom', 'Email', 'Adresse','Téléphone'];
    const data = [headerForExcel, ...dataForExcel];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Demandes');

    const fileName = 'demandesPrestataires.xlsx';
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
    
      const [nomPrestataire, setNomPrestataire] = useState('');
      const [prenomPrestataire, setPrenomPrestataire ]= useState('');
      const [dateNaissance, setDateNaissance] = useState('1992-02-17');
      const [email, setEmail] = useState('');
      const [telephone, setTelephone] = useState('');
      const [pays, setPays] = useState('Tunis');
      const [ville, setVille] = useState('');
      const [adresse, setAdresse] = useState('');
      const [motdepasse, setMotdepasse] = useState('');
      const [lienFB, setLienFB] = useState('');
      const [lienInsta, setLienInsta] = useState('');
      const [contratCondition, setContratCondition] = useState('');
      const [CinGeron, setCINGerant] = useState('');
      const [siteWeb, setSiteWeb] = useState('');
      const [registreCommerce, setRegistreCommerce] = useState('');
      const [nomGarage, setNomGarage] = useState('');
      const [service,setService] = useState("");
      const [raisonSociale, setRaisonSociale] = useState('');
      const [descrip,setDescrip] = useState("");
      const [typeGarage,setTypeG] = useState("");
      const [contactGarage,setContactG] = useState("");
      const [adresseGarage,setAdresseG] = useState("");
      const [joursTravail,setJours] = useState("");
      const [heuresTravail,setHeures] = useState("");

    
      const submitForm = (event) => {
        console.log(newDmd);
        event.preventDefault(); 
        const newDmd = {
          nom_prestataire : nomPrestataire,
          prenom_prestataire: prenomPrestataire,
          email_prestataire: email ,
          tel_prestataire: telephone ,
          raison_sociale: raisonSociale,
          role: 'Prestataire',
          pays_prestataire : pays,
          ville_prestataire: ville,
          adresse_prestataire: adresse,
          service_prestataire: service ,
          site_web: siteWeb,
          lien_fb: lienFB,
          lien_insta: lienInsta,
          registre_commerce: registreCommerce,
          cin_gerant: CinGeron,
          contrat_condition: contratCondition,
          description : descrip,
          motdepasse: motdepasse,
          nom_garage : nomGarage,
          heures_travail: heuresTravail,
          jours_travail: joursTravail,
          adresse_garage: adresseGarage ,
          contact_garage: contactGarage ,
          type_garage: typeGarage ,
        };
    
        const token = JSON.parse(localStorage.getItem('token'));
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5MjcwNDk3OCwiZXhwIjoxNjkzMzA5Nzc4fQ.KWCSfNwQ0QQushtWa2OK0icViCGXnkb4lBEPioEIc9U";
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios
          .post("https://79.137.85.120:443/prestataire_dmd/register", newDmd)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error('Error occurred while submitting the form:', error);
          });
      };

    if (demandes == []) {
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
                                    Les Demandes En Attentes 
                                    {/* {demandes.length} */}
                                </Typography>
                                    
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
                                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center', }}>
                  <DialogTitle>Ajouter Une Demande</DialogTitle>
                  <form onSubmit={submitForm}>
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
                          <TextField label="Raison sociale" fullWidth sx={{ width: '50%' }} required
                            value={raisonSociale}
                            onChange={(event) => setRaisonSociale(event.target.value)}
                          />
                          <TextField label="Site web" fullWidth sx={{ width: '50%' }} required
                            value={siteWeb}
                            onChange={(event) => setSiteWeb(event.target.value)}
                          />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Lien Facebook" fullWidth sx={{ width: '50%' }} required
                            value={lienFB}
                            onChange={(event) => setLienFB(event.target.value)}
                          />
                          <TextField label="Lien Instagram" fullWidth sx={{ width: '50%' }} required
                            value={lienInsta}
                            onChange={(event) => setLienInsta(event.target.value)}
                          />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Registre commerce" fullWidth sx={{ width: '50%' }} required
                            value={registreCommerce}
                            onChange={(event) => setRegistreCommerce(event.target.value)}
                          />
                          <TextField label="CIN du gérant" fullWidth sx={{ width: '50%' }} required
                            value={CinGeron}
                            onChange={(event) => setCINGerant(event.target.value)}
                          />
                        </Stack>
                          <Stack direction="row" spacing={2}>
                          <TextField label="Nom garage" fullWidth sx={{ width: '50%' }} required
                            value={nomGarage}
                            onChange={(event) => setNomGarage(event.target.value)}
                          />
                          <TextField label="Contact garage" fullWidth sx={{ width: '50%' }} required
                            value={contactGarage}
                            onChange={(event) => setContactG(event.target.value)}
                          />
                          </Stack>
                          <Stack direction="row" spacing={2}>
                          <TextField label="Type garage" fullWidth sx={{ width: '50%' }} required
                            value={typeGarage}
                            onChange={(event) => setTypeG(event.target.value)}
                          />
                          <TextField label="Adresse garage " fullWidth sx={{ width: '50%' }} required
                            value={adresseGarage}
                            onChange={(event) => setAdresseG(event.target.value)}
                          />
                          </Stack>
                          <Stack direction="row" spacing={2}>
                          <TextField label="Jours de travail" fullWidth sx={{ width: '50%' }} required
                            value={joursTravail}
                            onChange={(event) => setJours(event.target.value)}
                          />
                          <TextField label="Heures de travail" fullWidth sx={{ width: '50%' }} required
                            value={heuresTravail}
                            onChange={(event) => setHeures(event.target.value)}
                          />
                          </Stack>
                        <Stack direction="row" spacing={2}>
                          <TextField label="Service" fullWidth sx={{ width: '50%' }} required
                            value={service}
                            onChange={(event) => setService(event.target.value)}
                          />
                            <TextField label="Description " fullWidth sx={{ width: '50%' }} required
                            value={descrip}
                            onChange={(event) => setDescrip(event.target.value)}
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

// export async function getStaticProps() {
//     try {
//         const demandes = await userServicesService.getAllDemandes();
//         return {
//             props: {
//                 demandes
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching demandes:', error);
//         return {
//             props: {
//                 demandes: []
//             },
//         };
//     }
// }



PrestatairesWaitingForApprovalPage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default PrestatairesWaitingForApprovalPage;