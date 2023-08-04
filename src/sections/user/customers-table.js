import PropTypes from 'prop-types';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomCard from 'src/pages/users/customcard';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Unstable_Grid2 as Grid,

} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { apiUrl } from 'src/core/services/helpers';


export const CustomersTable = (props) => {
  const [userEditingState, setUserEditingState] = useState({});

  const handleEditIconClick = (user) => {
    setIsEditDialogOpen(true);
    // Set the editing state for the specific user
    setUserEditingState({
      ...userEditingState,
      [user.id]: {
        nomPrenom: user.nom_utilisateur,
        dateNaissance: user.dateNaissance,
        email: user.email,
        telUtilisateur: user.tel_utilisateur,
        adresseUser: user.adresse_user,
        villeUser: user.ville_user,
      },
    });
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setUserEditingState({});
  };
  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const onRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };
  
  const refreshPage = () => {
    window.location.reload();
  };

  const states = [
    {
        value: 'Ariana',
        label: 'Ariana'
    },
    {
        value: 'Béja',
        label: 'Béja'
    },
    {
        value: 'Ben Arous',
        label: 'Ben Arous'
    },
    {
        value: 'Bizerte',
        label: 'Bizerte'
    },
    {
        value: 'Gabès',
        label: 'Gabès'
    },
    {
        value: 'Gafsa',
        label: 'Gafsa'
    },
    {
        value: 'Jendouba',
        label: 'Jendouba'
    },
    {
        value: 'Kairouan',
        label: 'Kairouan'
    },
    {
        value: 'Kasserine',
        label: 'Kasserine'
    },
    {
        value: 'Kébili',
        label: 'Kébili'
    },
    {
        value: 'Le Kef',
        label: 'Le Kef'
    },
    {
        value: 'Mahdia',
        label: 'Mahdia'
    },
    {
        value: 'La Manouba',
        label: 'La Manouba'
    },
    {
        value: 'Médenine',
        label: 'Médenine'
    },
    {
        value: 'Monastir',
        label: 'Monastir'
    },
    {
        value: 'Nabeul',
        label: 'Nabeul'
    },
    {
        value: 'Sfax',
        label: 'Sfax'
    },
    {
        value: 'Sidi Bouzid',
        label: 'Sidi Bouzid'
    },
    {
        value: 'Siliana',
        label: 'Siliana'
    },
    {
        value: 'Sousse',
        label: 'Sousse'
    },
    {
        value: 'Tataouine',
        label: 'Tataouine'
    },
    {
        value: 'Tozeur',
        label: 'Tozeur'
    },
    {
        value: 'Tunis',
        label: 'Tunis'
    },
    {
        value: 'Zaghouan',
        label: 'Zaghouan'

    }
];
  


  const {
    count = 0,
    items = [],
    onDeselectAll,
    onSelectAll,
    selected = [],
  } = props;

const handleDialogClose = () => {
  setIsEditDialogOpen(false);
  setIsDialogOpen(false);
};

const submitForm = (event, id) => {
  event.preventDefault(); // Empêcher le rechargement de la page
  const updatedData = {
    nom_utilisateur: nomPrenom,
    dateNaissance: dateNaissance,
    email: email,
    tel_utilisateur: telUtilisateur,
    adresse_user: adresseUser,
    ville_user: villeUser,
  };
  const access_token = localStorage.getItem(localStorageKeys.token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  axios
    .post("https://79.137.85.120:443/users/" + id, updatedData)
    .then((response) => {
      console.log(response); 
    })
    .catch((error) => {
      console.error('Error occurred while submitting the form:', error); 
    });
};




  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  

  const handleDeleteIconClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = (userId) => {
  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY5MDk3OTU3NCwiZXhwIjoxNjkxNTg0Mzc0fQ.ErBwfGXzkN7LgNvxlApzGm2tx_hwaHW9OXhf81e3-Ig";
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.delete(`https://79.137.85.120:443/users/${userId}`)
      .then((response) => {
        console.log("Utilisateur supprimé avec succès :", response.data);
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      });
  };
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = items.slice(startIndex, endIndex)
  return (
    <Card>
        <Box sx={{ minWidth: 800 }}>
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>

                </TableCell>
                <TableCell>
                  Avatar
                </TableCell>
                <TableCell>
                  Nom complet
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Adresse
                </TableCell>
                <TableCell>
                  Téléphone
                </TableCell>
                Date de création
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {paginatedUsers.map((user) => {
               const editingState = userEditingState[user.id] || {};
                return (
                  <TableRow
                    hover
                    key={user.id}
                    selected={user.id === selectedItemId}
                  >
                    <TableCell>
                      <div>
                        <IconButton onClick={() => handleDeleteIconClick(user)} aria-label="delete" color="primary">
                          <DeleteIcon color="error" />
                        </IconButton>
                        <Dialog open={isDialogOpen} onClose={handleDialogClose}   slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                          <DialogTitle>Confirmation</DialogTitle>
                          <DialogContent>Êtes-vous sûr de vouloir supprimer ?</DialogContent>
                          <DialogActions>
                            <Button onClick={handleDialogClose}>Annuler</Button>
                            <Button onClick={() => handleConfirmDelete(user.id)} color="error">Supprimer</Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                      <IconButton onClick={() => setIsEditDialogOpen(true)} aria-label="edit" color="primary" 
                  variant="contained"> 
                <EditIcon />
                    </IconButton>
                        <Dialog open = {isEditDialogOpen} onClose = {handleCloseEditDialog} slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                        <DialogTitle>Modifications de l'utilisateur : </DialogTitle>
                        <DialogContent>
                        <form onSubmit={(event) => submitForm(event, user.id)}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                helperText="Entrer le nom de l'utilisateur"
                                label="Nom"
                                name="nom_prenom"
                                onChange={(event) => setNomPrenom(event.target.value)}
                                required
                                 value={user.nom_utilisateur} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Date de naissance"
                                name="date_naissance"
                                onChange={(event) => setDateNaissance(event.target.value)}
                                required
                                value={user.dateNaissance} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                value={user.email} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Numéro de téléphone"
                                name="tel_utilisateur"
                                onChange={(event) => setTelUtilisateur(event.target.value)}
                                type="number"
                                required
                                value={user.tel_utilisateur} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Adresse"
                                name="adresse_user"
                                onChange={(event) => setAdresseUser(event.target.value)}
                                required
                                value={user.adresse_user} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Select State"
                                name="ville_user"
                                onChange={(event) => setVilleUser(event.target.value)}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={user.ville_user}
                            >
                              {states.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                              
                        </Grid>
                        </Grid>
                <Divider /></form>
                </DialogContent>
                <DialogActions>
                            <Button onClick={handleDialogClose}>Annuler</Button>
                            <Button  variant="contained" color="primary" type="submit" >Enregistrer </Button>

                          </DialogActions>
                     </Dialog>
                      </div>
                      </TableCell>

                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={user.avatar}>
                          {/* {getInitials(user.nom_utilisateur + user.prenom_utilisateur)} */}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {user.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Link href={`/users/${user.id}`}>
                        {user.nom_utilisateur} {user.prenom_utilisateur}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.adresse_user}, {user.ville_user}, {user.pays_user}
                    </TableCell>
                    <TableCell>
                      {user.tel_utilisateur}
                    </TableCell>
                    <TableCell>
                      {user.createdAt}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            </Table>
      </Scrollbar>
            <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
        </Box>
    </Card>
  );
}

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
};