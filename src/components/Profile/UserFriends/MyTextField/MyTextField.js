import { TextField, InputAdornment, IconButton  } from "@mui/material";
import { theme } from "../../../../theme";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';


function MyTextField(props) {
  return (   <TextField

    helperText={props.helperText}

    FormHelperTextProps={{
      sx: {
        color: theme.palette.main_orange,
    
      }
    }}
    placeholder='Search for friends'
    focused
    onChange={props.handleChange}
    onKeyDown={(e)=>{
      props.handleKey(e)
    }
    }
    sx={{
      width: "300px",
      margin:'30px 0 25px',
      [theme.breakpoints.down('600')]:{
        width:'210px'
      }
    }}
    InputProps={

      {
        endAdornment:
          <InputAdornment position="end">
            <IconButton>
              <PersonSearchIcon

                onClick={props.handleSearch}

                sx={{
                  transform: "scale(1.5)",
                }} />
            </IconButton>
          </InputAdornment>
      }} /> );
}

export default MyTextField;