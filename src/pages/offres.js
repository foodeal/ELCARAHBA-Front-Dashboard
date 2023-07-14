import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OffersTable } from 'src/sections/offres/offres-table';
import { OffersSearch } from 'src/sections/offres/offres-search';
import { applyPagination } from 'src/utils/apply-pagination';
import  offreServices  from '../core/services/offreServices.service';


function OffresPage({ offres }) {

  const useOffres = (page, rowsPerPage) => {
      return useMemo(
          () => {
              return applyPagination(offres, page, rowsPerPage);
          },
          [page, rowsPerPage]
      );
  };

  const useOffreIds = (offres) => {
      return useMemo(
          () => {
              return offres.map((offre) => offre.id);
          },
          [offres]
      );
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const offresList = useOffres(page, rowsPerPage);
  const offresIds = useOffreIds(offresList);
  const offresSelection = useSelection(offresIds);
  
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

  if (!offres) {
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
              {/* offres */}
              <Container maxWidth="xl">
                  <Stack spacing={3}>
                      <Stack
                          direction="row"
                          justifyContent="space-between"
                          spacing={4}
                      >
                          <Stack spacing={1}>
                              <Typography variant="h4">
                                  Les offres : {offres.length}
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
                          <div>
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
                          </div>
                      </Stack>
                      <OffersSearch />
                      <OffersTable
                          count={offres.length}
                          items={offres}
                          onDeselectAll={offresSelection.handleDeselectAll}
                          onDeselectOne={offresSelection.handleDeselectOne}
                          onPageChange={handlePageChange}
                          onRowsPerPageChange={handleRowsPerPageChange}
                          onSelectAll={offresSelection.handleSelectAll}
                          onSelectOne={offresSelection.handleSelectOne}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          selected={offresSelection.selected}
                      />
                  </Stack>
              </Container>
          </Box>
      </>
  );
}

export async function getStaticProps() {
  try {
      const offres = await offreServices.getAllOffres();
      return {
          props: {
              offres
          },
      };
  } catch (error) {
      console.error('Error fetching offres:', error);
      return {
          props: {
              offres: []
          },
      };
  }
}


export default OffresPage;

OffresPage.getLayout = (page) => (
  <DashboardLayout>
      {page}
  </DashboardLayout>
);

