import { TextField, Button, Modal, Typography, Stack, Box } from '@mui/material';
import '../../css/Modal.css';

const CardModal = ( { 
    handleAddCard, description,
    label1, label2, 
    name1, name2,
    changeName1, changeName2, 
    showCreate, handleClose 
} ) => {
    return (
        <Modal
            open={showCreate}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box className='modal'>
                <Box className='content'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {description}
                    </Typography>
                    <TextField 
                        id="outlined-basic" 
                        label={label1} 
                        variant="outlined" 
                        value={name1} 
                        onChange={changeName1} 
                    />
                    <TextField 
                        id="outlined-basic" 
                        label={label2} 
                        variant="outlined" 
                        value={name2} 
                        onChange={changeName2} 
                    />
                    <Stack direction='row' className='button-container'>
                        <Button variant="contained" color="success" onClick={handleAddCard} >確定</Button>
                        <Button variant="contained" color="error" onClick={handleClose} >取消</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default CardModal;