
import { useCallback, useMemo, useState ,useEffect} from 'react';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Grid } from '@mui/material';
import * as XLSX from 'xlsx';
import React from 'react';
import { useSelection } from 'src/hooks/use-selection';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { PublicitesTable } from 'src/sections/publicite/publicites-table';
import { Table } from '@mui/material';
import  '../core/services/publicites.service';
import { PubsSearch } from 'src/sections/publicite/pubs-search';
function PublicitesPage({publicites})
{
  const [imageFile, setImageFile] = useState();

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
  };



  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); 
  const [searchResults, setSearchResults] = useState([]);
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
    const usePubs = (page, rowsPerPage) => {
      return useMemo(() => {
        const offset = page * rowsPerPage;
        return publicites.slice(offset, offset + rowsPerPage);
      }, [publicites, page, rowsPerPage]);
    };
    

  const usePubIds = (publicites) => {
    return useMemo(
      () => {
        return publicites.map((publicite) => publicite.id);
      },
      [publicites]
    );
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const pubs = usePubs(page, rowsPerPage);
  const pubsIds = usePubIds(publicites);
  const pubsSelection = useSelection(pubsIds);
  const paginatedPubs = usePubs(page, rowsPerPage);

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



  const [titre, setTitre] = useState('');
  const [duree, setDuree] = useState('');
  const [prix, setPrix] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const newPub = {
      titre_pub : titre,
      client_pub : client,
      prix_pub : prix,
      duree_pub : duree,
      description_pub : description,
    };
    
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY5MDM2MzI4OCwiZXhwIjoxNjkwOTY4MDg4fQ.mhwzL-pHZ6w32Kq04Rmz8dCQiVWVNRhQmoSrVPhqgyo";
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
      .post("https://79.137.85.120:443/users/", newPub)
      .then((response) => {
        console.log("Publicité ajouté avec succès :", response.data); 
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
    const exportDataToExcel = () => {
        const dataForExcel = publicites.map((pub) => [
          pub.titre_pub,
          pub.client_pub,
          pub.prix_pub,
          pub.duree_pub,
          pub.description_pub,
        ]);
    
        const headerForExcel = ['Titre','Client', 'Prix', 'Durée','Déscription'];
        const data = [headerForExcel, ...dataForExcel];
    
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Publicités');
    
        const fileName = 'publicités.xlsx';
        XLSX.writeFile(workbook, fileName);
      };
    return (
        <>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8
            }}
          >
            {/* Publicites */}
            <Container maxWidth="xl">
              <Stack spacing={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      Les publicités {publicites.length}
                    </Typography>
                          <Button
            color="inherit"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowDownOnSquareIcon />
              </SvgIcon>
            )}
            onClick={exportDataToExcel} // Attach the event handler here
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
                      <DialogTitle>Ajouter une publicité</DialogTitle>
                      <form onSubmit={handleSubmit}>
                        <DialogContent>
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={2}>
                              <TextField label="Titre" fullWidth sx={{ width: '50%' }} variant="outlined" required
                                value={titre}
                                onChange={(event) => setTitre(event.target.value)}
                              />
                              <TextField label="Client" fullWidth sx={{ width: '50%' }} variant="outlined" required
                                value={client}
                                onChange={(event) => setClient(event.target.value)}
                              />
    
                            </Stack>
                            <Stack direction="row" spacing={2}>
                              <TextField label="Prix" fullWidth sx={{ width: '50%' }} variant="outlined" required type='text'
                                value={prix}
                                onChange={(event) => setPrix(event.target.value)}
                              />
                              <TextField label="Durée" fullWidth sx={{ width: '50%' }} variant="outlined" required type='email'
                                value={duree}
                                onChange={(event) => setDuree(event.target.value)}
                              />
    
                            </Stack>
                              <Stack direction="column" spacing={2}>
                          <TextField label="Description" fullWidth value={description} onChange={(event) => setDescription(event.target.value)} />
                          <input accept="image/*" style={{ display: 'none' }} id="image-upload" type="file" onChange={handleImageUpload} />
                          <label htmlFor="image-upload">
                            <Button variant="contained" color="primary" component="span">
                              Télécharger une image
                            </Button>
                          </label>
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
                {/* <div>
          <PubSearch publicites={allPubs} onSearch={handleSearch} />
          {filteredPubs.map((publicite) => (
            <div key={publicite.id}>{publicite.titre}</div>
          ))}
        </div> */}
                <Table
                  count={publicites.length}
                  items={publicites}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                />
                <Grid
                  container
                  direction={'row'}
                  rowSpacing={2}
                  columnSpacing={2}
                  justifyContent='space-between'
                >
    
                </Grid>
                <div>
      <PubsSearch pubs={pubs} onSearch={handleSearch} />
      {/* {loading ? <p>Loading...</p> : <PublicitesTable pubs={searchResults} />}  */}
    </div>
            <PublicitesTable
              count={pubs.length}
              items={pubs}
              onDeselectAll={pubsSelection.handleDeselectAll}
              onDeselectOne={pubsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={pubsSelection.handleSelectAll}
              onSelectOne={pubsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={pubsSelection.selected}
            />
            <Grid
              container
              direction={'row'}
              rowSpacing={2}
              columnSpacing={2}
              justifyContent='space-between'
            >

            </Grid>
              </Stack>
            </Container>
          </Box>
        </>
        
      );
}
export default PublicitesPage;
// export async function getStaticProps() {
//     try {
//       const publicites = await userServices.getAllUsers();
//       return {
//         props: {
//           publicites
//         },
//       };
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       return {
//         props: {
//           publicites: []
//         },
//       };
//     }
//   }
PublicitesPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);