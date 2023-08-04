import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { CouponExpiredSearch } from 'src/sections/coupons/couponExpired-search';
import { CouponExpiredTable } from 'src/sections/coupons/couponExpired-table';
import couponService  from '../core/services/couponServices.services';

function CouponExpiredPage({ couponExpired }) {

    const useCoupons = (page, rowsPerPage) => {
        return useMemo(
            () => {
                return applyPagination(couponExpired, page, rowsPerPage);
            },
            [page, rowsPerPage]
        );
    };

    const useCouponIds = (couponExpired) => {
        return useMemo(
            () => {
                return couponExpired.map((couponExpired) => couponExpired.id);
            },
            [couponExpired]
        );
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const coupons = useCoupons(page, rowsPerPage);
    const couponsIds = useCouponIds(couponExpired);
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

    if (!couponExpired) {
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
                {/* CouponExpired */}
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Les coupons expirés : {couponExpired.length}
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
                        <CouponExpiredSearch />
                        <CouponExpiredTable
                            count={couponExpired.length}
                            items={couponExpired}
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
        const couponExpired = await couponService.getAllCouponsExpired();
        return {
            props: {
                couponExpired
            },
        };
    } catch (error) {
        console.error('Error fetching couponExpired:', error);
        return {
            props: {
                couponExpired: []
            },
        };
    }
}


export default CouponExpiredPage;

CouponExpiredPage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

