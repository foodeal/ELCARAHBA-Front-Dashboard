/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useMemo, useState ,useEffect} from 'react';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography} from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/user/customers-table';
import { CustomersSearch } from 'src/sections/user/customers-search';
import userServices from '../../core/services/userServices.service';
// import { CustomCard } from '../CustomCard';
import { Grid } from '@mui/material';
import * as XLSX from 'xlsx';
import React from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function UsersPage({ clients }) {
  const exportDataToExcel = () => {
    const dataForExcel = clients.map((client) => [
      client.nom_utilisateur,
      client.prenom_utilisateur,
      client.email,
      client.adresse_user,
      client.tel_utilisateur,
      // Add other fields you want to export from the clients array
    ]);

    const headerForExcel = ['Nom','Prénom', 'Email', 'Adresse','Téléphone'];
    const data = [headerForExcel, ...dataForExcel];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');

    const fileName = 'clients.xlsx';
    XLSX.writeFile(workbook, fileName);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); 
  const [searchResults, setSearchResults] = useState([]);
  
  const [filteredUsers, setFilteredUsers] = useState([]);
  const allUsers = [clients];
  const handleSearch = (searchQuery) => { 
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY5MDk3OTU3NCwiZXhwIjoxNjkxNTg0Mzc0fQ.ErBwfGXzkN7LgNvxlApzGm2tx_hwaHW9OXhf81e3-Ig";
    setLoading(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
      .get(`https://79.137.85.120:443/users?nom_like=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error occurred while searching:', error);
        setLoading(false);
      });
  };
  
  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const newUser = {
      nom_utilisateur: nomUtilisateur,
      prenom_utilisateur: prenomUtilisateur,
      dateNaissance: dateNaissance,
      email: email,
      tel_utilisateur: telephone,
      pays_user: pays,
      ville_user: ville,
      adresse_user: adresse,
      motdepasse: motdepasse,
      motdepasse: motdepasse,
    };
    
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY5MDk3OTU3NCwiZXhwIjoxNjkxNTg0Mzc0fQ.ErBwfGXzkN7LgNvxlApzGm2tx_hwaHW9OXhf81e3-Ig";
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
      .post("https://79.137.85.120:443/users/", newUser)
      .then((response) => {
        console.log("Utilisateur ajouté avec succès :", response.data); 
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la soumission du formulaire :', error); 
      });
  };
  

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
    const useUsers = (page, rowsPerPage) => {
      return useMemo(() => {
        // Calculate the offset and slice the clients array accordingly
        const offset = page * rowsPerPage;
        return clients.slice(offset, offset + rowsPerPage);
      }, [clients, page, rowsPerPage]);
    };
    

  const useUserIds = (clients) => {
    return useMemo(
      () => {
        return clients.map((client) => client.id);
      },
      [clients]
    );
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const users = useUsers(page, rowsPerPage);
  const usersIds = useUserIds(users);
  const usersSelection = useSelection(usersIds);
  const paginatedUsers = useUsers(page, rowsPerPage);

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        {/* Clients */}
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Les clients {clients.length}
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
                  <DialogTitle>Ajouter un client</DialogTitle>
                  <form onSubmit={handleSubmit}>
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
                          <TextField label="Date de naissance" fullWidth sx={{ width: '50%' }} required type= 'date'
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
            <div>
      <CustomersSearch users={users} onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <CustomersTable users={searchResults} />} 
    </div>
            <CustomersTable
              count={clients.length}
              items={clients}
              onDeselectAll={usersSelection.handleDeselectAll}
              onDeselectOne={usersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={usersSelection.handleSelectAll}
              onSelectOne={usersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={usersSelection.selected}
            />
            <Grid
              container
              direction={'row'}
              rowSpacing={2}
              columnSpacing={2}
              justifyContent='space-between'
            >
              {/* {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={`card-${user.id}`}>
              <CustomCard user={user} />
              </Grid>
))} */}

            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
    
  );
}

export async function getStaticProps() {
  try {
    const clients = await userServices.getAllUsers();
    return {
      props: {
        clients
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      props: {
        clients: []
      },
    };
  }
}


export default UsersPage;

UsersPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
