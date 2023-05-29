import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import couponsServices from '../core/services/couponsServices.service';
import { CouponValidSearch } from 'src/sections/coupons/couponValid-search';
import { CouponValidTable } from 'src/sections/coupons/couponValid-table';

function CouponValidPage({ couponValid }) {

    const useCustomers = (page, rowsPerPage) => {
        return useMemo(
            () => {
                return applyPagination(CouponValid, page, rowsPerPage);
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

    if (!CouponValid) {
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
                                    Les CouponValid {couponValid.length}
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
                        <CouponValidSearch />
                        <CouponValidTable
                            count={couponValid.length}
                            items={couponValid}
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

export async function getStaticProps() {
    try {
        const couponValid = await couponsServices.getAllcouponsValid();
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

