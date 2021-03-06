import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton, FormControlLabel, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Button, Card, Menu, MenuItem, Checkbox } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit',day: '2-digit' ,hour: '2-digit', minute: '2-digit'}
    return new Intl.DateTimeFormat('en-US', options).format(dateString);
}


/*
    PROGRAM Receipt - Program to display the respective content
    PROGRAMMER: LAM Yan Yu
    CALLING SEQUENCE:   CALL Receipt()
    VERSION 1: written 6-4-2022
    REVISION 1.1: 8-4-2022 to add fetch function
    REVISION 1.2: 9-4-2022 to add point system
    REVISION 1.3: 12-4-2022 to add receipt status
    PURPOSE: To show the individual receipt and display differently corresponding to user and receipt status 
    DATA STRUCTURE:
        Variable name - STRING
        Variable phone - STRING
        Variable receiptID - STRING
        Variable res - STRING
        Variable orderItem - STRING
        Variable point - INTEGER
        Variable discount - FLOAT
        Variable subtotal - FLOAT
        Variable timestamp - TIME
        Variable total - FLOAT
        Variable pointEarn - INTEGER
        Variable pointRemain - INTEGER
        Variable address - STRING
        Variable cutlery - BOOLEAN
        Variable status - INTEGER
        Variable type - STRING
        Variable fetchFinish - BOOLEAN
        Variable irid - STRING
    ALGORITHM: 
        if 'user' is canteen, hide the details of point system.
        if 'status' is complete, delete personal information; show reorder button if 'user' is user
        show different status button according to current status
    */
