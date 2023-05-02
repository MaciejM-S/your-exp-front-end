import React from 'react'
import { theme } from '../../../../../theme';
import { Divider, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import axios from 'axios';
import { baseUrl } from '../../../../..';

function RestrictImages() {
  const [value, setValue] = React.useState('')
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  React.useEffect(() => {
    axios.get(baseUrl
      + '/restrictPhotos', config).then(
      res => {
        setValue(res.data)
      }
    )
  }, [])
  const handleChange = (e) => {
    axios.post(baseUrl
      + '/restrictPhotos', { value: e.currentTarget.checked }, config).then(res => {
      setValue(res.data)
    }
    )
  }

  return (<>
    <ListItem
      sx={{ marginTop: '15px' }}
    >
      <NoPhotographyIcon
        variant='confidential'
      />
      <Typography variant='confidentialityVariant' >
        Restrict access of my images (profile picture will be still visible) to my friends only.
      </Typography>
      <Checkbox
        checked={value}
        onChange={(e) => {
          handleChange(e)
        }}
        sx={{
          position: 'absolute',
          right: '0px',
        }}
        disableRipple
      />
    </ListItem>
    <Divider
      sx={{
        marginTop: '25px',
      }}
      variant="middle" />
  </>
  )
}

export default RestrictImages;