/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useMemo, useState } from 'react';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/user/customers-table';
import { CustomersSearch } from 'src/sections/user/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import EditIcon from '@mui/icons-material/Edit';
import userServices from '../../core/services/userServices.service';
import React, {useEffect} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import api from 'src/core/services/helpers/api-get';

const UsersPage = ()=> {

  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); 
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [openDialog, setOpenDialog] = React.useState(false);
  const [nomUtilisateur, setNomUtilisateur] = useState('');
  const [prenomUtilisateur, setPrenomUtilisateur] = useState('');
  const [dateNaissance, setDateNaissance] = useState('1992-02-17');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [pays, setPays] = useState('Tunis');
  const [ville, setVille] = useState('');
  const [adresse, setAdresse] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [count, setCount] = useState(0);
  


  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await api.get('https://79.137.85.120:443/users/');
        setClients(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getClients();
  }, []);

 // exporter la liste des clients :
  const exportDataToExcel = () => {
    const dataForExcel = clients.map((client) => [
      client.nom_utilisateur,
      client.prenom_utilisateur,
      client.email,
      client.adresse_user,
      client.tel_utilisateur,
    ]);

    const headerForExcel = ['Nom','Prénom', 'Email', 'Adresse','Téléphone'];
    const data = [headerForExcel, ...dataForExcel];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');

    const fileName = 'clients.xlsx';
    XLSX.writeFile(workbook, fileName);
  };

  
  

  // chercher des clients :
  const handleChange = async (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);

    try {
      const response = await axios.post('https://79.137.85.120:443/users/suser', {
        search_term: newValue, // Sending the search term to the backend
      });
      console.log('Response:', response.data);
      setUsersList(response.data);
      setCount(Math.ceil(response.data.length / 9));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }; 


  // l'ajout d'un client : 
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const newUser = {
      nom_utilisateur : nomUtilisateur,
      prenom_utilisateur: prenomUtilisateur,
      date_naissance: dateNaissance,
      email: email,
      tel_utilisateur: telephone,
      role : 'User',
      pays_user: pays,
      ville_user: ville,
      adresse_user: adresse,
      motdepasse: motdepasse,
      argent_gagner : 0,
    };
    console.log(newUser);
    const access_token = JSON.parse(localStorage.getItem('token')); 
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    axios
      .post("https://79.137.85.120:443/users/register", newUser)
      .then((response) => {
        console.log("Utilisateur ajouté avec succès :", response.data); 
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la soumission du formulaire :', error); 
      });
  };


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const useUsers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(clients, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };

  const useUserIds = (clients) => {
    return useMemo(
      () => {
        return clients.map((client) => client.id);
      },
      [clients]
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
  const users = useUsers(page, rowsPerPage);
  const usersIds = useUserIds(users);
  const usersSelection = useSelection(usersIds);
  const paginatedUsers = useUsers(page, rowsPerPage);
  
  if (!clients) {
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
                  Les Clients 
                  {/* {clients.length} */}
                </Typography>
      
                {/* </Stack> */}
              </Stack>
              <div>
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
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth sx={{ width: '800px' }}>
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
          </Stack>
        </Container>
      </Box>
    </>
  );
}



// export async function getStaticProps() {
//   try {
//     console.log("1");
//     const clients = await userServices.getAllUsers();
//     return {
//       props: {
//         clients
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return {
//       props: {
//         clients: []
//       },
//     };
//   }
// }


export default UsersPage;

UsersPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