function Receipt() {
    const {user, setUser} = React.useContext(UserContext);
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [receiptID, setReceiptID] = React.useState('');
    const [res, setRestaurant] = React.useState('');
    const [orderItem, setOrderItem] = React.useState(null);
    const [point, setPoint] = React.useState(0);
    const [discount, setDiscount] = React.useState(0);
    const [subtotal, setSubtotal] = React.useState(0);
    const [timestamp, setTime] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [pointEarn, setEarn] = React.useState(0);
    const [pointRemain, setRemain] = React.useState(0);
    const [address, setAddress] = React.useState(null);
    const [cutlery, setCutlery] = React.useState(true);
    const [status, setStatus] = React.useState(false);
    const [type, setType] = React.useState('user');
    const [fetchFinish, setFetch] = React.useState(false);
    const navigate = useNavigate();
    const irid = window.location.pathname.replace('/receipt/','');
    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit'}
        return new Intl.DateTimeFormat('en-US', options).format(dateString);
    }

    const handleTaken = () => {
        fetch('/dbReceipt/updateStatus/'+irid, {
            method: 'POST', 
            body: new URLSearchParams({
                "rid": irid,
            })  
        })
        .then(()=>{setStatus(2);})
        .catch((error)=>{console.log(error);})
        window.location.reload();
    };

    const handleDeliver = () => {
        fetch('/dbReceipt/updateDeliver/'+irid, {
            method: 'POST', 
            body: new URLSearchParams({
                "rid": irid,
            })  
        })
        .then(()=>{setStatus(1);})
        .catch((error)=>{console.log(error);})
        window.location.reload();
    };

    
    const handleReorder = () => {
        localStorage.setItem('cart', JSON.stringify(orderItem));
        localStorage.setItem('cartCanteen', res);
        window.location.href = '/ShoppingCart/';
    }

    const handleCutlery = () => {
        if (cutlery === 'true') {
            return (
                <Grid container sx ={{color: '#707070'}}>
                    <Grid item xs={1} sx={{color: '#5D4E99'}}><b>{cutleryNo}</b></Grid>
                    <Grid item xs={9}>x &nbsp;Cutlery</Grid>
                    <Grid item xs={1} sx={{textAlign:'right'}}>$</Grid>
                    <Grid item xs={1} sx={{textAlign:'right'}}>0.0</Grid>
                </Grid>
            )
        }
    }

    const showButton = () =>{
        if ((type == 'restaurant' && status == 1) || type == 'user')
        return(
            <Button fullWidth
                size="large" 
                onDoubleClick={handleTaken}
                sx={{border: 2,bgcolor: '#transparent', color: '#5D4E99', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
            >
                Double click to confirm order delivered
            </Button>
        )
        else if (type == 'restaurant' && status == 0)
        return(
            <Button fullWidth
                size="large" 
                onDoubleClick={handleDeliver}
                sx={{':hover':{border: 2,bgcolor: '#transparent', color: '#5D4E99'}, borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}
            >
                Double click to confirm order prepared
            </Button>
        )
    }

    React.useEffect(()=>{
        fetch("/dbReceipt/get/"+irid)
        .then(res=>res.json())
        .then(data=>{
            setReceiptID(data[0].id);
            setRestaurant(data[0].rName);
            setName(data[0].name);
            setPhone(data[0].phone);
            setAddress(data[0].address);
            setCutlery(data[0].cutlery)
            setOrderItem(JSON.parse(data[0].item));
            setSubtotal(data[0].subtotal);
            setDiscount(data[0].discount);
            setPoint(data[0].point);
            setEarn(data[0].pointEarn);
            setRemain(data[0].pointRemain)
            setTotal(data[0].total);
            setStatus(data[0].status);
            setTime(data[0].timestamp);
            setFetch(true);
            setType(localStorage.getItem('type'));
        })
        .then(console.log("Successfully get to receipt info"))
        .catch(err=>{console.log(err);})
    },[fetchFinish])

    let cutleryNo = 0;
    if (fetchFinish) {
    if (status != 2) {
    return (
        <>
        <div style={{width:'80%', margin:'auto', display: type=='user'? 'block':'none'}}>
            <Button 
              size="small" 
              href="/menu"
              sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'#5D4E99', color: '#F4CB86'}}}
            >
            <ArrowBackIosIcon/>Continue Shopping
            </Button>
        </div>
        <div style={{width:'80%', margin:'auto', display: type=='user'? 'none':'block'}}>
                <Button 
                    size="small" 
                    onClick={()=>navigate(-1)}
                    sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'transparent', color: '#5D4E99'}}}
                >
                <ArrowBackIosIcon/>
                </Button>
            </div>
        <br/>
        <h3 style={{color: '#5D4E99'}}>Receipt <span style={{color: '#FFC107'}}>{receiptID}</span></h3><br/>
        <div style={{textAlign: 'center'}}>
            <h5 style={{color: '#5D4E99', display: type=='user'? 'block':'none'}}><b>{status? "Order delivering...":"Order preparing..."}</b></h5>
            <h5 style={{color: '#5D4E99'}}>Expected arrival time: {formatTime(timestamp+900000)} - {formatTime(timestamp+1800000)}</h5><br/>
            <h5 style={{color: '#5D4E99'}}>Name: {name}&nbsp;&nbsp;&nbsp;Tel: {phone}</h5>
            <h5 style={{color: '#5D4E99'}}>Address: {address}</h5>
        </div>
         
        <Table style={{width:'80%', margin:'auto', maxWidth:650}} aria-label="spanning table" padding='normal'>
            <br/><Divider /><br/> 
            <Grid container sx ={{color: '#707070'}}>
                    <Grid item xs={6} sx={{color: '#5D4E99'}}>Order from <b>{res}</b></Grid>
                    <Grid item xs={6} sx={{textAlign:'right'}}>{formatDate(timestamp)}</Grid>
            </Grid><br/>
            {orderItem.map((item) => (
                cutleryNo += item.amount,
                <>
                <Grid container sx ={{color: '#707070'}}>
                    <Grid item xs={1} sx={{color: '#5D4E99'}}><b>{item.amount}</b></Grid>
                    <Grid item xs={9}>x &nbsp;{item.title}</Grid>
                    <Grid item xs={1} sx={{textAlign:'right'}}>$</Grid>
                    <Grid item xs={1} sx={{textAlign:'right'}}>{(item.amount * item.price).toFixed(1)}</Grid>
                </Grid>
                <Grid container sx ={{color: '#707070'}}>
                    <Grid item xs={1} />
                    <Grid item xs={11}><pre>   - {item.variant}</pre></Grid>
                </Grid>
                </>
            ))}
            {handleCutlery()}<br/>
            <Grid container>
                <Grid item xs={10} sx ={{color: '#5D4E99'}}><b>Subtotal</b></Grid>
                <Grid item xs={2} sx ={{textAlign:'right', color: '#5D4E99'}}><b>${subtotal.toFixed(1)}</b></Grid>
            </Grid>
            <br/><Divider /><br/>  
            <div style={{display: type=='user'? 'block':'none'}}>      
                <Grid container>
                    <Grid item xs={9}>Valid points</Grid>
                    <Grid item xs={3} style ={{textAlign:'right', color:'#707070'}}><small>{point} point(s)</small></Grid>
                </Grid><br/>
                <div style={{display: discount==0? 'none':'block'}}>
                    <Grid container>
                        <Grid item xs={6}>Point used</Grid>
                        <Grid item xs={6} style ={{textAlign:'right', color: '#707070'}}><small>- {discount*10} point(s)</small></Grid>
                    </Grid><br/>
                </div>
                <Grid container>
                    <Grid item xs={9}>Points rebate</Grid>
                    <Grid item xs={3} style ={{textAlign:'right', color:'#707070'}}><small>+ {pointEarn} point(s)</small></Grid>
                </Grid><br/>
                <Grid container>
                    <Grid item xs={9} style ={{color:'#5D4E99'}}><b>Remaining points</b></Grid>
                    <Grid item xs={3} style ={{textAlign:'right', color:'#5D4E99'}}><b>{pointRemain} point(s)</b></Grid>
                </Grid>
                <br/><Divider /><br/>  
            </div>  
            <Grid container>
                <Grid item xs={10}>Subtotal</Grid>
                <Grid item xs={2} sx ={{textAlign:'right', color: '#707070'}}><small>${subtotal.toFixed(1)}</small></Grid>
            </Grid><br/>  
            <Grid container>
                <Grid item xs={10}>Discount</Grid>
                <Grid item xs={2} sx ={{textAlign:'right', color: '#707070'}}><small>- ${discount.toFixed(1)}</small></Grid>
            </Grid><br/>  
            <Grid container sx ={{color:'#5D4E99'}}>
                <Grid item xs={10}> <b>Total</b></Grid>
                <Grid item xs={2} sx={{textAlign:'right'}}> <b>${(total).toFixed(1)}</b></Grid>
            </Grid><br/><br/>
            {showButton()}
            <></>
            <br/><br/>
        </Table>
        </>
    );} else {
        return (
            <>
            <div style={{width:'80%', margin:'auto'}}>
                <Button 
                    size="small" 
                    onClick={()=>navigate(-1)}
                    sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'transparent', color: '#5D4E99'}}}
                >
                <ArrowBackIosIcon/>
                </Button>
            </div>
            <h3 style={{color: '#5D4E99'}}>Order from <span style={{color: '#FFC107'}}>{res}</span></h3>
            <div style={{color: '#707070', textAlign: 'center'}}>{formatDate(timestamp)}</div>
            <Table style={{width:'80%', margin:'auto', maxWidth:650}} aria-label="spanning table" padding='normal'>
                <br/><Divider /><br/> 
                {orderItem.map((item) => (
                    cutleryNo += item.amount,
                    <>
                    <Grid container sx ={{color: '#707070'}}>
                        <Grid item xs={1} sx={{color: '#5D4E99'}}><b>{item.amount}</b></Grid>
                        <Grid item xs={9}>x &nbsp;{item.title}</Grid>
                        <Grid item xs={1} sx={{textAlign:'right'}}>$</Grid>
                        <Grid item xs={1} sx={{textAlign:'right'}}>{(item.amount * item.price).toFixed(1)}</Grid>
                    </Grid>
                    <Grid container sx ={{color: '#707070'}}>
                        <Grid item xs={1} />
                        <Grid item xs={11}><pre>   - {item.variant}</pre></Grid>
                    </Grid>
                    </>
                ))}
                {handleCutlery()}<br/>
                <Grid container>
                    <Grid item xs={10} sx ={{color: '#5D4E99'}}><b>Subtotal</b></Grid>
                    <Grid item xs={2} sx ={{textAlign:'right', color: '#5D4E99'}}><b>${subtotal.toFixed(1)}</b></Grid>
                </Grid>
                <br/><Divider /><br/> 
                <div style={{display: type=='user'? 'block':'none'}}>        
                    <Grid container>
                        <Grid item xs={9}>Valid points</Grid>
                        <Grid item xs={3} style ={{textAlign:'right', color:'#707070'}}><small>{point} point(s)</small></Grid>
                    </Grid><br/>
                    <div style={{display: discount==0? 'none':'block'}}>
                        <Grid container>
                            <Grid item xs={6}>Point used</Grid>
                            <Grid item xs={6} style ={{textAlign:'right', color: '#707070'}}><small>- {discount*10} point(s)</small></Grid>
                        </Grid><br/>
                    </div>
                    <Grid container>
                        <Grid item xs={9}>Points rebate</Grid>
                        <Grid item xs={3} style ={{textAlign:'right', color:'#707070'}}><small>+ {pointEarn} point(s)</small></Grid>
                    </Grid><br/>
                    <Grid container>
                        <Grid item xs={9} style ={{color:'#5D4E99'}}><b>Remaining points</b></Grid>
                        <Grid item xs={3} style ={{textAlign:'right', color:'#5D4E99'}}><b>{pointRemain} point(s)</b></Grid>
                    </Grid>
                    <br/><Divider /><br/>  
                </div> 
                <Grid container>
                    <Grid item xs={10}>Subtotal</Grid>
                    <Grid item xs={2} sx ={{textAlign:'right', color: '#707070'}}><small>${subtotal.toFixed(1)}</small></Grid>
                </Grid><br/>  
                <Grid container>
                    <Grid item xs={10}>Discount</Grid>
                    <Grid item xs={2} sx ={{textAlign:'right', color: '#707070'}}><small>- ${discount.toFixed(1)}</small></Grid>
                </Grid><br/>  
                <Grid container sx ={{color:'#5D4E99'}}>
                    <Grid item xs={10}> <b>Total</b></Grid>
                    <Grid item xs={2} sx={{textAlign:'right'}}> <b>${(total).toFixed(1)}</b></Grid>
                </Grid><br/><br/>
                <div style={{display: type=='user'? 'block':'none'}}>    
                    <Button fullWidth
                        size="large" 
                        onClick={handleReorder}
                        sx={{border: 2,bgcolor: '#transparent', color: '#5D4E99', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
                    >
                        Reorder items
                    </Button>
                </div>
                <br/><br/>
            </Table>
            </>
    )}}
    else return (<p>Loading receipt...</p>)
};

