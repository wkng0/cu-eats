import React, {useEffect, useState} from 'react';
import Select from 'react-select'
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
    Dialog,
    DialogTitle,
    Paper,
    Fab,
    FormControl,
    Avatar,
    Grid,
    Button, 
    Typography,
    TextField,
    Pagination,
    Toolbar,
    Divider,
    FormHelperText,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    IconButton,
    DialogContent,
    DialogActions, 
    DialogContentText,
    Input,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel,
    MenuItem
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
import zIndex from '@mui/material/styles/zIndex';

let data = [];


class TabPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:0,
        }
        
    }
    
    handleChange=(event,newValue)=>{  
        this.setState({value:newValue})
    };
 
    render(){
        let tab=this.state.value;
        //console.log(tab);
        return(
            <>
                <Container maxWidth="sm" >
                    
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={this.state.value} onChange={this.handleChange}>
                            <Tab label="All" value={-1}/> 
                            <Tab label="Chit-Chat" value={0} />
                            <Tab label="Rating" value={1}/>
                        </Tabs>
                    </Box>
                    
                    {data.map((file,i)=><TabContent key={i} i={i} value={this.state.value} />)}
                   
                </Container>
                
        
            </>
        );
    }
    
}

class TabContent extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        let i=this.props.i;

        return(
            <div role="tabpanel" style={{marginTop:"1rem"}} hidden={(this.props.value!=data[i].type &&this.props.value!=-1)}>
                {(this.props.value==data[i].type || this.props.value=="-1") &&(
                
                    <Card sx={{borderRadius:3}}>
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
                                image={data[i].image.indexOf("http")==-1?"http://localhost:7000/dbComment/photo/get/"+data[i].image:data[i].image}
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

class SideBar extends React.Component{
    constructor(){
        super();
        this.state={
            canteen:"SC",
        };
    }
    handleClick=(e)=>{

        let canteenChoice=e.currentTarget.getAttribute('value');
        //console.log(canteenChoice);
        fetch('http://localhost:7000/dbComment/get/'+canteenChoice)
        .then(res=>res.json())
        .then(db=>{
            data=db;
            //console.log(data);
            //console.log("send to " +canteenChoice);
            this.setState({
                canteen:canteenChoice,
            });
        })
        
    }
    
    render(){
        return(
            <div style={{zIndex: "-99999 !important"}}>
                <Grid container margin={"auto"} maxWidth={"md"}  justifyContent="center">
                    <Grid item xs={2} sm={2}>
                        <Paper  elevation={2} rounded="true" sx={{position:"fixed",zIndex:0 ,borderRadius:3}}>
                            <List>
                                <ListItem >
                                    <ListItemButton onClick={this.handleClick} value="SC" selected={this.state.canteen=="SC"}>
                                        <ListItemText>
                                            SeeYou@Shaw
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem >
                                    <ListItemButton onClick={this.handleClick} value="UC" selected={this.state.canteen=="UC"}>
                                        <ListItemText>
                                            Joyful Inn
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem >
                                    <ListItemButton onClick={this.handleClick} value="NA" selected={this.state.canteen=="NA"}>
                                        <ListItemText>
                                            Now ,
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={10} sm={10} zIndex={0}>
                        <TabPanel value={0} canteen={this.state.canteen}/>
                    </Grid>
                </Grid>
                
            </div>
        );
        

    }
}

function AddComment(){
    const [open, setOpen]=React.useState(false);
    const [title, setTitle]=React.useState("");
    const [description,setDescription]=React.useState("");
    const [type, setType]=React.useState(-1);
    const [titleEmpty,setTitleEmpty]=React.useState(false);
    const [descEmpty,setDescEmpty]=React.useState(false);
    const [locationEmpty, setLocationEmpty]=React.useState(false);
    const [helperTextAEmpty, setHelperTextAEmpty]=React.useState("");
    const [helperTextBEmpty, setHelperTextBEmpty]=React.useState("");
    const [helperTextCEmpty, setHelperTextCEmpty]=React.useState("");
    const [canteen, setCanteen]=React.useState("");
    const [selectedFile, setSelectedFile]=React.useState("");
    const [canteenEmpty, setCanteenEmpty]=React.useState(false);
    const [fileEmpty, setFileEmpty]=React.useState(true);
    const [newFileName, setNewFileName]=React.useState("");
    const handleClick=()=>{
        setOpen(true);
        
    }
    const handlePublish=(e)=>{
        if(titleEmpty==true||descEmpty==true||type==-1){
            if(type==-1){
                setLocationEmpty(true);
                setHelperTextCEmpty("Please choose an option");
            }
            if(title==""){
                setTitleEmpty(true);
                setHelperTextAEmpty("Please fill in the title")
            }
            if(description==""){
                setDescEmpty(true);
                setHelperTextBEmpty("Please fill in the description")
            }

        }else{
            fetch('http://localhost:7000/dbComment/post/'+canteen, {
                method: 'POST', 
                body: new URLSearchParams({
                    "userid":"temp",
                    "title":title,
                    "image": newFileName,
                    "description":description,
                    "type":type
                }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                },
                
            })
            .then(response => console.log(response))
            .then(() => {
                
                setOpen(false);window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            window.location.reload();
            
        }
    }  
    const handleClose=()=>{
        setOpen(false);
    }
    const handleTitle=(event)=>{
        setTitle(event.target.value);
        if(event.target.value==""){
            setTitleEmpty(true);
            setHelperTextAEmpty("Please fill in the title")
            
        }else{
            setTitleEmpty(false);
            setHelperTextAEmpty("")
        }
        
        
    }
    const handleDescription=(event)=>{
        setDescription(event.target.value);
        if(event.target.value==""){
            
            setDescEmpty(true);
            setHelperTextBEmpty("Please fill in the description")
        }else{
            setDescEmpty(false);
            setHelperTextBEmpty("")
        }
        
    }
    const handleType=(event)=>{
        setType(event.target.value)
        if(event.target.value==-1){
            setLocationEmpty(true);
            setHelperTextCEmpty("Please choose an option")
        }else{
            setLocationEmpty(false);
            setHelperTextCEmpty("")
        }
    }
    const handleCanteen=(option)=>{
        setCanteen(option.value)
        if(option.value==""){
            setCanteenEmpty(true);
            setHelperTextCEmpty("Please choose an option")
        }else{
            setCanteenEmpty(false);
            setHelperTextCEmpty("")
        }
    }
    const handleFileUpload=(event)=>{
        setSelectedFile(event.target.files[0]);
        var formData = new FormData();
        formData.append('file', event.target.files[0]);
        fetch('http://localhost:7000/dbComment/photo/post', {
            method: 'POST', 
            body: formData
        })
        .then(response => {
            return response.json();})
        .then(data => {
            console.log(data);
            console.log("ok")
            setNewFileName(data.filename)
            setFileEmpty(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }
    const options = [
        { value: 'SC', label: 'SeeYou@Shaw' },
        { value: 'UC', label: 'Joyful Inn' },
        { value: 'NA', label: 'Now ,' }
      ]
      
    return(
        <div>
            <Fab color="secondary" sx={{position: 'fixed', bottom: 80 ,right:32,}} onClick={handleClick}>
                <AddIcon />
            </Fab>
            <Dialog component={"div"} width="md"height="md" open={open} onClose={handleClose} scroll="paper" style={{zIndex:9999, overflowY:"visible",position:"absolute"}} fullWidth>
                 <Paper>
                <DialogTitle >
                Add Comment 
                </DialogTitle> 
                <DialogContent>

                    

                   
                    <TextField 
                        fullWidth 
                        id="title" 
                        label="Title" 
                        variant="standard" 
                        value={title}
                        onChange={handleTitle}
                        sx={{mb:3}}
                        error={titleEmpty}
                        helperText={helperTextAEmpty}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        rows={5}
                        value={description}
                        variant="outlined"
                        onChange={handleDescription}
                        fullWidth
                        sx={{mb:3}}
                        error={descEmpty}
                        helperText={helperTextBEmpty}
                    />
                    <FormLabel error={locationEmpty}>Tab Location</FormLabel>
                    <RadioGroup 
                        row
                        value={type}
                        onChange={handleType}
                    >
                        <FormControlLabel value={0} control={<Radio />} label="Chit-Chat" />
                        <FormControlLabel value={1} control={<Radio />} label="Rating" />

                    </RadioGroup>
                    <FormHelperText error={locationEmpty}>{helperTextCEmpty}</FormHelperText>
             
                    <FormLabel error={canteenEmpty}>Canteen</FormLabel>    
                    <Select 
                        options={options} 
                        sx={{zIndex:99999}}
                        onChange={handleCanteen}
                        //ref
                        menuPortalTarget={document.body} 
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    />
                    <FormHelperText error={canteenEmpty}>{helperTextCEmpty}</FormHelperText>
                    <FormLabel error={canteenEmpty}>Photo</FormLabel>
                    <label htmlFor="icon-button-file" >
                        <Input accept="image/*" id="icon-button-file" name="photo" type="file" sx={{display:"none"}} onChange={handleFileUpload}/>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <CameraAltIcon />
                        </IconButton>
                    </label>
                    <div hidden={fileEmpty} >
                        <img className="mx-auto d-block" style={{maxWidth:"100%",maxHeight:"100%"}}src= {"http://localhost:7000/dbComment/photo/get/"+newFileName} />
                    </div>
                    

                </DialogContent>
                <DialogActions>
                    
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" endIcon={<PublishIcon />} onClick={handlePublish}>
                        Publish
                    </Button>
                </DialogActions>
                </Paper>
            </Dialog> 
             
        </div>
        
    );
}



class Comment extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }
    componentDidMount(){
        fetch('http://localhost:7000/dbComment/get/'+"SC")
        .then(res=>res.json())
        .then(db=>{
            data=db;
            //console.log(data);
            this.setState({})
        })
    }
    
    render(){
        
        return(
            <>
                <SideBar />
                <AddComment />
            </>
        
        )
    }
}

export {Comment};