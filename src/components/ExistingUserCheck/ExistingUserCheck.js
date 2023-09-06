import { Grid, Typography } from "@mui/material";
import Button from "../FormSection/FormsUI/Button";

const ExistingUserCheck = ({ isExistingUser, isLoading }) => {
  return (
    <Grid item xs={12}>
      {/* Display a message if the user already exists in the database */}
      {isExistingUser ? (
        <Typography variant="body1" sx={{ color: "#FA541c" }}>
          Sembra che tu abbia già compilato il form e tu sia già registrato!
          Se hai altri dubbi contattaci, se partecipi sicuramente troverai il modo!
        </Typography>
      ) : (
        <Button isLoading={isLoading}>Conferma</Button>
      )}
    </Grid>
  );
};

export default ExistingUserCheck;
