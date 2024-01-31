/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useEffect, useMemo, useState } from 'react';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PrestatairesTable } from 'src/sections/user/prestataires-table';
import { CustomersSearch } from 'src/sections/user/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import userServices from '../../core/services/userServices.service';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import api from 'src/core/services/helpers/api-get';
function PrestatairesPage() {
  const exportDataToExcel = () => {
  const dataForExcel = prestataires.map((prestataire) => [
    prestataire.nom_prestataire,
    prestataire.prenom_prestataire,
    prestataire.email_prestataire,
    prestataire.tel_prestataire,
  ]);

  const headerForExcel = ['Nom', 'Prénom', 'Email', 'Téléphone'];
  const data = [headerForExcel, ...dataForExcel];
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Prestataires');

  const fileName = 'prestataires.xlsx';
  XLSX.writeFile(workbook, fileName);
}


  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [prestataires, setPrestataires] = useState([]);
  useEffect(() => {
    const getPrestataires = async () => {
      try {
        const response = await api.get('https://79.137.85.120:443/prestataires/');
        setPrestataires(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPrestataires();
  }, []);

  const useCustomers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(prestataires, page, rowsPerPage);
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
  const [nomPrestataire, setNomPrestataire] = useState('');
  const [prenomPrestataire, setPrenomPrestataire] = useState('');
  const [dateNaissance, setDateNaissance] = useState('1992-02-17');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [pays, setPays] = useState('Tunis');
  const [ville, setVille] = useState('');
  const [raisonSociale, setRaisonSociale] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [adresse, setAdresse] = useState('');
  const [lienFB, setLienFB] = useState('');
  const [lienInsta, setLienInsta] = useState('');
  const [contratCondition, setContratCondition] = useState('');
  const [CinGeron, setCINGerant] = useState('');
  const [siteWeb, setSiteWeb] = useState('');
  const [registreCommerce, setRegistreCommerce] = useState('');
  const [nomGarage, setNomGarage] = useState('');
  const [service,setService] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const newPrest = {
      nom_prestataire : nomPrestataire,
      prenom_prestataire: prenomPrestataire,
      email_prestataire: email ,
      tel_prestataire: telephone ,
      raison_sociale: raisonSociale,
      role: 'Prestataire',
      pays_prestataire : pays,
      ville_prestataire: ville,
      adresse_prestataire: adresse,
      service_prestataire: service ,
      site_web: siteWeb,
      lien_fb: lienFB,
      lien_insta: lienInsta,
      registre_commerce: registreCommerce,
      cin_geron: CinGeron,
      nom_garage : nomGarage,
      contrat_condition: contratCondition,
      motdepasse: motdepasse,
    };

    const token = JSON.parse(localStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
      .post("https://79.137.85.120:443/prestataires/register", newPrest)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error occurred while submitting the form:', error);
      });
  };



  if (!prestataires) {
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
        {/* Prestataires  */}
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Les Prestataires 
                  {/* {prestataires.length} */}
                </Typography>
                 
              </Stack>
              <div>
              <Button
        color="inherit"
        startIcon={(
          <SvgIcon fontSize="small">
            <ArrowDownOnSquareIcon />
          </SvgIcon>
        )}
        onClick={exportDataToExcel}
      >
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
            <CustomersSearch />
            <PrestatairesTable
              count={prestataires.length}
              items={prestataires}
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

export default PrestatairesPage;

PrestatairesPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

