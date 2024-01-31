import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { CouponValidSearch } from 'src/sections/coupons/couponValid-search';
import { CouponValidTable } from 'src/sections/coupons/couponValid-table';
import  couponService  from '../core/services/couponServices.services';
import api from 'src/core/services/helpers/api-get';

function CouponValidPage() {

  const [couponValid, setCoupon] = useState([]);
  useEffect(() => {
    const getCoupons = async () => {
      try {
        const response = await api.get('https://79.137.85.120:443/coupons/valide/1');
        setCoupon(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCoupons();
  }, []);

    const useCoupons = (page, rowsPerPage) => {
        return useMemo(
            () => {
                return applyPagination(couponValid, page, rowsPerPage);
            },
            [page, rowsPerPage]
        );
    };

    const useCouponIds = (couponValid) => {
        return useMemo(
            () => {
                return couponValid.map((couponValid) => couponValid.id);
            },
            [couponValid]
        );
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const coupons = useCoupons(page, rowsPerPage);
    const couponsIds = useCouponIds(couponValid);
    const couponsSelection = useSelection(couponsIds);
    
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

    if (!couponValid) {
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
                {/* CouponValid */}
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Les Coupons Valides 
                                    {/* : {couponValid.length} */}
                                </Typography>
                                {/* <Stack
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
                                </Stack> */}
                            </Stack>
                            <div>
                                {/* <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                >
                                    Ajouter
                                </Button> */}
                            </div>
                        </Stack>
                        <CouponValidSearch />
                        <CouponValidTable
                            count={couponValid.length}
                            items={couponValid}
                            onDeselectAll={couponsSelection.handleDeselectAll}
                            onDeselectOne={couponsSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={couponsSelection.handleSelectAll}
                            onSelectOne={couponsSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={couponsSelection.selected}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export async function getStaticProps() {
    try {
        const couponValid = await couponService.getAllCouponsValide();
        return {
            props: {
                couponValid
            },
        };
    } catch (error) {
        console.error('Error fetching couponValid:', error);
        return {
            props: {
                couponValid: []
            },
        };
    }
}


export default CouponValidPage;

CouponValidPage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

