import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CarnetsTable } from 'src/sections/carnets/carnet-table';
import { CarnetsSearch } from 'src/sections/carnets/carnets-search';
import carnetServicesService from 'src/core/services/carnetServices.service';
<<<<<<< Updated upstream
function CarnetsPage({ carnets }) {
=======
import api from 'src/core/services/helpers/api-get';
function CarnetsPage() {
  const exportDataToExcel = () => {
    const dataForExcel = carnets.map((carnet) => [
      carnet.date_vidange,
      carnet.klm_vidange,
      carnet.klm_plaque,
      carnet.date_batterie,
      carnet.date_assurance,
      carnet.date_visite,
    ]);
  
    const headerForExcel = ['Date vidange','Klm vidange','Klm plaque','Date batterie','Date assurances','Date visite'];
    const data = [headerForExcel, ...dataForExcel];
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Carnets');
  
    const fileName = 'carnets.xlsx';
    XLSX.writeFile(workbook, fileName);
  }

  const [carnets, setCarnets] = useState([]);
  useEffect(() => {
    const getCarnets = async () => {
      try {
        const response = await api.get('https://79.137.85.120:443/carnets/');
        setCarnets(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCarnets();
  }, []);

>>>>>>> Stashed changes
  const useCarnetUsers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(carnets, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };

  const useCarnetUserIds = (carnetUsers) => {
    return useMemo(
      () => {
        return carnetUsers.map((carnetUser) => carnetUser.id);
      },
      [carnetUsers]
    );
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const carnetUsers = useCarnetUsers(page, rowsPerPage);
  const carnetUsersIds = useCarnetUserIds(carnetUsers);
  const carnetUsersSelection = useSelection(carnetUsersIds);
  
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

  if (!carnets) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>
          Carnets | Elcarhba
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Les Carnets
                </Typography>
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
                    Importer
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Exporter
                  </Button>
                </Stack>
              </Stack>
              {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Ajouter
                </Button>
              </div> */}
            </Stack>
            <CarnetsSearch />
            <CarnetsTable
              count={carnets.length}
              items={carnets}
              onDeselectAll={carnetUsersSelection.handleDeselectAll}
              onDeselectOne={carnetUsersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={carnetUsersSelection.handleSelectAll}
              onSelectOne={carnetUsersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={carnetUsersSelection.selected}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// export async function getStaticProps() {
//   try {
//     const carnets = await carnetServicesService.getAllCarnets();
//     return {
//       props: {
//         carnets
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return {
//       props: {
//         carnets: [],
//       },
//     };
//   }
// }

CarnetsPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CarnetsPage;
