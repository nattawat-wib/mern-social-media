import { useState } from 'react';

import Dialog from "@mui/material/Dialog";
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'

import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const EditProfileDialog = ({ isEditProfileDialogOpen, setIsEditProfileDialogOpen }) => {

    return (
        <Dialog
            open={isEditProfileDialogOpen}
            onClose={() => setIsEditProfileDialogOpen(false)}
            maxWidth="md"
            sx={{ "& .MuiPaper-root": { width: "100%" } }}
        >
            <DialogTitle className="flex items-center justify-between">
                <Typography> Edit Your Profile</Typography>
                <IconButton sx={{ bgcolor: '#f0f2f5' }} onClick={() => setIsEditProfileDialogOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider className="mx-4" />
            <DialogContent>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={4}>
                        <Avatar
                            sx={{ width: '160px', height: '160px', m: 'auto' }}
                            src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <figure className='relative pt-[40%]'>
                            <img className='fit-img rounded-lg' src='http://wallup.net/wp-content/uploads/2017/03/29/486048-photography-animals-dog-landscape.jpg' />
                        </figure>
                    </Grid>
                    <Grid item xs={4}>
                        <Box textAlign='center'>
                            <Button variant='outlined' startIcon={<FileUploadIcon />}> Profile </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box textAlign='center'>
                            <Button variant='outlined' startIcon={<FileUploadIcon />}> Cover </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={6}>
                        <TextField variant='outlined' label='Bio' size='small' fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            select
                            variant='outlined'
                            label='Gender'
                            size='small'
                            fullWidth
                        >
                            <MenuItem> Male </MenuItem>
                            <MenuItem> Female </MenuItem>
                            <MenuItem> Other </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField variant='outlined' label='Birth Date' size='small' fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField variant='outlined' label='Address' size='small' fullWidth />
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider className="mx-4" />

            <DialogActions className='p-4'>
                <Box textAlign='center'>
                    <Button variant='contained' startIcon={<SaveIcon />}> SAVE </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}

export default EditProfileDialog;