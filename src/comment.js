import React, { useState, useEffect }  from 'react';
import Select from 'react-select';
import { 
    Alert, Box, Tab, Tabs, Container, Card, CardMedia, CardActions, CardContent,CardHeader,Checkbox,Dialog,
    DialogTitle,Paper,Fab,Rating, Avatar,Button, Typography,TextField,Drawer,Toolbar,Divider,FormHelperText,
    List,ListItem,ListItemAvatar,ListItemText,ListItemButton,SwipeableDrawer,IconButton,DialogContent,
    DialogActions, Tooltip,Input,FormLabel,RadioGroup,FormControlLabel,Radio,Grid,Skeleton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {useParams,useNavigate, useLocation} from 'react-router-dom'
import StorefrontIcon from '@mui/icons-material/Storefront';
import FlagIcon from '@mui/icons-material/Flag';
import ClearIcon from '@mui/icons-material/Clear';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';


let data =[];
let users=[];

/*
    PROGRAM TabContent - Program to read the value and display the respective content
    PROGRAMMER: PAU Chun Wai
    CALLING SEQUENCE:   CALL TabContent(index, canteen, userIndex)
        Where 'index' is the key for identity the TabContent program, 
        'canteen' is the canteen where the comment is posted,
        'userIndex' is the userid of the comment to match the data fetched for displaying userpic, name, etc.
    VERSION 1: written 15-3-2022
    REVISION 1.1: 17-3-2022 to complete the frame
    REVISION 1.2: 19-3-2022 to add interaction button
    REVISION 1.3: 21-3-2022 to remove unused button
    PURPOSE: To show the individual comment in a comment box and allow interaction with user 
    DATA STRUCTURE:
        Variable index - INTEGER
        Variable canteen - STRING
        Variable userIndex - STRING
        Variable open - BOOLEAN
        Variable option - STRING
        Variable optionEmpty - BOOLEAN
        Variable helperText - STRING
    ALGORITHM: 
        Read var index and userIndex to collect the respective user info and comment info and display
        if report button is clicked, 'open' become true and show dialog
        if submit button is clicked, and if 'option' is empty, set 'optionEmpty' true and change 'helperText' otherwise, submit
*/
function TabContent(props){
    const navigate = useNavigate();
    const [open,setOpen]=useState(false);
    const [option,setOption]=useState("");
    const [optionEmpty,setOptionEmpty]=useState(false);
    const [helperText,setHelperText]=useState("");

    const handleShare=()=>{
        navigator.clipboard.writeText("/comment/"+props.canteen+"/"+data[props.i]._id);
    }

    const handleReport=()=>{
        console.log(data[props.i]._id);
        fetch("/dbComment/report", {
            method: 'POST', 
            body: new URLSearchParams({
                "postid":data[props.i]._id,
                "reason": option,
                "canteen": props.canteen
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            
        })
        .then(response => {
            console.log(response)
        })
        .then(() => {
            setOpen(false)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    const handleClose=()=>{
        setOpen(false)
    }
    const handleOption=(option)=>{
        setOption(option.value)
        if(option.value==""){
            setOptionEmpty(true);
            setHelperText("Please choose an option")
        }else{
            setOptionEmpty(false);
            setHelperText("")
        }
    }
    const handleOpenForm=()=>{
        setOpen(true)
    }
    
    const handleDeletePost=()=>{
        
        fetch('/dbComment/delete/comment', {
            body: JSON.stringify({id:[data[i]._id]}),
            headers: {
                "Content-Type": "application/json",
            },
            method:"DELETE"
        })
        .then(response => console.log(response))
        .catch((error) => {
            console.error('Error:', error);
        });
        navigate(0);
        
    }


    const options = [
        { value: 'Sexual content', label: 'Sexual content' },
        { value: 'Violent or repulsive content', label: 'Violent or repulsive content' },
        { value: 'Hateful or abusive content', label: 'Hateful or abusive content' },
        { value: 'Harassment or bullying', label: 'Harassment or bullying' },
        { value: 'Harmful or dangerous acts', label: 'Harmful or dangerous acts' },
        { value: 'Spam or misleading', label: 'Spam or misleading' },
        { value: 'None of these are my issues', label: 'None of these are my issues' }

    ]
    let i=props.i;
    let postTime=data[i].datetime.substring(0,10)+" "+data[i].datetime.substring(11,16);
    return(
        <Card sx={{borderRadius:3, bgcolor:data[i].priority>0?"#fffde7":"#ffffff"}}>
            <CardHeader
                avatar={users[props.userIndex]==null||users[props.userIndex]["pic"]==null?
                    <Avatar />
                :
                    <Avatar src={users[props.userIndex]["pic"].indexOf("http")==-1?"/dbAccount/photo/get/"+users[props.userIndex]["pic"]:users[props.userIndex]["pic"]}/>
                }
                action={<>
                <Tooltip title="Report">
                    <IconButton aria-label="settings" onClick={handleOpenForm} hidden={localStorage.getItem('type') == "guest"||localStorage.getItem('user')==data[i].userid}>
                        <FlagIcon />
                    </IconButton>
                
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton aria-label="settings" onClick={handleDeletePost} hidden={localStorage.getItem('type') == "guest"||localStorage.getItem('user')!=data[i].userid}>
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
                
                <Dialog component={"div"} width="md"height="md" open={open} onClose={handleClose} scroll="paper" style={{zIndex:9999, overflowY:"visible",position:"absolute"}} fullWidth>
                    <Paper>
                        <DialogTitle >
                        Report
                        </DialogTitle> 
                        <DialogContent>
                            
                            <FormLabel error={optionEmpty}>What's the problem?</FormLabel>    
                            <Select 
                                options={options} 
                                sx={{zIndex:99999}}
                                onChange={handleOption}
                                //ref from mui sample
                                menuPortalTarget={document.body} 
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            />
                            <FormHelperText error={optionEmpty}>{helperText}</FormHelperText>

                        </DialogContent>
                        <DialogActions>
                            
                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" endIcon={<PublishIcon />} onClick={handleReport}>
                                Publish
                            </Button>
                        </DialogActions>
                    </Paper>
                </Dialog> </>
                }
                title=
                {<div>
                    {users[props.userIndex]==null?"Deleted User":users[props.userIndex]["user_name"]}
                    <StoreMallDirectoryIcon fontSize="small" color="secondary" sx={{ml:1}} hidden={users[props.userIndex]["type"]!="restaurant"}/>
                </div>}
              
                
                subheader={postTime}
                
            />

            <CardContent sx={{p:0, px:2, py:0}}>
                <CardMedia
                    component="img"
                    height="auto"
                    image={data[i].image.indexOf("http")==-1?"/dbComment/photo/get/"+data[i].image:data[i].image}
                    sx={{mb:2, borderRadius: 2 }}
                    hidden={data[i].image==""}
                />
                <Typography variant="h5" component="div" sx={{mb:1}}>
                    {data[i].title}
                </Typography>
                <Typography variant="p" component="div">
                    {data[i].description}
                </Typography>
                <Typography component="div" >
                    <Rating name="read-only-rating" hidden={data[i].rating==null} value={data[i].rating} readOnly />
                </Typography>
            

            </CardContent>
            
            <CardActions>
                <Tooltip title="Share">
                    <IconButton aria-label="share" onClick={handleShare}>
                        <ShareIcon />
                    </IconButton>
                </Tooltip>
                
            </CardActions>
        </Card>
            
        

    );
 
}
let canteenInfo=[];
const canteenList=[];
const canteenID=[];
const drawerWidth=240;


/*
    PROGRAM ResponsiveDrawer - Program to read the option and display it
    PROGRAMMER: PAU Chun Wai
    CALLING SEQUENCE:   CALL ResponsiveDrawer()
    VERSION 1: written 15-3-2022
    REVISION 1.1: 17-3-2022 to complete the frame
    REVISION 1.2: 19-3-2022 to improve algorithm
    PURPOSE: To show the drawer with the canteen option available in database
    DATA STRUCTURE:
        Variable canteen - STRING
        variable state - BOOLEAN
        Variable value - INTEGER
        Variable loading - BOOLEAN
    ALGORITHM: 
        if 'loading' false, render finish and display the drawer
        if 'canteen' is changed, fetch comment in other canteen
        if 'value' is changed, show the comment area section
        if 'state' is true, the responsive version drawer will be shown
*/
function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [canteen, setCanteen]=React.useState("NA")
    const [state, setState] = React.useState(false);
    const [value,setValue]=React.useState(-1);
    const [loading,setLoading]=React.useState(true)
    useEffect(()=>{
        Promise.all([
            fetch("/dbAccount/getAll/")
            .then(res=>res.json())
            .then(db=>{
                users=db;
                console.log(users);
            })
        ]).then(()=>{setLoading(false)});
    }, [])
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
    const handleChange=(event,newValue)=>{  
        setValue(newValue)
    };
    const handleClick=(e)=>{

        let canteenChoice=e.currentTarget.getAttribute('value');
        //console.log(canteenChoice);
        
        Promise.all([
            fetch("/dbAccount/getAll/")
            .then(res=>res.json())
            .then(db=>{
                users=db;
                console.log(users);
            }),
            fetch("/dbComment/get/"+canteenChoice)
            .then(res=>res.json())
            .then(db=>{
                data=db;
                console.log(data);
                //console.log("send to " +canteenChoice);
                setCanteen(canteenChoice)
            })
        ]).then(()=>{
            setCanteen(canteenChoice)
        });
    }

  
    const drawer = (
      <div>
        <Toolbar />
        <Divider />
        <List>
            
            {loading==true?
                <>
                    <ListItem>
                        <Skeleton variant="rectangular" width={210} height={50} />
                    </ListItem>
                    <ListItem>
                        <Skeleton variant="rectangular" width={210} height={50} />
                    </ListItem>
                    <ListItem>
                        <Skeleton variant="rectangular" width={210} height={50} />
                    </ListItem>
                    <ListItem>
                        <Skeleton variant="rectangular" width={210} height={50} />
                    </ListItem>
                    <ListItem>
                        <Skeleton variant="rectangular" width={210} height={50} />
                    </ListItem>
                    
                </>:
                canteenList.map((data, index) => 
                (
                    <ListItem key={index}>
                        <ListItemButton onClick={handleClick} value={canteenID[index]} selected={canteen==canteenID[index]}>
                            <ListItemAvatar>
                                <Avatar
                                    src={canteenInfo[index]["avater"]}
                                />
                            </ListItemAvatar>
                            <ListItemText>
                                {canteenList[index]}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))
            }
            
        </List>
        
     
       
      </div>
    );
    console.log(data);
    console.log(users);
    return ( 
        <Container >
        <Box sx={{ display: 'flex' }}>        
            <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },p:0 }}            
            >          
            <Fab 
                color="secondary" 
                sx={{
                    position: 'fixed', 
                    bottom: 32 ,
                    left:32,
                    zIndex:10000,
                    display:{xs:'block', sm:'none'},
                }} 
                onClick={toggleDrawer(true)}>
                <StorefrontIcon />
  
            </Fab>
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
                <Container maxWidth="sm"  >  
                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange}>
                            <Typography variant="h5" sx={{lineHeight:2, marginRight:"10px"}}>
                                {canteenList[canteenID.indexOf(canteen)]}
                            </Typography>
                            <Tab label="All" value={-1}/> 
                            <Tab label="Chit-Chat" value={0} />
                            <Tab label="Rating" value={1}/>
                        </Tabs>
                    </Box>
                    
                   
                    {loading==true?
                        
                        <>
                            <div role="tabpanel" style={{marginTop:"1rem"}} >
                                <Skeleton variant="rectangular" width={540} height={300}/>
                            </div>
                            <div role="tabpanel" style={{marginTop:"1rem"}} >
                                <Skeleton variant="rectangular" width={540} height={300}/>
                            </div>
                            <div role="tabpanel" style={{marginTop:"1rem"}} >
                                <Skeleton variant="rectangular" width={540} height={300}/>
                            </div>
                            <div role="tabpanel" style={{marginTop:"1rem"}} >
                                <Skeleton variant="rectangular" width={540} height={300}/>
                            </div>
                            <div role="tabpanel" style={{marginTop:"1rem"}} >
                                <Skeleton variant="rectangular" width={540} height={300}/>
                            </div>
                        </>
   
                    :data.map((file,i)=>
                        <div role="tabpanel" style={{marginTop:"1rem"}} key={i}>
                            {(value==data[i].type || value=="-1") &&(
                                <TabContent  i={i} canteen={canteen} userIndex={users.findIndex(user=>user.uid==data[i].userid) }/>
                            )}
                            
                        </div>
                    
                    )}

                </Container>
                
        
           
            </Box>
        </Box>
        </Container>
    );
}
/*
    PROGRAM AddComment - Program to send comment data to database
    PROGRAMMER: PAU Chun Wai
    CALLING SEQUENCE:   CALL AddComment()
    VERSION 1: written 15-3-2022
    REVISION 1.1: 19-3-2022 to complete the frame
    REVISION 1.2: 21-3-2022 to add api support
    REVISION 1.3: 23-3-2022 to add new field
    PURPOSE: To send the filled comment to database
    DATA STRUCTURE:
        Variable open - BOOLEAN
        Variable title - STRING
        Variable description - STRING
        Variable type - INTEGER
        Variable state - BOOLEAN
        Variable XXXEmpty - BOOLEAN
        Variable canteen - STRING
        Variable selectedFile - STRING
        Variable newFileName - STRING
        Variable rating - INTEGER
    ALGORITHM: 
        if 'open' is true the addComment dialog show up,
        if file is uploaded, save to 'selectedFile' and send the file name to newFileName
        if 'title', 'description', 'type', 'canteen', 'rating', 'selectedFile'(optional) is filled,
        send to database, otherwise show helperTextX.
        if comment is sent, set 'open' to false for closing the dialog
*/
function AddComment(){
    const navigate=useNavigate();
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
    const [rating, setRating]=React.useState(null);
    const handleClick=()=>{
        setOpen(true);
    }
    let location = useLocation();
    const handlePublish=(e)=>{
        if(titleEmpty==true||descEmpty==true||type==-1||(type==1)&&(rating==null)){
            if(type==-1){
                setLocationEmpty(true);
                setHelperTextCEmpty("Please choose an option");
            }else if(type==1){
                if(rating==null){
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
            fetch("/dbComment/post/"+canteen, {
                method: 'POST', 
                body: new URLSearchParams({
                    "userid":localStorage.getItem('user'),
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
    
            .catch((error) => {
                console.error('Error:', error);
            });
            navigate(0)
            
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
        fetch("/dbComment/photo/post", {
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
            <Fab color="secondary" sx={{position: 'fixed', bottom: 32 ,right:32,zIndex:10000}} onClick={handleClick} hidden={localStorage.getItem('type') == "admin"||localStorage.getItem('type') == "guest"}>
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
                        <img className="mx-auto d-block" style={{maxWidth:"100%",maxHeight:"100%"}}src= {"/dbComment/photo/get/"+newFileName} />
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



/*
    PROGRAM UserComment - Program to store comment module
    PROGRAMMER: PAU Chun Wai
    CALLING SEQUENCE:   CALL UserComment()
    VERSION 1: written 15-3-2022
    REVISION 1.1: 19-3-2022 to complete the frame
    PURPOSE: To set a frame for calling other module
    DATA STRUCTURE:
        Variable loadFinish - BOOLEAN     
    ALGORITHM: 
        if data fetched, set 'loadFinish' to true and start rendering content
*/
function UserComment(){
    const [loadFinish, setLoadFinish]=useState();
    useEffect(()=>{
        Promise.all([
            fetch("/dbComment/get/"+"NA")
            .then(res=>res.json())
            .then(db=>{
                data=db;
                //console.log(data);
            }),
            fetch("/dbAccount/getAll/")
            .then(res=>res.json())
            .then(db=>{
                users=db;
            }),
            fetch("/dbcanteenInfo/getCanteenInfo")
            .then(res=>res.json())
            .then(db=>{
                canteenInfo=db;
                //console.log(canteenInfo);
                for(let i=0;i<canteenInfo.length;i++){
                    canteenList[i]=canteenInfo[i]["canteen_name"];
                    canteenID[i]=canteenInfo[i]["value"];
                }          
            })
        ]).then(()=>{setLoadFinish(true)});
    }, [])
        
            
        
    return(
        <>
            <ResponsiveDrawer />
            <AddComment />
        </>
    )
}

/*
    PROGRAM UserComment - Program to setup comment frame and fetch info
    PROGRAMMER: PAU Chun Wai
    CALLING SEQUENCE:   CALL UserComment()
    VERSION 1: written 15-3-2022
    REVISION 1.1: 23-3-2022 to complete the frame
    REVISION 1.2: 25-3-2022 to add reported issue
    PURPOSE: To fetch comment
    DATA STRUCTURE:
        Variable canteen - STRING   
    ALGORITHM: 
        if 'canteen' is changed to other canteen name, fetch other canteen's comment,
        else if 'canteen' is changed to 'Report', fetch the reported comment
*/
function AdminCommentDrawer() {
    const navigate=useNavigate();
    const [canteen, setCanteen]=React.useState("Report")

    const handleClick=(e)=>{
        if(e.currentTarget.getAttribute('value')=="Report"){
            navigate(0)
        }else{
            let canteen=e.currentTarget.getAttribute('value');
            //console.log(canteenChoice);
            Promise.all([
                fetch("/dbAccount/getAll/")
                .then(res=>res.json())
                .then(db=>{
                    users=db;
                    console.log(users);
                }),
                fetch("/dbComment/get/"+canteen)
                .then(res=>res.json())
                .then(db=>{
                    data=db;
                    console.log(data); 
                    setCanteen(canteen)
                    //console.log(canteenID);
                    //console.log(canteenList);
                })
            ]).then(()=>{setCanteen(canteen)});
          
        }
        
       
    }
   

    const drawer = (
      <div>
        <Divider />
        <List>
            <ListItem >
                <ListItemButton onClick={handleClick} value="Report" selected={canteen=="Report"}>
                    <ListItemText>
                        Reported issue
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <Divider />
        {canteenList.map((data, index) => 
        (
            <ListItem key={index}>
                <ListItemButton onClick={handleClick} value={canteenID[index]} selected={canteen==canteenID[index]}>
                    <ListItemAvatar>
                        <Avatar
                            src={canteenInfo[index]["avater"]}
                        />
                    </ListItemAvatar>
                    <ListItemText>
                        {canteenList[index]}
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        ))}
        </List>
        
     
       
      </div>
    );
  

    return ( 
        <Container >
        <Box sx={{ display: 'flex' }}>        
            <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },p:0 }}            
            >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          
        
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

            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, maxWidth: { sm: "750px" } ,padding:0,paddingBottom:5 }}
            >
                <CommentList canteen={canteen} />
            </Box>
        </Box>
        </Container>
    );
}
/*
    PROGRAM CommentList - Program to show comment box in AdminCommentDrawer
    PROGRAMMER: PAU Chun Wai
    CALLING SEQUENCE:   CALL CommentList()
    VERSION 1: written 15-3-2022
    REVISION 1.1: 23-3-2022 to complete the frame
    REVISION 1.2: 25-3-2022 to add reported issue
    PURPOSE: To show the comment with admin actions
    DATA STRUCTURE:
        ARRAY checked - INTEGER
    ALGORITHM: 
        if the comment is ticked, push value to 'checked' for deleting, ignoring comment
*/
function CommentList(props){
    const navigate=useNavigate(0)
    const [checked, setChecked] = React.useState([]);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };
    const removeComment=()=>{
        fetch("/dbComment/delete/comment", {
            body: JSON.stringify({id:checked}),
            headers: {
                "Content-Type": "application/json",
            },
            method:"DELETE"
        })
        .then(response => console.log(response))
        .catch((error) => {
            console.error('Error:', error);
        });
        navigate(0);
    }
    const ignoreReport=()=>{
        fetch("/dbComment/delete/report/", {
            body: JSON.stringify({id:checked}),
            headers: {
                "Content-Type": "application/json",
            },
            method:"DELETE"
        })
        .then(response => console.log(response))
        .catch((error) => {
            console.error('Error:', error);
        });
        navigate(0);
    }
    const clearSelected=()=>{
        setChecked([]);
    }
   
    return(
        <>
            <Box sx={{mt:2}}>                
                <Button 
                    disabled={checked.length==0||props.canteen!="Report"?true:false} 
                    variant="contained" 
                    sx={{ml:2}} 
                    onClick={ignoreReport}
                    color="success"
                >
                    Ignore
                </Button>
                <Button 
                    disabled={checked.length==0?true:false} 
                    variant="contained" 
                    sx={{ml:2}} 
                    onClick={removeComment}
                    color="error"
                >
                    Remove
                </Button>
                <Button 
                    disabled={checked.length==0?true:false} 
                    variant="contained" 
                    sx={{ml:2}} 
                    onClick={clearSelected}
                >
                    Reset
                </Button>
                <Alert severity="info" hidden={checked.length==0?true:false} sx={{mx:2, my:2}}>
                    You have selected {checked.length} comment(s).
                </Alert>
            </Box>
            
            <List>
                {data.map((file,i)=>
                <div key={i} >
                    <Alert severity="error" sx={{m:2, mb:0}} hidden={props.canteen!="Report"}>Reported @{data[i].canteen}: {data[i].reason}</Alert>
                    <Card sx={{ display: 'flex', m:2, mt:0}}>
                        <ListItem
                            secondaryAction={
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(data[i]._id)}
                                checked={checked.indexOf(data[i]._id) !== -1}
                                sx={{
                                    mr:1
                                }}
                            />
                            }
                            disablePadding
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                                <CardMedia
                                    component="img"
                                
                                    sx={{
                                        heigth:"30vh",
                                        width: "30vh",
                                        m:2,
                                        borderRadius: 2 
                                    }}
                                    image={data[i].image.indexOf("http")==-1?"/dbComment/photo/get/"+data[i].image:data[i].image}
                                    hidden={data[i].image==""}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardHeader
                                subheader={data[i].datetime.substring(0,10)+" "+data[i].datetime.substring(11,16)}
                       
                            />         
                                <CardContent >
                                    <Typography variant="h5" component="div" >
                                        {data[i].title}
                                    </Typography>
                                    <Typography variant="p" component="div">
                                        {data[i].description}
                                    </Typography>
                                    <Typography component="div" >
                                        <Rating name="read-only-rating" hidden={data[i].rating==null} value={data[i].rating} readOnly />
                                    </Typography>
                            
                                </CardContent>
                                
                            </Box>
                    
                        </ListItem>  
                    </Card>              
                </div>
                )}
            </List>
        </>
        
    );
}

/*
    PROGRAM ContentPreview - Program to show comment
    PROGRAMMER: PAU Chun Wai
    CALLING SEQUENCE:   CALL ContentPreview()
    VERSION 1: written 15-3-2022
    PURPOSE: To show the comment from url
    DATA STRUCTURE:
        VARIABLE target - INTEGER
        VARIABLE loadFinsih - BOOLEAN
    ALGORITHM: 
        if 'loadFinish' is true, start rendering content
        if 'target' is -1, comment not found, else comment index is found and display the correspond commend
*/
function ContentPreview(){
    const [target, setTarget]=useState(-1)
    const [loadFinish, setLoadFinish]=useState(false)
    let param=useParams();
    useEffect(()=>{
        fetch("/dbAccount/getAll/")
        .then(res=>res.json())
        .then(db=>{
            users=db;
            console.log(users);
        }).then(
            fetch("/dbComment/get/"+param.canteen)
            .then(res=>res.json())
            .then(db=>{
                data=db;
                for (let x in data){
                    if(data[x]._id==param.id){      
                        setTarget(x);
                        console.log(target)
                        break;
                    }
                }
                setTimeout(()=>{
                    setLoadFinish(true);
                },2000)            
            })
        )
        
    })
    if(loadFinish==false){
        return<>please wait</>
    }
    console.log(data)
    console.log(users);
    if(target!=-1)return(
        <Container maxWidth="sm" >
            <TabContent i={target} canteen={param.canteen} userIndex={users.findIndex(user=>user.uid==data[target].userid)}/>
        </Container> 
    )
    else return(<>not found</>)

}
/*
    PROGRAM AdminComment - Program to fetch comment info
    PROGRAMMER: PAU Chun Wai
    CALLING SEQUENCE:   CALL AdminComment()
    VERSION 1: written 15-3-2022
    PURPOSE: To fetch comment info and call other function
    DATA STRUCTURE:
        VARIABLE loadFinish - BOOLEAN
    ALGORITHM: 
        if 'loadFinish' is true, start rendering content
*/
function AdminComment(){
    const [loadFinish, setLoadFinish]=React.useState(false);
    useEffect(()=>{
        Promise.all([
            fetch("/dbComment/get/Report")
            .then(res=>res.json())
            .then(db=>{
                data=db;
                console.log(data);
            }),
            fetch("/dbcanteenInfo/getCanteenInfo")
            .then(res=>res.json())
            .then(db=>{
                canteenInfo=db;
                console.log(canteenInfo);
                for(let i=0;i<canteenInfo.length;i++){
                    canteenList[i]=canteenInfo[i]["canteen_name"];
                    canteenID[i]=canteenInfo[i]["value"];
                }
            })
        ]).then(()=>{setLoadFinish(true)});
    }, [])
   

    if(loadFinish==false){
        return<>please wait (parent)</>
    }
    return(
        <AdminCommentDrawer />
    );
}

export {UserComment, AdminComment, ContentPreview};