/*
    PROGRAM Records - Program to read the value and display the respective content
    PROGRAMMER: LAM Yan Yu
    CALLING SEQUENCE:   CALL Records()
    VERSION 1: written 9-4-2022
    REVISION 1.1: 11-4-2022 to complete the interface design
    REVISION 1.2: 14-4-2022 to seperate current and past records
    PURPOSE: To show all recipts of specific user and allow clicking in for details 
    DATA STRUCTURE:
        Variable user - STRING
        Variable current - ARRAY 
        Variable past - ARRAY
        Variable fetchFinish - BOOLEAN
    ALGORITHM: 
        Seperate current and past receipt and display them accordingly
        Allow user to click in and show details of specific receipt
    */
function Records() {
    const {user, setUser} = React.useContext(UserContext);
    const [current, setCurrent] = React.useState(null);
    const [past, setPast] = React.useState(null);
    const [fetchFinish, setFetch] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(localStorage.getItem('type') =="user"){
            setUser(localStorage.getItem('user'));
            console.log("set!",user);
        }else if(localStorage.getItem('type')=="admin"){
            setUser(localStorage.getItem('check'))
        }
        fetch('/dbReceipt/getRecords/'+user)
        .then(res=>res.json())
        .then(data=>{
            setCurrent(data[0]);
            setPast(data[1]);
            setFetch(true);
        })
        .catch(err=>{console.log(err);})
    },[fetchFinish])
    
      if(!fetchFinish){
        return(
          <p>Searching records from database...</p>
        )
      } else {
        return(
            <>
            <div style={{width:'80%', margin:'auto'}}>
                <Button 
                    size="small" 
                    onClick={()=>navigate(-1)}
                    sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'transparent', color: '#5D4E99'}}}
                >
                <ArrowBackIosIcon/>
                </Button>
            </div>
            <div style={{width:'60%', margin:'auto'}}>
                <h3 style={{color: '#5D4E99'}}>Shopping Records</h3>
                <div style={{display: (current.length||past.length)? 'none':'block'}}>
                    <br/><br/><h4 style={{textAlign:'center', color: '#707070'}}>No records found</h4>
                </div>
                <div style={{display: (current.length||past.length)? 'block':'none'}}>
                    <h4 style={{color: '#707070'}}><b>Current Order</b></h4>
                    <div style={{display:current.length? 'block':'none'}}>
                        {current.map((receipt)=>(
                            <Card
                                sx={{p:5, m:3, boxShadow: 2, cursor:"pointer"}} 
                                onClick={()=>{window.location.href = '/receipt/' + receipt.rid}}
                            >                            
                                <Grid container >
                                    <Grid item xs={6}>
                                        <h5 style={{color: '#5D4E99'}}><b>{receipt.rName}</b></h5>
                                    </Grid>
                                    <Grid item xs={6} sx={{textAlign:'right', color: 'black'}}>
                                        <small style={{color: '#707070'}}>More detail <span style={{color: '#5D4E99'}}><ArrowForwardIosIcon/></span></small>
                                    </Grid>
                                </Grid><br/>
                                <Grid container >
                                    <Grid item xs={6} sx={{color: '#707070'}}>{formatDate(receipt.timestamp)}</Grid>
                                    <Grid item xs={6} sx={{textAlign:'right', color: 'black'}}>$ {receipt.total.toFixed(1)}</Grid>
                                </Grid>
                            </Card>
                        ))}
                        <br/>
                    </div>
                    <div style={{display:past.length? 'block':'none'}}>
                        <h4 style={{color: '#707070'}}><b>Completed Order</b></h4>
                        {past.map((receipt)=>(
                        <Card
                            sx={{p:5, m:3, boxShadow: 2, cursor:"pointer"}} 
                            onClick={()=>{window.location.href = '/receipt/' + receipt.rid}}
                        >                            
                            <Grid container >
                                <Grid item xs={6}>
                                    <h5 style={{color: '#5D4E99'}}><b>{receipt.rName}</b></h5>
                                </Grid>
                                <Grid item xs={6} sx={{textAlign:'right', color: 'black'}}>
                                    <small style={{color: '#707070'}}>More detail <span style={{color: '#5D4E99'}}><ArrowForwardIosIcon/></span></small>
                                </Grid>
                            </Grid><br/>
                            <Grid container >
                                <Grid item xs={6} sx={{color: '#707070'}}>{formatDate(receipt.timestamp)}</Grid>
                                <Grid item xs={6} sx={{textAlign:'right', color: 'black'}}>$ {receipt.total.toFixed(1)}</Grid>
                            </Grid>
                        </Card>
                        ))}
                    </div>
                </div>
            </div>
            </>
    )}
};


