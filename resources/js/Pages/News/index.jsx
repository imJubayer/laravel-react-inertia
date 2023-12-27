import { useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Button, Chip, Grid, IconButton, Tooltip, Typography } from "@mui/joy";
import Add from "@mui/icons-material/Add";
import BasicDataTable from "../../Components/table/BasicDatatable";
import {
    BlockOutlined,
    CloudOff,
    CheckRounded,
    CloudQueue,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { router, useForm } from "@inertiajs/react";
import AddService from "./AddNews";
import toast from "react-hot-toast";

const breadcrumbs = [{ label: "News", link: "#", isLast: true }];

export default function News({ auth, newses }) {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [addNewsModalOpen, setAddNewsModalOpen] = useState(false);
    const [serviceDetailsModalOpen, setServiceDetailsModalOpen] =
        useState(false);
    const [editServiceModalOpen, setEditServiceModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState();
    const [updateService, setUpdateService] = useState(false);
    const form = useForm();

    const handleDelete = async (id) => {
        const isDeletionConfirmed = await showConfirmationAlert(
            "Are you sure?",
            "Delete this service?",
            "Yes, delete!",
            "Cancel"
        );

        if (isDeletionConfirmed) {
            try {
            } catch (e) {
                setLoading(false);
            }
        }
    };

    const handleStatus = async (id) => {
        form.post(`/news/change-status/${id}`, {
            onSuccess: () => {
                // Handle success
                toast.success("Status updated");
            },
            onError: () => {
                // Handle error
                console.error("Error updating status:", form.errors);
            },
        });
        // try {
        // } catch (e) {
        //     toast.error(e.response.data.msg);
        //     setLoading(false);
        // }
    };

    const columns = [
        { header: "Title", accessor: "title", width: "10%" },
        {
            header: "Summary",
            accessor: "summary",
        },
        {
            header: "Description",
            accessor: "description",
        },
        { header: "Youtube Url", accessor: "youtube_url" },
        {
            header: "Status",
            content: (news) => {
                return (
                    <Tooltip
                        title="Click to change"
                        arrow
                        size="sm"
                        variant="solid"
                        placement="right"
                    >
                        <Chip
                            color={
                                news.status === "draft" ? "warning" : "success"
                            }
                            variant="soft"
                            onClick={() => handleStatus(news.id)}
                            startDecorator={
                                news.status === "draft" ? (
                                    <BlockOutlined fontSize="small" />
                                ) : (
                                    <CheckRounded fontSize="small" />
                                )
                            }
                        >
                            {news.status === "draft" ? "Draft" : "Published"}
                        </Chip>
                    </Tooltip>
                );
            },
        },
        {
            header: "Actions",
            content: (news) => {
                return (
                    <div>
                        <Tooltip title="Info">
                            <IconButton
                                type="primary"
                                color="primary"
                                onClick={() => {
                                    // handleServiceClick(news);
                                    // setServiceDetailsModalOpen(true);
                                }}
                            >
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <IconButton
                                type="primary"
                                color="primary"
                                // onClick={() => {
                                //     handleServiceClick(news);
                                //     setEditServiceModalOpen(true);
                                // }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        {/* Delete Icon Button */}
                        <Tooltip title="Delete">
                            <IconButton
                                type="danger"
                                color="danger"
                                onClick={() => handleDelete(news.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];
    return (
        <DashboardLayout
            head="News"
            title="News"
            breadcrumbs={breadcrumbs}
            secondary={
                <Button
                    startDecorator={<Add />}
                    onClick={() => setAddNewsModalOpen(true)}
                >
                    Add News
                </Button>
            }
        >
            <Grid container>
                <Grid>
                    <BasicDataTable
                        columns={columns}
                        rows={newses}
                        count={newses.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        showSL={true}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                </Grid>
                <AddService
                    addNewsModalOpen={addNewsModalOpen}
                    setAddNewsModalOpen={(value) => setAddNewsModalOpen(value)}
                    updateService={updateService}
                    setUpdateService={(value) => setUpdateService(value)}
                />
            </Grid>
        </DashboardLayout>
    );
}
