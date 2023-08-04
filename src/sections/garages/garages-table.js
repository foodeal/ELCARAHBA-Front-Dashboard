import PropTypes from 'prop-types';
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
import { useState } from 'react';
export const GaragesTable = (props) => {
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
    const paginatedGarages = items.slice(startIndex, endIndex);
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
                                    Nom garage
                                </TableCell>
                                <TableCell>
                                    heures_travail
                                </TableCell>
                                <TableCell>
                                    jours_travail
                                </TableCell>
                                <TableCell>
                                    adresse_garage
                                </TableCell>
                                <TableCell>
                                    contact_garage
                                </TableCell>
                                <TableCell>
                                    type_garage
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedGarages.map((garage) => {
                                const isSelected = selected.includes(garage.id);
                                return (

                                    <TableRow
                                        hover
                                        key={garage.id}
                                        selected={isSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        onSelectOne?.(garage.id);
                                                    } else {
                                                        onDeselectOne?.(garage.id);
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/garages/${garage.id}`}>
                                                {garage.nom_garage}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {garage.heures_travail}
                                        </TableCell>
                                        <TableCell>
                                            {garage.jours_travail}
                                        </TableCell>
                                        <TableCell>
                                            {garage.adresse_garage}
                                        </TableCell>
                                        <TableCell>
                                            {garage.contact_garage}
                                        </TableCell>
                                        <TableCell>
                                            {garage.type_garage}
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

GaragesTable.propTypes = {
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