/*
    PROGRAM Dashboard - Program to read the value and display the respective content
    PROGRAMMER: LAM Yan Yu
    CALLING SEQUENCE:   CALL Dashboard()
    VERSION 1: written 12-4-2022
    REVISION 1.1: 13-4-2022 to add filtering function
    PURPOSE: To show all orders of specific canteen and allow filtering and clicking in for details
    DATA STRUCTURE:
        Variable user - STRING
        Variable name - STRING
        Variable records - ARRAY
        Variable fetchFinish - BOOLEAN
        Variable refresh - BOOLEAN
        Variable anchorElFilter - BOOLEAN
        Variable checked - BOOLEAN
        Variable status - STRING
        Variable color - STRING
    ALGORITHM: 
        Show overall information of all orders in the order of newest to oldest
        Allow filtering according the receipt status
        Allow canteen clicking in for showing details of receipt
        if 'refresh' is true, fetch all receipts again
    */
function Dashboard() {
    const {user, setUser} = React.useContext(UserContext);
    const [name, setName] = React.useState(null);
    const [records, setRecord] = React.useState(null);
    const [fetchFinish, setFetch] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [anchorElFilter, setAnchorElFilter] = React.useState(false);
    const [checked, setChecked] = React.useState([true, true, true]);
    const navigate = useNavigate();
    const status = ['Preparing', 'Delivering', 'Complete'];
    const color = ['#f44336', '#43a047', '#707070'];
    const handlePrepare = (event) => {
        setChecked([event.target.checked, checked[1], checked[2]]);
    };
    const handleDeliver = (event) => {
        setChecked([checked[0], event.target.checked, checked[2]]);
    };
    const handleComplete = (event) => {
        setChecked([checked[0], checked[1], event.target.checked]);
    };
    const handleOpenFilter = (event) => {
        setAnchorElFilter(event.currentTarget);

    };
    const handleCloseFilter = () => {
        setAnchorElFilter(false);
    };
    const fetchReceipt = () => {
        fetch('/dbReceipt/getDashboard/'+name)
        .then(res=>res.json())
        .then(data=>{
            setRecord(data);
            setFetch(true);
        })
        .catch(err=>{console.log(err);})
    }
    React.useEffect(()=>{fetchReceipt();},[refresh])
    React.useEffect(()=>{
        if(localStorage.getItem('user') != ""){
            setUser(localStorage.getItem('user'));
            setName(localStorage.getItem('name'));
            console.log("set!",user);
        }
        fetchReceipt();
    },[fetchFinish])
    
      if(!fetchFinish){
        return(
          <p>Searching records from database...</p>
        )
      } else {
        return(
            <>
            <div style={{width:'80%', margin:'auto'}}>
                <Button 
                    size="small" 
                    onClick={()=>navigate(-1)}
                    sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'transparent', color: '#5D4E99'}}}
                >
                <ArrowBackIosIcon/>
                </Button>
            </div>
            <div style={{width:'60%', margin:'auto'}}>
                <h3 style={{color: '#5D4E99'}}>
                    Dashboard
                    <IconButton 
                        size='small'
                        onClick={()=>setRefresh(!refresh)}
                        sx={{color:'#5D4E99', ':hover':{bgcolor:'transparent',color:'#5D4E99'}}}
                    >
                        <RefreshIcon/>
                    </IconButton>
                </h3>
                <div style={{display: records == null? 'none':'block'}}>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table" sx={{boxShadow:3}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Receipt ID</TableCell>
                            <TableCell>Order Time</TableCell>
                            <TableCell>Total&nbsp;($)</TableCell>
                            <TableCell>
                                Status
                                <IconButton 
                                    size='small'
                                    id = "filter-button"
                                    aria-label="filter" 
                                    aria-controls={Boolean(anchorElFilter) ? 'filter-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={Boolean(anchorElFilter) ? 'true' : undefined}
                                    onClick={handleOpenFilter}
                                    sx={{':hover':{bgcolor:'transparent'}}}
                                >
                                    <MoreVertIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <Menu 
                        id="filter-menu" 
                        anchorEl={anchorElFilter} 
                        anchorOrigin={{ vertical: 'top', horizontal: 'left',}}
                        aria-labelledby="filter-button"
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'left',}}
                        open={Boolean(anchorElFilter)}
                        onClose={handleCloseFilter}
                        sx={{zIndex: '99999 !important'}}
                    >
                        <MenuItem style={{color: '#5D4E99'}}>
                            <FormControlLabel
                                label="Preparing"
                                control={ <Checkbox size="small" color="secondary" checked={checked[0]} onChange={handlePrepare}/>}
                            />
                        </MenuItem>
                        <MenuItem style={{color: '#5D4E99'}}>
                            <FormControlLabel
                                label="Delivering"
                                control={ <Checkbox size="small" color="secondary" checked={checked[1]} onChange={handleDeliver}/>}
                            />
                        </MenuItem>
                        <MenuItem style={{color: '#5D4E99'}}>
                            <FormControlLabel
                                label="Complete"
                                control={ <Checkbox size="small" color="secondary" checked={checked[2]} onChange={handleComplete}/>}
                            />
                        </MenuItem>
                    </Menu>
                    <TableBody>
                    {records.map((receipt)=>(
                            <TableRow
                                key={receipt.rid}
                                sx={{'&:last-child td, &:last-child th': { border: 0 }, cursor:"pointer", display: checked[receipt.status]? 'table-row':'none'}}
                                onClick={()=>{window.location.href = '/receipt/' + receipt.rid}}
                            >
                                <TableCell component="th" scope="row">{receipt.id}</TableCell>
                                <TableCell>{formatDate(receipt.timestamp)}</TableCell>
                                <TableCell>{receipt.total.toFixed(1)}</TableCell>
                                <TableCell style={{color: color[receipt.status]}}>{status[receipt.status]}</TableCell>
                            </TableRow>
                    ))}
                    </TableBody>
                    </Table>
                    </TableContainer><br/><br/>
                </div>
            </div>
            </>
    )}
};

export { Receipt, Records, Dashboard };