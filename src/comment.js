import React, { useState, useEffect }  from 'react';
import Select from 'react-select';
import { 
    AppBar,
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
    Rating,
    Avatar,
    Grid,
    Button, 
    Typography,
    TextField,
    Drawer,
    Toolbar,
    Divider,
    FormHelperText,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    SwipeableDrawer,
    IconButton,
    DialogContent,
    DialogActions, 

    Input,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,

} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import {red}from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {useParams} from 'react-router-dom'
import StorefrontIcon from '@mui/icons-material/Storefront';
import FlagIcon from '@mui/icons-material/Flag';
import zIndex from '@mui/material/styles/zIndex';
import { render } from '@testing-library/react';
import { TurnedIn } from '@mui/icons-material';

let data = [];


class TabPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:-1,
        }
    }
    
    handleChange=(event,newValue)=>{  
        this.setState({value:newValue})
    };
 
    render(){

        return(
            <>
                <Container maxWidth="sm"  >  
                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={this.state.value} onChange={this.handleChange}>
                            <Typography variant="h5" sx={{lineHeight:2, marginRight:"10px"}}>
                                {canteenList[canteenID.indexOf(this.props.canteen)]}
                            </Typography>
                            <Tab label="All" value={-1}/> 
                            <Tab label="Chit-Chat" value={0} />
                            <Tab label="Rating" value={1}/>
                        </Tabs>
                    </Box>
                    
                   
                    {data.map((file,i)=>
                        <div role="tabpanel" style={{marginTop:"1rem"}} key={i}>
                            {(this.state.value==data[i].type || this.state.value=="-1") &&(
                                <TabContent  i={i} canteen={this.props.canteen}/>
                            )}
                            
                        </div>
                    
                    )}
                    <Typography variant="h5">
                        You have scrolled to the bottom :)
                    </Typography>
                </Container>
                
        
            </>
        );
    }
    
}

