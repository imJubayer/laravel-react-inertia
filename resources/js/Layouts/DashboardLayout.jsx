import * as React from "react";
// // import Head from "next/head";
// import Box from "@mui/joy/Box";
import { Box, Grid, Breadcrumbs, Typography, Card } from "@mui/joy";

// // icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

// // import useScript from "@/hooks/useScripts";
// // import Sidebar from "@/components/muiUI/Sidebar";
// // import Header from "@/components/muiUI/Header";
import Sidebar from "./Sidebar";
import Header from "./Header";
// import Header from "./Header";
// import { Breadcrumb, PageTitle, SnackBarType } from "../types/common";
import { Toaster } from "react-hot-toast";

// // import { useRouter } from "next/router";
// // import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { Head, Link, usePage } from "@inertiajs/react";

// const useEnhancedEffect =
//     typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

// interface DashboardLayoutProps {
//     head?: string;
//     tabs?: React.ReactNode;
//     children: React.ReactNode;
//     breadcrumbs?: Breadcrumb[];
//     title: PageTitle;
//     secondary?: React.ReactNode;
//     snackbar?: SnackBarType;
//     snackbarClose?: () => void;
//     loading?: boolean;
//     requiredRole?: string | string[];
// }
export default function DashboardLayout({
    head,
    tabs,
    children,
    breadcrumbs,
    title,
    secondary,
    loading,
    authUser,
}) {
    const pageProps = usePage();
    const { user } = pageProps.props.auth;
    if (user !== undefined) {
        authUser = user;
    }
    // @ts-ignore
    return (
        <React.Fragment>
            <Head title={head && `${head}`} />
            <Box
                sx={(theme) => ({
                    display: "flex",
                    minHeight: "100dvh",
                    width: "100%",
                    backgroundColor: "rgba(255 255 255 / 0.2)",
                    [theme.getColorSchemeSelector("dark")]: {
                        backgroundColor: "rgba(19 19 24 / 0.8)",
                    },
                })}
            >
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading || false}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Header />
                <Sidebar />
                <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    flexDirection="column"
                    margin={{ xs: 2, sm: 4 }}
                    spacing={2}
                    sx={{ width: "100%" }}
                >
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <Grid
                            xs={12}
                            sx={{ width: "100%", paddingTop: { xs: 4 } }}
                        >
                            <Breadcrumbs
                                size="sm"
                                aria-label="breadcrumbs"
                                separator={<ChevronRightRoundedIcon />}
                                sx={{ pl: 0 }}
                            >
                                <Link href="/home">
                                    <HomeRoundedIcon />
                                </Link>
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <React.Fragment key={index}>
                                        {!breadcrumb.isLast ? (
                                            <Link href={breadcrumb.link}>
                                                {breadcrumb.label}
                                            </Link>
                                        ) : (
                                            <Typography
                                                color="primary"
                                                aria-current="page"
                                            >
                                                {breadcrumb.icon &&
                                                    breadcrumb.icon}
                                                {breadcrumb.label}
                                            </Typography>
                                        )}
                                    </React.Fragment>
                                ))}
                            </Breadcrumbs>
                        </Grid>
                    )}
                    <Grid xs={12} sx={{ width: "100%" }}>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="space-between"
                        >
                            <Grid paddingTop={1}>
                                <Typography level="h2">{title}</Typography>
                            </Grid>
                            {secondary && (
                                <Grid>
                                    <Typography level="h2">
                                        {secondary}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                    {tabs && (
                        <Grid
                            marginLeft={{ xs: -2, sm: -6 }}
                            xs={12}
                            sx={{ width: "100%" }}
                        >
                            {tabs}
                        </Grid>
                    )}
                    <Grid xs={12} sx={{ width: "100%" }}>
                        <Card variant="soft">{children}</Card>
                    </Grid>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                        toastOptions={{
                            duration: 1000,
                            // style: {
                            //     border: '1px solid #713200',
                            //     padding: '16px',
                            //     color: '#713200',
                            //     background: '#F0FFF0',
                            // },
                            success: {
                                duration: 3000,
                                style: {
                                    border: "1px solid #713200",
                                    padding: "16px",
                                    color: "#713200",
                                    background: "#F0FFF0",
                                },
                            },
                        }}
                    />
                </Grid>
            </Box>
        </React.Fragment>
    );
}
