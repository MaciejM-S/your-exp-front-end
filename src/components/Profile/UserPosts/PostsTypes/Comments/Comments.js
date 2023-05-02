import { Typography, Avatar, Box, Divider } from "@mui/material";
import { Buffer } from "buffer";


function Comments(props) {


  return (<>
    {props.comments.comments.map(comment => {

      return (
        <>
          <Box>


            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin:'15px 0'
              }}
            >
              <Avatar 
              src={comment.comment.avatar&&'data:image/jpeg' + ';base64,' + Buffer.from(comment.comment.avatar.data, "binary").toString("base64")
              }
                aria-label="recipe"></Avatar>

              <Typography
                sx={{ ml: 1, fontWeight: 700 }}
              >
                {`${comment.comment.firstName} ${comment.comment.lastName}`}

              </Typography>

              <Typography
                style={{ fontWeight: 200, marginLeft: '4px' }}
              >on:</Typography>

              <Typography
                sx={{ ml: 1 }}
              >
                {`${comment.comment.date}`}

              </Typography>

            </Box>

            <Box
              sx={{
                textAlign: 'left',
                marginLeft: '45px',
                padding: '5px',
                
               
              }}
            >
              <Typography
                sx={{border: '#999 1px solid ',
                borderRadius:'5px', display:'inline',
                padding:'6px 6px'
              }}
              >
                {comment.comment.text}
              </Typography>


            </Box>


              <Divider sx={{mt:2, mb:4}} />

          </Box>


        </>
      )


    }
    )}

  </>);
}

export default Comments;