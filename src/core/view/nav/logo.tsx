import { IconButton }           from "@mui/material";
import { Typography }           from "@mui/material";
import { CatchingPokemon }      from "@mui/icons-material";

function AuresLogo() {

	return (
        <>
            <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                <CatchingPokemon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                AURES
            </Typography>
        </> 
    );
}

export { AuresLogo };