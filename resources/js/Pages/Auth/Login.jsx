import { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import JoySignInSideTemplate from "../../Layouts/AuthLay";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    formLabelClasses,
    Input,
    Typography,
    Stack,
} from "@mui/joy";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { PasswordOutlined } from "@mui/icons-material";
import PasswordInput from "../../Components/ui-component/Input/PasswordInput";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    const children = (
        <Box
            component="main"
            sx={{
                my: "auto",
                py: 2,
                pb: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 400,
                maxWidth: "100%",
                mx: "auto",
                borderRadius: "sm",
                "& form": {
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                },
                [`& .${formLabelClasses.asterisk}`]: {
                    visibility: "hidden",
                },
            }}
        >
            <Stack gap={4} sx={{ mb: 2 }}>
                <Stack gap={1}>
                    <Typography level="h3">Sign in</Typography>
                    <Typography level="body-sm">
                        New to company?{" "}
                        <Link
                            href={route("register")}
                            style={{ color: "blue" }}
                        >
                            Sign up!
                        </Link>
                    </Typography>
                </Stack>
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
                <form onSubmit={submit}>
                    <FormControl required>
                        <FormLabel>Email</FormLabel>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Your email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            startDecorator={<EmailRoundedIcon />}
                            autoFocus
                        />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Password</FormLabel>

                        <PasswordInput
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            name="password"
                            placeholder="Password"
                        />
                    </FormControl>
                    <Stack gap={4} sx={{ mt: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Checkbox
                                size="sm"
                                label="Remember me"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <Link
                                href={route("password.request")}
                                style={{ color: "blue" }}
                            >
                                Forgot your password?
                            </Link>
                        </Box>
                        <Button type="submit" fullWidth>
                            Sign in
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Box>
    );

    return (
        <>
            <JoySignInSideTemplate head="Sign in">
                {children}
            </JoySignInSideTemplate>
        </>
    );
}
