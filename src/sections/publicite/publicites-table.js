/* eslint-disable react/jsx-max-props-per-line */
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
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
  Unstable_Grid2 as Grid,

} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';






export const PublicitesTable = (props) => {

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
    titre_pub : titre,
    client_pub : client,
    prix_pub : prix,
    duree_pub : duree,
    description_pub : description,
    image_pub : image,
  };
  const access_token = localStorage.getItem(localStorageKeys.token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  axios
    .post("https://79.137.85.120:443/publicites/" + id, updatedData)
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
  const [selectedItemId, setSelectedItemId] = useState();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  

  const handleDeleteIconClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = (pubId) => {
    // const access_token = localStorage.getItem(localStorageKeys.token);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5MjcwNDk3OCwiZXhwIjoxNjkzMzA5Nzc4fQ.KWCSfNwQ0QQushtWa2OK0icViCGXnkb4lBEPioEIc9Us";
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.delete(`https://79.137.85.120:443/users/${pubId}`)
      .then((response) => {
        console.log("Publicité supprimée avec succès :", response.data);
        const updatedPubs = publicites.filter((pub) => pub.id !== pubId);
        setPubs(updatedPubs);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la publicité :", error);
      });
  };
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedPubs = items.slice(startIndex, endIndex)
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
                      Titre
                    </TableCell>
                    <TableCell>
                      Client
                    </TableCell>
                    <TableCell>
                      Prix
                    </TableCell>
                    <TableCell>
                      Durée
                    </TableCell>
                    <TableCell>
                      Description
                    </TableCell>
                    <TableCell>
                      Image déscriptive
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {paginatedPubs.map((publicite) => {
                  
                    return (
                      <TableRow
                        hover
                        key={publicite.id}
                        selected={publicite.id === selectedItemId}
                      >
                        <TableCell>
                          <div>
                            <IconButton onClick={() => handleDeleteIconClick(user)} aria-label="delete" color="primary">
                              <DeleteIcon color="error" />
                            </IconButton>
                            <Dialog open={isDialogOpen} onClose={handleDialogClose} slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                              <DialogTitle>Confirmation</DialogTitle>
                              <DialogContent>Êtes-vous sûr de vouloir supprimer la publicité ?</DialogContent>
                              <DialogActions>
                                <Button onClick={handleDialogClose}>Annuler</Button>
                                <Button onClick={() => handleConfirmDelete(publicite.id)} color="error">Supprimer</Button>
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
                            <Dialog open = {isEditDialogOpen} onClose = {handleDialogClose} slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                            <DialogTitle>Modifications de la publicité : </DialogTitle>
                            <DialogContent>
                            <form onSubmit={(event) => submitForm(event, publicite.id)}>
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
                                    helperText="Entrer le titre de la publicité"
                                    label="Titre"
                                    name="titre"
                                    onChange={(event) => setTitre(event.target.value)}
                                    required
                                     value={publicite.titre_pub} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Client"
                                    name="client"
                                    onChange={(event) => setDClient(event.target.value)}
                                    required
                                    value={publicite.client_pub} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Prix"
                                    name="prix_pub"
                                    onChange={(event) => setPrix(event.target.value)}
                                    required
                                    value={publicite.prix_pub} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Durée"
                                    name="duree_pub"
                                    onChange={(event) => setDuree(event.target.value)}
                                    type="number"
                                    required
                                    value={publicite.duree_pub} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description_pub"
                                    onChange={(event) => setDescription(event.target.value)}
                                    required
                                    value={publicite.description_pub} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Image"
                                    name="Image_pub"
                                    onChange={(event) => setImage(event.target.value)}
                                    required
                                    value={publicite.image_pub} />
                            </Grid>
                            </Grid>
                    <Divider />
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
                        </TableCell>
                        <TableCell>
                          <Link href={`/publicites/${publicite.id}`}>
                            {publicite.titre_pub} 
                          </Link>
                        </TableCell>
                        <TableCell>
                          {publicite.client_pub}
                        </TableCell>
                        <TableCell>
                          {publicite.prix_pub}
                        </TableCell>
                        <TableCell>
                          {publicite.duree_pub}
                        </TableCell>
                        <TableCell>
                          {publicite.description_pub}
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