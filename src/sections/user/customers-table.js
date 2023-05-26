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


export const CustomersTable = (props) => {
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

  const handleConfirmDelete = (userId) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODQ2OTEyOTQsImV4cCI6MTY4NTI5NjA5NH0.hjZEv7-KdEpN2QTC8uYH0xpcJvcF1mCy-ssZfOqL3lE";
    fetch(apiUrl + "/users/" + userId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then((message) => console.log(message)).catch((error) => console.log(error));
    setIsDialogOpen(false);
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
                  Signed Up
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
                    {/* if checkbox is selected add a delete icon to delete the user */}

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


