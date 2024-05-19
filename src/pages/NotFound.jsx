import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const NotFound = () => (
    <>

        <Box
            sx={{
                backgroundColor: 'background.paper',
                flexGrow: 1
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    px: 5,
                    py: 14,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box
                    sx={{
                        '& img': {
                            maxWidth: '100%'
                        }
                    }}
                >
                </Box>
                <Typography
                    align="center"
                    sx={{ my: 2 }}
                    variant="h3"
                >
                    No disponible
                </Typography>
                <Typography
                    align="center"
                    color="text.secondary"
                    variant="body2"
                >
                    Esta pagina no está disponible, por favor regresa al inicio.
                </Typography>
                <Button
                    to="/"
                    component={RouterLink}
                    sx={{ mt: 2 }}
                >
                    Inicio
                </Button>
            </Container>
        </Box>
    </>
);

export default NotFound;
