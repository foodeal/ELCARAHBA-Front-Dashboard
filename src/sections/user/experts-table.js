import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
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
import exp from 'constants';

  
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
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsEditDialogOpen(false);
  };
  const handleEditIconClick = (userId) =>
  {
    setIsDialogOpen(true);
  }


export const ExpertsTable = (props) => {
    
      
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => { },
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = []
    } = props;
    const [isChecked, setIsChecked] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);
    const handleEditIconClick = (userId) =>
    {}
    const handleConfirmDelete = (Id) => {
  
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY5MDM2MzI4OCwiZXhwIjoxNjkwOTY4MDg4fQ.mhwzL-pHZ6w32Kq04Rmz8dCQiVWVNRhQmoSrVPhqgyo";
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.delete(`https://79.137.85.120:443/Experts/${Id}`)
          .then((response) => {
            console.log("Expert supprimé avec succès :", response.data);
            const updatedUsers = experts.filter((expert) => expert.id !== Id);
            setUsers(updatedUsers);
          })
          .catch((error) => {
            console.error("Erreur lors de la suppression de l'expert :", error);
          });
          refreshPage();
      };
      const handleDialogClose = () => {
        setIsDialogOpen(false);
        setIsEditDialogOpen(false);
      };
      const handleDeleteIconClick = () => {
        setIsDialogOpen(true);
      };
      const handleChange = (event) => {
        const { name, value } = event.target;
        setExpert((prevExpert) => ({ ...prevExpert, [name]: value }));
      };
      const submitForm = (event, id) => {
        // event.preventDefault(); // Empêcher le rechargement de la page
        const updatedData = {
            nom_prenom_expert ,
            mail_expert ,
            telephone_expert,
            domaine_expert,
        };
        const access_token = localStorage.getItem(localStorageKeys.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        axios
          .post("https://79.137.85.120:443/experts/" + id, updatedData)
          .then((response) => {
            console.log(response); 
          })
          .catch((error) => {
            console.error('Error occurred while submitting the form:', error); 
          });
      };
    
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
                                    Téléphone
                                </TableCell>
                                <TableCell>
                                    Domaine
                                </TableCell>
                                <TableCell>
                                    Date de création
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((expert) => {
                                const isSelected = selected.includes(expert.id);
                                return (
                                    <TableRow
                                        hover
                                        key={expert.id}
                                        selected={isSelected}
                                    >
                                <TableCell>
                      <div>
                        <IconButton onClick={() => handleDeleteIconClick(expert)} aria-label="delete" color="primary">
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
                        <Dialog open={isEditDialogOpen} onClose={handleDialogClose}slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                            <DialogTitle>Modification de l'expert : </DialogTitle>
                            <DialogContent>
                                <form onSubmit={submitForm(expert.id)}>
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
                                helperText="Entrer le nom de l'expert"
                                label="Nom"
                                name="nom_prenom_expert"
                                onChange={handleChange}
                                required
                                value={expert.nom_prenom_expert} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Domaine de l'expert"
                                name="domaine_expert"
                                onChange={handleChange}
                                required
                                value={expert.domaine_expert} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                name="mail_expert"
                                onChange={handleChange}
                                required
                                value={expert.mail_expert} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                                fullWidth
                                label="Numéro de téléphone"
                                name="telephone_expert"
                                onChange={handleChange}
                                type="number"
                                value={expert.telephone_expert} />
                        </Grid>
                    </Grid>
                    </form> 

                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleDialogClose}>Annuler</Button>
                        <Button onClick={() => submitForm(expert.id)} color="error">Modifier</Button>
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
                                                <Avatar src={expert.avatar}>
                                                    {getInitials(expert.nom_prenom_expert)}
                                                </Avatar>
                                                <Typography variant="subtitle2">
                                                    {expert.nom_prenom_expert}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/experts/${expert.id}`}>
                                                {expert.nom_prenom_expert}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {expert.mail_expert}
                                        </TableCell>
                                        <TableCell>
                                            {expert.telephone_expert}
                                        </TableCell>
                                        <TableCell>
                                            {expert.domaine_expert}
                                        </TableCell>
                                        <TableCell>
                                            {expert.createdAt}
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

ExpertsTable.propTypes = {
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