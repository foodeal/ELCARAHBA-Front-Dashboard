import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import {
  Table, TableHead, TableBody, TableRow, TableCell, Checkbox, TablePagination
} from '@mui/material';
import { getInitials } from 'src/utils/get-initials';
import Link from 'next/link';
import { useState } from 'react';
export const CarnetsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onSelectAll,
    onSelectOne,
    selected = []
  } = props;
  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const onRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 0 when changing rows per page
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedCarnets = items.slice(startIndex, endIndex);
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
                  Date Vidange
                </TableCell>
                <TableCell>
                  KLM Vidange
                </TableCell>
                <TableCell>
                  KLM Plaque
                </TableCell>
                <TableCell>
                  Date Batterie
                </TableCell>
                <TableCell>
                  Date Assurance
                </TableCell>
                <TableCell>
                  Date Visite
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCarnets.map((carnet) => {
                const isSelected = selected.includes(carnet.id);
                return (

                  <TableRow
                    hover
                    key={carnet.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(carnet.id);
                          } else {
                            onDeselectOne?.(carnet.id);
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
                        <Link href={`/carnets/${carnet.id}`}>
                          <Avatar src={carnet.user_id}>
                            {/* {getInitials(customer.id)} */}
                          </Avatar>
                        </Link>
                        <Typography variant="subtitle2">
                          {carnet.date_vidange}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {carnet.klm_vidange}
                    </TableCell>
                    <TableCell>
                      {carnet.klm_plaque}
                    </TableCell>
                    <TableCell>
                      {carnet.date_batterie}
                    </TableCell>
                    <TableCell>
                      {carnet.date_assurance}
                    </TableCell>
                    <TableCell>
                      {carnet.date_visite}
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

CarnetsTable.propTypes = {
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


