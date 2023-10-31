/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from 'prop-types';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { apiUrl } from 'src/core/services/helpers';
import Cookies from "universal-cookie";
const cookies = new Cookies();


export const CustomersTable = (props) => {
  const [userX, setUserX] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
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

  const token = cookies.get("TOKEN");

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
    onDeselectOne,
    // onPageChange = () => { },
    // onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const [isChecked, setIsChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);


  const handleCheckboxChange = (event) => {
    const itemId = event.target.value;
    setSelectedItemId(itemId);
    setIsChecked(itemId);
  };

  const handleDeleteIconClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };


// modifier un client : 
const submitForm = (event, userId) => {
  event.preventDefault(); // empecher le comportement par défaut du formulaire 
  const updatedData = {
    nom_utilisateur: nomPrenom,
    dateNaissance: dateNaissance,
    email: email,
    tel_utilisateur: telUtilisateur,
    role : 'User',
    adresse_user: adresseUser,
    ville_user: villeUser,
    argent_gagner : 0,
  }; // créer un objet contenant les nouvelles données du client 

  const access_token = JSON.parse(localStorage.getItem('token'));
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  axios.post("https://79.137.85.120:443/users/" + editingUser.id, updatedData)
    .then((response) => {
      console.log(response); 
    })
    .catch((error) => {
      console.error('Error occurred while submitting the form:', error); 
    });
};

// supprimer un client : 
  const handleConfirmDelete = (userId) => {
  console.log(userX);
    const access_token = JSON.parse(localStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    axios.delete(`https://79.137.85.120:443/users/`+ userX)
      .then((response) => {
        console.log("Utilisateur supprimé avec succès :", response.data);
        const updatedUsers = users.filter((user) => user.id !== userId); // filtrer la liste des clients en ignorant le client suuprimé
        setUsers(updatedUsers); // mettre à jour la liste des clients 
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      });
      setIsDialogOpen(false); // fermer la dialogue 
      refreshPage(); // refraicher la page 
  };

  const startIndex = page * rowsPerPage;  // une variable qui contient la valeur du 1er élément de la page
  const endIndex = startIndex + rowsPerPage; // une variable qui contient la valeur du dernier élément dans la page
  const paginatedUsers = items.slice(startIndex, endIndex) // prendre uniquement les éléments de la 1ere page 
  
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  /> */}
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
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                Date de création
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user) => {
                // const isSelected = selected.includes(user.id);
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
                        {/* <Checkbox
                          checked={user.id === selectedItemId}
                          value={user.id}
                          onChange={handleCheckboxChange}
                        />
                        {user.id === selectedItemId && (
                          <IconButton onClick={() => handleDeleteIconClick(user)}>
                            <DeleteIcon />
                          </IconButton>
                        )} */}
                        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
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
                      <IconButton onClick={() => handleEditIconClick(user)} aria-label="edit" color="primary" 
                  variant="contained"> 
                <EditIcon />
                    </IconButton> {/* le bouton pour ouvrir la dialogue de modification contenant toutes les données de l'utilisateur sous forme d'icone */}
                        <Dialog open = {isEditDialogOpen} onClose = {handleCloseEditDialog} slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                        <DialogTitle>Modifications de utilisateur : </DialogTitle>
                        <DialogContent>
                        <form onSubmit={(event) => submitForm(event, editingUser.id)}>
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
                                label="Nom"
                                name="nom_prenom"
                                onChange={(event) => setNomUtilisateur(event.target.value)}
                                required
                                value={editingUser?.nom_utilisateur}/>
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
                                value={editingUser?.date_naissance} />
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
                                value={editingUser?.email} />
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
                                value={editingUser?.tel_utilisateur} />
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
                                value={editingUser?.adresse_user} />
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
                                value={editingUser?.ville_user}
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
                <Divider />
                </form>
                </DialogContent>
                <DialogActions>
                            <Button onClick={handleDialogClose}>Annuler</Button>
                            <Button  variant="contained" color="primary" type="submit" >Enregistrer </Button>

                          </DialogActions> {/* les boutons  pour annuler ou confirmer l'action de modification  */}
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
                      {/* <Link href={`/users/${user.id}`}> */}
                        {user.nom_utilisateur} {user.prenom_utilisateur}
                      {/* </Link> */}
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
        </Box>
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
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};


