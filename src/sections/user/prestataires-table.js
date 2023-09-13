import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useCallback } from 'react';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TextField,
  Unstable_Grid2 as Grid,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


export const PrestatairesTable = (props) => {
  const [editingUser, setEditingUser] = useState(null);
  const submitForm = (event, id) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    const updatedData = {
      nom_prestataire: nomPrenom,
      dateNaissance: dateNaissance,
      email: email,
      tel_prestataire: telephone,
      adresse_user: adresseUser,
      ville_user: villeUser,
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5MjcwNDk3OCwiZXhwIjoxNjkzMzA5Nzc4fQ.KWCSfNwQ0QQushtWa2OK0icViCGXnkb4lBEPioEIc9U";
    // const token = localStorage.getItem(localStorageKeys.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
      .post("https://79.137.85.120:443/prestataires/" + editingUser.id, updatedData)
      .then((response) => {
        console.log(response); 
      })
      .catch((error) => {
        console.error('Error occurred while submitting the form:', error); 
      });
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
  
  const refreshPage = () => {
    window.location.reload();
  };
  const [userX, setUserX] = useState({});
    const onPageChange = (event, newPage) => {
      setPage(newPage);
    };
    
    const onRowsPerPageChange = (event) => {
      const newRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(newRowsPerPage);
      setPage(0); // Reset page to 0 when changing rows per page
    };
    
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onSelectAll,
    selected = []
  } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const handleConfirmDelete = (userId) => {
    console.log(userX);
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5MjcwNDk3OCwiZXhwIjoxNjkzMzA5Nzc4fQ.KWCSfNwQ0QQushtWa2OK0icViCGXnkb4lBEPioEIc9U";
      // const access_token = localStorage.getItem(localStorageKeys.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.delete(`https://79.137.85.120:443/prestataires/`+ userX)
        .then((response) => {
          console.log("Prestataire supprimé avec succès :", response.data);
          const updatedUsers = prestataires.filter((prestataire) => prestataire.id !== userId);
          setUsers(updatedUsers);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du prestataire :", error);
        });
        setIsDialogOpen(false);
        refreshPage();
    };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsEditDialogOpen(false);
  };
  const handleDeleteIconClick = (userId) => {
    console.log(userId);
    setUserX(userId.id);
    setIsDialogOpen(true);

  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpert((prevExpert) => ({ ...prevExpert, [name]: value }));
  };
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = items.slice(startIndex, endIndex)

  const handleEditIconClick = (user) =>
  { 
   console.log("user : "+user);
   setEditingUser(user);
   console.log(editingUser);
   setIsEditDialogOpen(true);
 }
 
 
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
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
                <TableCell>
                  Date de création
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((prestataire) => {
                const isSelected = selected.includes(prestataire.id);
                const date = new Date(prestataire.createdAt);
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                const createdAt = date.toLocaleDateString('en-US', options);

                return (
                  <TableRow
                    hover
                    key={prestataire.id}
                    selected={isSelected}
                  >

                      <TableCell>
                      <div>
                        <IconButton onClick={() => handleDeleteIconClick(prestataire)} aria-label="delete" color="primary">
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
                        <Dialog open={isDialogOpen} onClose={handleDialogClose} slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                          <DialogTitle>Confirmation</DialogTitle>
                          <DialogContent>Êtes-vous sûr de vouloir supprimer ?</DialogContent>
                          <DialogActions>
                            <Button onClick={handleDialogClose}>Annuler</Button>
                            <Button onClick={() => handleConfirmDelete(prestataire.id)} color="error">Supprimer</Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                      <IconButton onClick={() => handleEditIconClick(prestataire)} aria-label="edit" color="primary" 
                  variant="contained"> 
                <EditIcon />
                </IconButton>
                        <Dialog  open={isEditDialogOpen} onClose={handleDialogClose} slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                        <DialogTitle>Modification du prestataire</DialogTitle>
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
                                helperText="Entrer le nom de prestataire"
                                label="Nom"
                                name="nom_prestataire"
                                onChange={handleChange}
                                required
                                value={editingUser?.nom_prestataire} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Prenom"
                                name="prenom_prestataire"
                                onChange={handleChange}
                                required
                                value={editingUser?.prenom_prestataire} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                name="email_prestataire"
                                onChange={handleChange}
                                required
                                value={editingUser?.email_prestataire} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Numéro de téléphone"
                                name="tel_prestataire"
                                onChange={handleChange}
                                type="number"
                                value={editingUser?.tel_prestataire} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Adresse"
                                name="adresse_prestataire"
                                onChange={handleChange}
                                required
                                value={editingUser?.adresse_prestataire} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Select State"
                                name="ville_prestataire"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={editingUser?.ville_prestataire}
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
                      </form>   
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
                        <Avatar src={prestataire.avatar}>
                          {getInitials(prestataire.nom_prestataire)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {prestataire.nom_prestataire} {prestataire.prenom_prestataire}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Link href={`/prestataires/${prestataire.id}`}>
                        {prestataire.nom_prestataire}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {prestataire.email_prestataire}
                    </TableCell>
                    <TableCell>
                      {prestataire.adresse_prestataire}, {prestataire.ville_prestataire}, {prestataire.pays_prestataire}
                    </TableCell>
                    <TableCell>
                      {prestataire.tel_prestataire}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Grid
        container
        direction="row"
        rowSpacing={2}
        columnSpacing={2}
        justifyContent="space-between"
      >
      </Grid>
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

PrestatairesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
};