import { Stack, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const BookForm = ({
  onTitleChange,
  onAuthorChange,
  onDescriptionChange,
  titleState,
  authorState,
  descriptionState,
  onSaveNew,
  onSave,
  onDelete,
}) => {
  return (
    <Stack spacing={2}>
      <TextField id="title" label="Title" onChange={onTitleChange} value={titleState} />
      <TextField id="author" label="Author" onChange={onAuthorChange} value={authorState} />
      <TextField
        id="description"
        minRows={4}
        label="Description"
        variant="outlined"
        onChange={onDescriptionChange}
        value={descriptionState}
        multiline
        fullWidth
      />
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={onSaveNew}>
          Save new
        </Button>
        <Button variant="outlined" onClick={onSave}>
          Save
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={onDelete}>
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

export default BookForm;