class TabContent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            open:false,
            option:"",
            optionEmpty:false,
            helperText:""
        }
    }
    handleShare=()=>{
        navigator.clipboard.writeText("http://localhost:3000/comment/"+this.props.canteen+"/"+data[this.props.i]._id);
    }
    handleLike=()=>{

    }
    handleReport=()=>{
        console.log(data[this.props.i]._id);
        fetch("http://localhost:7000/dbComment/report", {
            method: 'POST', 
            body: new URLSearchParams({
                "postid":data[this.props.i]._id,
                "reason": this.state.option,
                "canteen": this.props.canteen
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            
        })
        .then(response => {
            console.log(response)
        })
        .then(() => {
            this.setState({open:false});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    handleClose=()=>{
        this.setState({open:false})
    }
    handleOption=(option)=>{
        this.setState({option:option.value});
        if(option.value==""){
            this.setState({
                optionEmpty:true,
                helperText:"Please choose an option"
            })
        }else{
            this.setState({
                optionEmpty:false,
                helperText:""
            })
        }
    }
    handleOpenForm=()=>{
        this.setState({
            open:true
        })
    }
    

    render(){
        const options = [
            { value: 'Sexual content', label: 'Sexual content' },
            { value: 'Violent or repulsive content', label: 'Violent or repulsive content' },
            { value: 'Hateful or abusive content', label: 'Hateful or abusive content' },
            { value: 'Harassment or bullying', label: 'Harassment or bullying' },
            { value: 'Harmful or dangerous acts', label: 'Harmful or dangerous acts' },
            { value: 'Spam or misleading', label: 'Spam or misleading' },
            { value: 'None of these are my issues', label: 'None of these are my issues' }

        ]
        let i=this.props.i;
        let postTime=data[i].datetime.substring(0,10)+" "+data[i].datetime.substring(11,16);

        return(
            
            <Card sx={{borderRadius:3}}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: red[500] }}>
                        {data[i].userid[0]}
                    </Avatar>
                    }
                    action={<>
                   
                    <IconButton aria-label="settings" onClick={this.handleOpenForm}>
                        <FlagIcon />
                    </IconButton>
                    <Dialog component={"div"} width="md"height="md" open={this.state.open} onClose={this.handleClose} scroll="paper" style={{zIndex:9999, overflowY:"visible",position:"absolute"}} fullWidth>
                        <Paper>
                            <DialogTitle >
                            Report
                            </DialogTitle> 
                            <DialogContent>
                                
                                <FormLabel error={this.state.optionEmpty}>What's the problem?</FormLabel>    
                                <Select 
                                    options={options} 
                                    sx={{zIndex:99999}}
                                    onChange={this.handleOption}
                                    //ref
                                    menuPortalTarget={document.body} 
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                                <FormHelperText error={this.state.optionEmpty}>{this.state.helperText}</FormHelperText>

                            </DialogContent>
                            <DialogActions>
                                
                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={this.handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="contained" endIcon={<PublishIcon />} onClick={this.handleReport}>
                                    Publish
                                </Button>
                            </DialogActions>
                        </Paper>
                    </Dialog> </>
                    }
                    title={data[i].userid}
                    subheader={postTime}
                    
                />
    
                <CardContent sx={{p:0, px:2, py:0}}>
                    <CardMedia
                        component="img"
                        height="auto"
                        image={data[i].image.indexOf("http")==-1?"http://localhost:7000/dbComment/photo/get/"+data[i].image:data[i].image}
                        sx={{mb:2, borderRadius: 2 }}
                    />
                    <Typography variant="h5" component="div" sx={{mb:1}}>
                        {data[i].title}
                    </Typography>
                    <Typography variant="p" component="div">
                        {data[i].description}
                    </Typography>
                    <Typography component="div" >
                        <Rating name="read-only-rating" hidden={data[i].rating==-1} value={data[i].rating} readOnly />
                    </Typography>
                

                </CardContent>
                
                <CardActions>
                    <IconButton aria-label="add to favorites">
                        <ThumbUpIcon />
                    </IconButton>
                    <IconButton aria-label="share" onClick={this.handleShare}>
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
                
           

        );
     }
}

const canteenList=["SeeYou@Shaw","Joyful Inn","Now &,"]
const canteenID=["SC","UC","NA"]

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [canteen, setCanteen]=React.useState("SC")
    const [state, setState] = React.useState(false);

    
    const toggleDrawer = (open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setState(open);
    };

    const handleClick=(e)=>{

        let canteenChoice=e.currentTarget.getAttribute('value');
        //console.log(canteenChoice);
        fetch('http://localhost:7000/dbComment/get/'+canteenChoice)
        .then(res=>res.json())
        .then(db=>{
            data=db;
            console.log(data);
            //console.log("send to " +canteenChoice);
            setCanteen(canteenChoice)
        })
        
    }
  
    const drawer = (
      <div>
        <Toolbar />
        <Divider />
        <List>
        {canteenList.map((data, index) => 
        (
            <ListItem >
                <ListItemButton onClick={handleClick} value={canteenID[index]} selected={canteen==canteenID[index]}>
                    <ListItemText>
                        {canteenList[index]}
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        ))}
        </List>
        
     
       
      </div>
    );
    const appBar= (
        <div>
            <Toolbar>
                <IconButton onClick={toggleDrawer(true)} color="inherit" aria-label="open drawer">
                    <StorefrontIcon />
                </IconButton>
                
                <Box sx={{ flexGrow: 1 }} />
               
            </Toolbar>
        </div>
    );
  
    
    const drawerWidth=200;
    return ( 
        <Container>
        <Box sx={{ display: 'flex' }}>        
            <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },p:0 }}            
            >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <AppBar 
                position="fixed" 
                color="primary" 
                sx={{ 
                    top: 'auto', 
                    bottom: 0,
                    display:{xs:'block', sm:'none'},
                    backgroundColor:"#5D4E99"

                }}>
                {appBar}
            </AppBar>
            
            <Drawer
                variant="permanent"
                sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,left:"unset" },
                left:"unset",
                zIndex:0,
                }}
                open      
            >
                {drawer}
            </Drawer>

            <SwipeableDrawer
                anchor='left'
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{
                    zIndex:10000
                }}
            >
                {drawer}
            </SwipeableDrawer>

            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, maxWidth: { sm: "750px" } ,padding:0,paddingBottom:5 }}
            >
                <TabPanel canteen={canteen}/>
            </Box>
        </Box>
        </Container>
      
       
       
    );
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
    const [helperTextDEmpty, setHelperTextDEmpty]=React.useState("");
    const [canteen, setCanteen]=React.useState("");
    const [selectedFile, setSelectedFile]=React.useState("");
    const [canteenEmpty, setCanteenEmpty]=React.useState(false);
    const [fileEmpty, setFileEmpty]=React.useState(true);
    const [ratingEmpty, setRatingEmpty]=React.useState(false);
    const [newFileName, setNewFileName]=React.useState("");
    const [rating, setRating]=React.useState(-1);
    const handleClick=()=>{
        setOpen(true);
        
    }
    const handlePublish=(e)=>{
        if(titleEmpty==true||descEmpty==true||type==-1||(type==1)&&(rating==-1)){
            if(type==-1){
                setLocationEmpty(true);
                setHelperTextCEmpty("Please choose an option");
            }else if(type==1){
                if(rating==-1){
                    setRatingEmpty(true);
                    setHelperTextDEmpty("Please give rating")
                }
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
                    "type":type,
                    "rating": rating
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
    const handleRating=(event,newValue)=>{
        setRating(newValue);
        if(newValue==-1){
            setRatingEmpty(true);
            setHelperTextDEmpty("Please give a rating")
        }else{
            setRatingEmpty(false);
            setHelperTextDEmpty("")
        }
    }
    const options = [
        { value: 'SC', label: 'SeeYou@Shaw' },
        { value: 'UC', label: 'Joyful Inn' },
        { value: 'NA', label: 'Now &,' }
      ]
      
    return(
        <div>
            <Fab color="secondary" sx={{position: 'fixed', bottom: 32 ,right:32,zIndex:10000}} onClick={handleClick}>
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

                    <FormLabel error={locationEmpty} hidden={type!=1}>Rating</FormLabel>
                    <br hidden={type!=1}/>
                    <Rating
                        name="canteen-rating"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                        hidden={type!=1}
                    />
                    <FormHelperText error={ratingEmpty} hidden={type!=1}>{helperTextDEmpty}</FormHelperText>
             
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




function Comment(){
    const [loadFinish, setLoadFinish]=useState();
    useEffect(()=>{
        fetch('http://localhost:7000/dbComment/get/'+"SC")
        .then(res=>res.json())
        .then(db=>{
            data=db;
            console.log(data);
            setLoadFinish(true)
        })
    })
    if(loadFinish==false){
        return<>please wait</>
    }
    return(
        <>
            <ResponsiveDrawer />
            <AddComment />
        </>
    )
}

function ContentPreview(){
    const [target,setTarget]=useState();
    let param=useParams();
    useEffect(()=>{
        fetch('http://localhost:7000/dbComment/get/'+param.canteen)
        .then(res=>res.json())
        .then(db=>{
            data=db;
            let target;
            for (let x in data){
                if(data[x]._id==param.id){
                    setTarget(x);
                    break;
                }
            }
            console.log(target);
            
        })
    })
    if(target==undefined){
        return<>please wait</>
    }
    

    return(
        <Container maxWidth="sm" >
            <TabContent key={target} i={target} canteen={param.canteen}/>
        </Container> 
    );
  

}

export {Comment,ContentPreview};