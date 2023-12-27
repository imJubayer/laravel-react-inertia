// third party
import * as Yup from "yup";
import { Formik } from "formik";

import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Select,
    Stack,
    Option,
    Switch,
    Textarea,
} from "@mui/joy";
import FadeModalDialog from "../../Components/common/Modal";
import { InfoOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react";
import slugify from "slugify";

// type addRolesPropsType = {
//     addServiceModalOpen: boolean
//     setAddServiceModalOpen: (value: boolean) => void
//     updateService: boolean
//     setUpdateService: (value: boolean) => void
// }
const AddNews = ({
    addNewsModalOpen,
    setAddNewsModalOpen,
    setUpdateNews,
    updateNews,
}) => {
    // const scriptedRef = useScriptRef();
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const content = (
        <Formik
            initialValues={{
                title: "",
                slug: "",
                description: "",
                summary: "",
                youtube_url: "",
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                title: Yup.string().required("News name is required"),
                slug: Yup.string()
                    .matches(/^[a-z0-9-]+$/, "Invalid slug format")
                    .required("News slug is required"),
                description: Yup.string().required(
                    "News description is required"
                ),
                summary: Yup.string().required("News summary is required"),
                youtube_url: Yup.string()
                    .url("Youtube URL must be a valid URL")
                    .required("Youtube URL is required"),
            })}
            onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting, resetForm }
            ) => {
                try {
                    const response = router.post("/news", values);
                    toast.success("News created successfully");
                    resetForm();
                    setAddNewsModalOpen(false);
                    // setUpdateNews(!updateNews);
                    console.log(response.status);
                    // await axios
                    //     .post(`api/services`, values)
                    //     .then((response) => {
                    //         if (response.data.success === true) {
                    //             toast.success(response.data.msg);
                    //             resetForm();
                    //             setSubmitting(false);
                    //             setAddServiceModalOpen(false);
                    //             setUpdateService(!updateService);
                    //         } else {
                    //         }
                    //     })
                    //     .catch((error) => {
                    //         toast.error(error.response.data.msg);
                    //     });
                } catch (err) {
                    // dispatch({
                    //     type: SNACKBAR_OPEN,
                    //     open: true,
                    //     message: err.response.data.response,
                    //     variant: 'alert',
                    //     alertSeverity: 'error',
                    // })
                }
            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
                values,
                resetForm,
            }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <FormControl
                            error={Boolean(touched.title && errors.title)}
                        >
                            <FormLabel>Title</FormLabel>
                            <Input
                                variant="outlined"
                                // color={
                                //     touched.title && errors.title
                                //         ? "danger"
                                //         : "primary"
                                // }
                                autoFocus
                                required
                                size="sm"
                                type="text"
                                name="title"
                                placeholder="News Title"
                                value={values.title}
                                onChange={(e) => {
                                    handleChange(e);
                                    const slug = slugify(e.target.value, {
                                        lower: true,
                                    });
                                    setFieldValue("slug", slug);
                                }}
                            />
                            {touched.title && errors.title && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.title}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            error={Boolean(touched.slug && errors.slug)}
                        >
                            <FormLabel>Slug</FormLabel>
                            <Input
                                variant="outlined"
                                // color={
                                //     touched.slug && errors.slug
                                //         ? "danger"
                                //         : "primary"
                                // }
                                autoFocus
                                required
                                size="sm"
                                type="text"
                                name="slug"
                                placeholder="News slug"
                                value={values.slug}
                                onChange={handleChange}
                            />
                            {touched.slug && errors.slug && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.slug}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            error={Boolean(
                                touched.description && errors.description
                            )}
                        >
                            <FormLabel>News description</FormLabel>
                            <Textarea
                                name="description"
                                placeholder="News description"
                                value={values.description}
                                onChange={handleChange}
                                minRows={3}
                            />
                            {touched?.description && errors?.description && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.description}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            error={Boolean(touched.summary && errors.summary)}
                        >
                            <FormLabel>News description</FormLabel>
                            <Textarea
                                name="summary"
                                placeholder="News summary"
                                value={values.summary}
                                onChange={handleChange}
                                minRows={3}
                            />
                            {touched?.summary && errors?.summary && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.summary}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            error={Boolean(
                                touched.youtube_url && errors.youtube_url
                            )}
                        >
                            <FormLabel>Youtube URL</FormLabel>
                            <Input
                                variant="outlined"
                                // color={
                                //     touched.youtube_url && errors.youtube_url
                                //         ? "danger"
                                //         : "primary"
                                // }
                                required
                                size="sm"
                                type="url"
                                name="youtube_url"
                                placeholder="Youtube URL"
                                value={values.youtube_url}
                                onChange={handleChange}
                            />
                            {touched.youtube_url && errors.youtube_url && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.youtube_url}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {/* <FormControl>
                            <FormLabel>Active Status</FormLabel>
                            <Select
                                variant="outlined"
                                color={errors.is_active ? "danger" : "primary"}
                                value={values.is_active}
                                name="is_active"
                                onChange={(e, value) =>
                                    setFieldValue("is_active", value)
                                }
                            >
                                <Option value={1}>Active</Option>
                                <Option value={0}>Inactive</Option>
                            </Select>
                        </FormControl> */}
                        <Button type="submit" size="sm" variant="solid">
                            Submit
                        </Button>
                    </Stack>
                </form>
            )}
        </Formik>
    );
    return (
        <FadeModalDialog
            title="Add News"
            content={content}
            open={addNewsModalOpen}
            setOpen={(value) => setAddNewsModalOpen(value)}
            size="md"
        />
    );
};

export default AddNews;
