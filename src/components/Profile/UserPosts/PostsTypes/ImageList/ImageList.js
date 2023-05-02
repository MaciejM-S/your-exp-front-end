import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Buffer } from 'buffer';




export default function QuiltedImageList(props) {



  const ILProps = {
    maxHeight: '500px'
  }


  if (props.images.length === 2) return (
    <ImageList
      sx={ILProps}
      variant="quilted"
      cols={props.images.length}
      rowHeight={
        window.innerWidth<400?110:300
        }
    >
      {props.images.map((item, index) => (
        <ImageListItem
          key={'index' + index}
          cols={1} rows={1}>
          <img
            src={'data:image/jpeg' + ';base64,' + Buffer.from(item.data, "binary").toString("base64")}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );

  if (props.images.length === 1) return (
    <ImageList
      sx={ILProps}
      variant="quilted"
      cols={props.images.length}
      rowHeight={window.innerWidth<400?200:400}
    >
      {props.images.map((item, index) => (
        <ImageListItem
          key={'index' + index}
          cols={1} rows={1}>
          <img
            src={'data:image/jpeg' + ';base64,' + Buffer.from(item.data, "binary").toString("base64")}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )

  if (props.images.length === 3) return (
    <ImageList
      sx={ILProps}
      variant="quilted"
      cols={3}
      rowHeight={window.innerWidth<400?80:200}
    >
      {props.images.map((item, index) => (
        <ImageListItem
          key={'index' + index}
          cols={index === 0 ? 2 : 1} rows={index === 0 ? 2 : 1}>
          <img
            src={'data:image/jpeg' + ';base64,' + Buffer.from(item.data, "binary").toString("base64")}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
  if (props.images.length === 4) {

    return (
      <ImageList
        sx={{maxWidt:500}}
        variant="quilted"
        cols={3}
        rowHeight={
          window.innerWidth<400?65:130
          }
      >
        {props.images.map((item, index) => {
          let cols
          let rows

          if(index===0){cols=2;rows=3}
          if(index>1){cols=1;rows=1}
         
          return (
            <ImageListItem
              key={'index' + index}
              cols={cols} rows={rows}>
              <img
                src={'data:image/jpeg' + ';base64,' + Buffer.from(item.data, "binary").toString("base64")}
                loading="lazy"
              />
            </ImageListItem>
          )
        }


        )}
      </ImageList>
    )
  }


  if (props.images.length > 4) {

    return (
      <ImageList
        sx={{maxHeight:500}}
        variant="quilted"
        cols={5}
        rowHeight={
          window.innerWidth<400?65: 190
         }
      >
        {props.images.map((item, index) => {
          let cols
          let rows

          if(index===0){cols=3;rows=2}
          if(index>0){cols=2;rows=1}
          if(index===3){cols=2;rows=2}
          if(index===4){cols=3;rows=2}
          if(index>4){cols=5;rows=2}
          return (
            <ImageListItem
              key={'index' + index}
              cols={cols} rows={rows}>
              <img
                src={'data:image/jpeg' + ';base64,' + Buffer.from(item.data, "binary").toString("base64")}
                loading="lazy"
              />
            </ImageListItem>
          )
        }


        )}
      </ImageList>
    )
  }



}