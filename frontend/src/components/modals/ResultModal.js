import { TextField, Button, Modal, Typography, Stack, Box } from '@mui/material';
import '../../css/Modal.css';

const ResultModal = ( { score, showCreate, handleClose, back, reset } ) => {
    return (
        <Modal
            open={showCreate}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box className='modal'>
                <Box className='content'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {`您的分數：${score}/100`}
                    </Typography>
                    <Stack direction='row'>
                        <Button onClick={back} >回到測驗首頁</Button>
                        <Button onClick={reset} >再考一次</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default ResultModal;