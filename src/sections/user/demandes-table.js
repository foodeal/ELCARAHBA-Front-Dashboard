import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useState } from 'react';
import { format } from 'date-fns';
import { Paper } from '@mui/material';
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
  Typography,
  Grid,
  TextField
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import Link from 'next/link';

export const DemandesTable = (props) => {
  
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onSelectAll,
    onSelectOne,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [page, setPage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedDemands = items.slice(startIndex, endIndex);
  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleCloseDialog = () =>{
    setIsDialogOpen(false);
  }
  const onRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); 
  };
  const handleOpenDialog =() => {
    setIsDialogOpen(true);
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
              {paginatedDemands.map((prestataire) => {
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(prestataire.id);
                          } else {
                            onDeselectOne?.(prestataire.id);
                          }
                        }}
                      />
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
                      <Link href={`/demandes_prestataires/${prestataire.id}`}>
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
                    <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                      Tous les détails
                    </Button>
                    <Dialog open={isDialogOpen} onClose={handleDialogClose}   slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                    <DialogTitle>Les détails de la demande de prestation : </DialogTitle>

                    <DialogContent>
                      <Paper elevation={3} style={{ padding: '20px' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Nom
                            </Typography>
                            <Typography>
                              {prestataire.nom_prestataire}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Prénom
                            </Typography>
                            <Typography>
                              {prestataire.prenom_prestataire}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Email
                            </Typography>
                            <Typography>
                              {prestataire.email_prestataire}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Télephone
                            </Typography>
                            <Typography>
                              {prestataire.tel_prestataire}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Raison sociale
                            </Typography>
                            <Typography>
                              {prestataire.raison_sociale}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Pays
                            </Typography>
                            <Typography>
                              {prestataire.pays_prestataire}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Ville
                            </Typography>
                            <Typography>
                              {prestataire.ville_prestataire}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Adresse
                            </Typography>
                            <Typography>
                              {prestataire.adresse_prestataire}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Service
                            </Typography>
                            <Typography>
                              {prestataire.service_prestataire}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Site Web
                            </Typography>
                            <Typography>
                              {prestataire.site_web}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Lien Facebook
                            </Typography>
                            <Typography>
                              {prestataire.lien_fb}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Lien Instagram:
                            </Typography>
                            <Typography>
                              {prestataire.lien_insta}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Registre Commerce
                            </Typography>
                            <Typography>
                              {prestataire.registre_commerce}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              CIN du gérant
                            </Typography>
                            <Typography>
                              {prestataire.cin_geron}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              Contrat condition
                            </Typography>
                            <Typography>
                              {prestataire.contrat_condition}
                            </Typography>
                          </Grid>
                       
                        </Grid>
                      </Paper>
</DialogContent>

              
                    <DialogActions>
                        <Button onClick={handleDialogClose}>fermer</Button>
                        <Button onClick={() => handleConfirm(demand.id)} color="error">Approuver</Button>
                    </DialogActions>
                    </Dialog>
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

DemandesTable.propTypes = {
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