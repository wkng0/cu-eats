import React, {useState} from 'react';
import { 
    Box, 
    Tab, 
    Tabs, 
    Container, 
    Card, 
    CardMedia, 
    CardActions, 
    CardContent,
    CardHeader,
    Drawer,
    Dialog,
    DialogTitle,
    Paper,
    Fab,
    Avatar,
    Grid,
    Button, 
    Typography,
    TextField,
    Pagination,
    Toolbar,
    Divider,
    List,
    ListItem,
    ListItemText,
    IconButton,
    DialogContent,
    DialogActions, 
    DialogContentText,
    Input,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import {red}from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import './comment.json'

let data = [];
let canteenChoice="SC";

async function reloadComment(canteenChoice){
    fetch('http://localhost:7000/dbComment/get'+canteenChoice)
    .then(res=>res.json())
    .then(db=>{
        data=db;
        console.log(data);
    })

}



function TabPanel(){

    const [value, setValue] = React.useState(0);
    const handleChange=(event,newValue)=>{
        
        reloadComment(canteenChoice);
        setValue(newValue);
    };
    

    return(
        <>
        
            <Container maxWidth="sm">
                <CanteenDrawer/>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Chit-Chat" value={0} />
                        <Tab label="Rating" value={1}/>
                    </Tabs>
                </Box>
                {data.map((file,i)=><TabContent key={i} i={i} value={value} />)}
            </Container>
    
        </>
    );
}

class TabContent extends React.Component{
    constructor(props){
        super(props)
    }
    

    render(){
        let i=this.props.i;
        console.log(this.props.value!==data[i].type);
        return(
            <div role="tabpanel" style={{marginTop:"1rem"}} hidden={this.props.value!==data[i].type}>
                {this.props.value===data[i].type &&(
                
                    <Card sx={{ minWidth: 275 }}>
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: red[500] }}>
                                {data[i].userid[0]}
                            </Avatar>
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={data[i].userid}
                            subheader={data[i].date}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{mb:1}}>
                                {data[i].title}
                            </Typography>
                            <CardMedia
                                component="img"
                                height="auto"
                                image={data[i].image}
                                alt="green iguana"
                                sx={{mb:2}}
                            />
                            <Typography sx={{ mb: 1.5 }} >
                                {data[i].description}
                            </Typography>
            
                        </CardContent>
                        
                        <CardActions>
                            <IconButton aria-label="add to favorites">
                                <ThumbUpIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                
                )}
            </div>

        );
     }
}

class CanteenDrawer extends React.Component{

    render(){
        return(
            <div style={{zIndex: -10}}>            
                <Drawer
                    sx={{
                    width: 240,
                    flexShrink: 1,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="permanent"
                    
                    style={{zIndex: -1000}}
                
                >
                    <Toolbar/>
                
                    <List>
                    {['Shaw Can', 'NA Can', 'UC Can', 'CC Can'].map((text, index) => (
                            <ListItem button key={text}>
                            
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                </Drawer>
            </div>
        );
    }
}

function AddComment(){
    const [open, setOpen]=React.useState(false);
    const handleClick=()=>{
        setOpen(true);
        
    }
    const handlePublish=()=>{
        setOpen(false);
    }  
    const handleClose=()=>{
        setOpen(false);
    }
    return(
        <>
            <Fab color="secondary" sx={{position: 'fixed', bottom: 80 ,right:32}} onClick={handleClick}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} scroll="paper" style={{zIndex:99999, position:"absolute"}}>
                <Paper sx={{width: "800px"}}>
                   
                    <DialogTitle>
                    Add Comment 
                    </DialogTitle> 
                    <DialogContent>
                      

                        <DialogContentText>
                        <div sx={{mb:2}}>
                            <TextField fullWidth id="title" label="Title" variant="standard" />
                        
                        </div>  
                        <div>
                            <TextField
                                id="description"
                                label="Description"
                                multiline
                                rows={5}
                                variant="standard"
                                fullWidth
                            />
                        </div> 
                        </DialogContentText>
                
                    </DialogContent>
                    <DialogActions>
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file" sx={{display:"none"}}/>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <CameraAltIcon />
                            </IconButton>
                        </label>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" endIcon={<PublishIcon />} onClick={handlePublish}>
                            Publish
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog> 
             
        </>
        
    );
}



class Comment extends React.Component{
    constructor(){
        super();
    }
    
    componentDidMount=()=>{
        reloadComment(canteenChoice);
    }
    render(){
        return(
        <>
            
            <CanteenDrawer/>
            <AddComment/>
            <TabPanel/>
            
        
        </>
        
        )
    }
}

export {Comment};