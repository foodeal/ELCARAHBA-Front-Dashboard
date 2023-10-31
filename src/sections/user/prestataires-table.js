/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
import { getInitials } from 'src/utils/get-initials';
import Link from 'next/link';


export const PrestatairesTable = (props) => {
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

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const handleConfirmDelete = (userId) => {
    console.log(userX);
      const access_token = JSON.parse(localStorage.getItem('token'));
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      axios.delete(`https://79.137.85.120:443/prestataires/`+ userX)
        .then((response) => {
          console.log("Prestataire supprimé avec succès :", response.data);
          const updatedUsers = prestataires.filter((prestataire) => prestataire.id !== userId);
          setUsers(updatedUsers);
          setIsDialogOpen(false);
          refreshPage();
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du prestataire :", error);
        });
        
    };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsEditDialogOpen(false);
  };
  const handleDeleteIconClick = (userId) => {
    console.log(userId);
    setUserX(userId.id);
    setIsDialogOpen(true);

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
              {items.map((prestataire) => {
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
                        {/* <Typography variant="subtitle2">
                          {prestataire.nom_prestataire} {prestataire.prenom_prestataire}
                        </Typography> */}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {/* <Link href={`/prestataires/${prestataire.id}`}> */}
                      {prestataire.nom_prestataire} {prestataire.prenom_prestataire}
                      {/* </Link> */}
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

}