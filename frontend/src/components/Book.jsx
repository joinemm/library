import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

const Book = (props) => {
  return (
    <Card
      sx={{
        textAlign: 'left',
        marginBottom: 2,
        backgroundColor: props.selected ? 'primary.dark' : 'initial',
      }}
    >
      <CardActionArea onClick={(event) => props.clickEvent(event, props.book.id)}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.book.author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Book;
