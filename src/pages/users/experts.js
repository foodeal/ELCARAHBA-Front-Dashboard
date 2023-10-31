/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useEffect, useMemo, useState } from 'react';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PrestatairesTable } from 'src/sections/user/prestataires-table';
import { ExpertsTable } from 'src/sections/user/experts-table';
import { CustomersSearch } from 'src/sections/user/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import userServices from '../../core/services/userServices.service';
<<<<<<< Updated upstream

function ExpertsPage({ experts }) {
=======
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import api from 'src/core/services/helpers/api-get';
function ExpertsPage() {
  const exportDataToExcel = () => {
    const dataForExcel = experts.map((user) => [
      user.nom_prenom_expert,
      user.mail_expert,
      user.telephone_expert,
      user.domaine_expert,
      // Add other fields you want to export from the clients array
    ]);

    const headerForExcel = ['Nom', 'Email', 'Téléphone','Domaine'];
    const data = [headerForExcel, ...dataForExcel];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Experts');

    const fileName = 'experts.xlsx';
    XLSX.writeFile(workbook, fileName);
  };
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const [experts, setExperts] = useState([]);
  useEffect(() => {
    const getExperts = async () => {
      try {
        const response = await api.get('https://79.137.85.120:443/experts/');
        setExperts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getExperts();
  }, []);



>>>>>>> Stashed changes

    const useCustomers = (page, rowsPerPage) => {
        return useMemo(
            () => {
                return applyPagination(experts, page, rowsPerPage);
            },
            [page, rowsPerPage]
        );
    };

    const useCustomerIds = (customers) => {
        return useMemo(
            () => {
                return customers.map((customer) => customer.id);
            },
            [customers]
        );
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection = useSelection(customersIds);

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

    if (!experts) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                {/* Experts  */}
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Les Experts 
                                    {/* {experts.length} */}
                                </Typography>
<<<<<<< Updated upstream
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowUpOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Import
                                    </Button>
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowDownOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Export
                                    </Button>
                                </Stack>
=======
                                      
>>>>>>> Stashed changes
                            </Stack>
                            <div>
                                    <Button color="inherit" startIcon={(  <SvgIcon fontSize="small"><ArrowDownOnSquareIcon /></SvgIcon> )} onClick={exportDataToExcel}  >
                                       Exporter 
                                    </Button>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                >
                                    Add
                                </Button>
                            </div>
                        </Stack>
                        {/* <CustomersSearch /> */}
                        <ExpertsTable
                            count={experts.length}
                            items={experts}
                            onDeselectAll={customersSelection.handleDeselectAll}
                            onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={customersSelection.handleSelectAll}
                            onSelectOne={customersSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={customersSelection.selected}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default ExpertsPage;

ExpertsPage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

