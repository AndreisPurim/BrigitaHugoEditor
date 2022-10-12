import React from 'react';
import ReactDOM from 'react-dom/client';
import { Octokit } from "@octokit/rest";
import DrifterStars from '@devil7softwares/react-drifter-stars'
import { CookiesProvider, useCookies } from 'react-cookie';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";


import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import OutlinedInput from '@mui/material/OutlinedInput';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useMediaQuery from '@mui/material/useMediaQuery';


import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';
import Fade from '@mui/material/Fade';

import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Divider from '@mui/material/Divider';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/Article';
import HandymanIcon from '@mui/icons-material/Handyman';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import MenuItem from '@mui/material/MenuItem';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import CodeEditor from '@uiw/react-textarea-code-editor';

import HashLoader from "react-spinners/HashLoader";
import MDEditor from '@uiw/react-md-editor';

import yaml from 'js-yaml';
import toml from 'toml';

import {exampleRepo} from './example.js';


const getComplementaryColor = (color = '') => {
  const colorPart = color.slice(1);
  const ind = parseInt(colorPart, 16);
  let iter = ((1 << 4 * colorPart.length) - 1 - ind).toString(16);
  while (iter.length < colorPart.length) {
     iter = '0' + iter;
  };
  return '#' + iter;
};

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
    return (
      promiseInProgress && <HashLoader color="white" />
  );  
}

function Main(){
  const [cookies, setCookie] = useCookies(['token']);
  const [token, setToken] = React.useState(cookies.token);
  const [lightMode, setLightMode] = React.useState(useMediaQuery('(prefers-color-scheme: dark)')?'dark':'light');
  const [easyMode, setEasyMode] = React.useState(true);
  const [color, setColor] = React.useState('#f44336');
  const [show, setShow] = React.useState(false);
  const [login, setLogin] = React.useState("example");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: color },
          secondary: { main: getComplementaryColor(color) },
          mode: lightMode,
        },
        typography: {
          fontFamily: 'sans-serif'
        }
      }),
    [color, lightMode],
  );
  const randomizeColor = () => {
    setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setCookie('token', token, { path: '/' });
    setLogin(token);
  }
  const changeTheme=()=>{
    setLightMode(lightMode==='light'?'dark':'light')
  }
  return(
    <ThemeProvider theme={theme}>
      <DrifterStars style={{zIndex: "-1", backgroundColor: "#31102f", background: "linear-gradient(-45deg," + (lightMode==='light'?theme.palette.primary.light:theme.palette.primary.dark) + ","+ (lightMode==='light'?theme.palette.secondary.light:theme.palette.secondary.dark) + ")",
display: "block", position: "fixed", inset: "0"}}/>
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{backdropFilter: "brightness(1.5)"}} >
        <Grid item color="white">
          <Typography variant="h3"><b> [ BRI<span style={{ color: theme.palette.primary.main, filter: "brightness(1.5)"}}>GIT</span>A ] </b></Typography>
        </Grid>
        <Grid item color="white">
          <Typography> A simple <Tooltip title="Brigita is a 100% free and 100% frontend solution, that is, we don't (and can't) store anything in any server!"><Link href="https://en.wikipedia.org/wiki/Static_web_page" target="_blank" rel="noopener noreferrer" color="inherit" sx={{textDecorationStyle: 'dotted'}}>static</Link></Tooltip> <Tooltip title="Content Management System: A software that enables users to create and edit websites easily"><Link href="https://en.wikipedia.org/wiki/Content_management_system" target="_blank" rel="noopener noreferrer" color="inherit" sx={{textDecorationStyle: 'dotted'}}>CMS</Link></Tooltip> for <Tooltip title="SSG: Static Site Generator, that is, a program that generates static web pages (thus, don't necessarily rely on a dinamic server to deliver it to their users)"><Link href="https://en.wikipedia.org/wiki/Web_template_system#Static_site_generators" target="_blank" rel="noopener noreferrer" color="inherit" sx={{textDecorationStyle: 'dotted'}}>SSG</Link></Tooltip> <Tooltip title="Pages stored in Github!"><Link href="https://pages.github.com/" target="_blank" rel="noopener noreferrer" color="inherit" sx={{textDecorationStyle: 'dotted'}}>gh-pages</Link></Tooltip></Typography>
        </Grid>
        <Grid item color="white">
          <Tooltip title="Randomize my colors">
            <IconButton onClick={randomizeColor}>
              <ColorLensIcon style={{color:"white"}}/>
            </IconButton>
          </Tooltip>
          <Tooltip title={"Change to "+(lightMode==='light'?'Dark':'Light')+" Mode"}>
            <IconButton onClick={changeTheme}>
              {lightMode==='light'?<DarkModeIcon style={{color:"white"}}/>:<LightModeIcon style={{color:"white"}}/>}
            </IconButton>
          </Tooltip>
          <Tooltip title={"Change to "+(easyMode?'Technical':'Easy')+" Mode "+(easyMode?'(will show all files as is, including technical ones)':'(will try to show you only the necessary)')}>
            <IconButton onClick={()=>setEasyMode(!easyMode)}>
              {easyMode?<AutoFixOffIcon style={{color:"white"}}/>:<AutoFixNormalIcon style={{color:"white"}}/>}
            </IconButton>
          </Tooltip>
          {login===""?null:
            <Tooltip title="Logout of your PAT">
              <IconButton onClick={()=>setLogin("")}>
                <LogoutIcon style={{color:"white"}}/>
              </IconButton>
            </Tooltip>
          }
        </Grid>
        <LoadingIndicator/>
        {login?
          login==='example'?
            <Paper elevation={24} style={{padding:'2rem', minWidth:'90vw'}}>
              <Grid spacing={2} container direction="row" justifyContent="center" alignItems="flex-start">
                <WebsitePage lightMode={lightMode} easyMode={easyMode} octokit={new Octokit({auth: '', userAgent: 'Brigita Editor Example' })} repo= {exampleRepo}/>
              </Grid>
            </Paper>
            :
            <ReposPage login={login} lightMode={lightMode}/>
        :
          <Grid item >
            <Card elevation={24} sx={{maxWidth: 600}}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Welcome to Brigita!
                </Typography>
                <Typography variant="h5" component="div">
                  We are an Static Open Source SSG editor!
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Basicallly, we make editing gh-pages made with Hugo, Jekyll and others alike easier, and the best part is: 100% free! (Also,did we mention our slick design?)
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Read the tutorial and FAQ or explore the example website below!
                </Typography>
                <div style={{textAlign:'center'}}>
                  <Button style={{margin:'1rem'}} onClick={()=>{setLogin('example')}} variant="contained">Example Website</Button>
                </div>
                <Typography color="text.secondary" gutterBottom>
                  We use the P.A.T. to connect to your github files! The P.A.T will be stored encripted in the cookies of your browser for easier access!
                </Typography>
                <FormControl style={{marginTop:'1rem'}} fullWidth variant="outlined">
                  <InputLabel>Personal Access Token</InputLabel>
                  <OutlinedInput
                    type={show ? 'text' : 'password'}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={() => alert("To be implemented, sorry :(")} edge="end">
                          <ContentCopyIcon />
                        </IconButton>
                        <IconButton onClick={()=>setShow(!show)} edge="end">
                          {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Personal Access Token"
                  />
                </FormControl>
                <Button style={{marginTop:'1rem'}} onClick={handleSubmit} variant="contained">Go!</Button>
              </CardContent>
            </Card>
          </Grid>
        }
        <Grid item color="white">
          <Typography variant="overline">Created by <Link href="https://github.com/AndreisPurim" target="_blank" rel="noopener noreferrer" color="inherit" sx={{textDecorationStyle: 'dotted'}}>Andreis Purim</Link> (<Link href="https://github.com/AndreisPurim/Brigita" target="_blank" rel="noopener noreferrer" color="inherit" sx={{textDecorationStyle: 'dotted'}}>Source</Link>)</Typography>
        </Grid>
      </Grid>
      </ThemeProvider>
  )
}

function ReposPage({ lightMode, login }){
  const [repos, setRepos] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [subdir, setSubdir] = React.useState([]);
  const octokit = new Octokit({     
    auth: login,    
    userAgent: 'Brigita Editor' 
  });
  React.useEffect(() => {
    async function onLoad() {
      await octokit.request('GET /user/repos', {})
      .then(res => setRepos(res.data))
      .catch(err => console.log(err))
    }
    trackPromise(onLoad());
  },[])
  return(
    <Grid item xs={12}>
      {repos.length<1?null:
      <Paper elevation={24} style={{padding:'2rem', minWidth:'90vw'}}>
        <Grid spacing={2} container direction="row" justifyContent="center" alignItems="flex-start">
          {!selected?
            <React.Fragment>
              <Grid item xs={12} style={{textAlign:'center'}}><Typography variant="h4">Pick your website repository</Typography></Grid>
              {repos.map(item =>
                <Grid item key={item.id} xs={2} >
                  <Button onClick={()=>setSelected(item)} fullWidth size="large" variant={lightMode==='light'?"contained":"outlined"} style={{textTransform: 'none'}}>{item.name}</Button>      
                </Grid>
              )}
            </React.Fragment>
            :
            <React.Fragment>
              <Grid item xs={12}>
                <Button variant="text" startIcon={<ChevronLeftIcon />}>
                  /{selected.name} at @{selected.owner.login}
                </Button>
              </Grid>
              <Grid item xs={12} style={{width: '100%'}}>
                <Divider/>
              </Grid>
              <WebsitePage lightMode={lightMode} octokit={octokit} repo={selected}/>
            </React.Fragment>
          }
        </Grid>
      </Paper>
      }
    </Grid>
  )
}

function WebsitePage({ lightMode, octokit, repo, easyMode }){
  const [files, setFiles] = React.useState([]);
  const [file, setFile] = React.useState(null);
  React.useEffect(() => {
    async function onLoad() {
      await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: repo.owner.login,
        repo: repo.name,
        path: ''
      })
      .then(res => setFiles(res.data))
      .catch(err => console.log(err))
    }
    trackPromise(onLoad());
  },[easyMode])
  if(files.length>1){
    return(
      <React.Fragment>
      <Grid item xs={12} container direction="row" justifyContent="space-between" alignItems="stretch">
        <Grid item xs={3} style={{maxHeight: '70vh', overflow: 'auto'}}>
          <List dense>
            {files.map(item=>
              item.type==='dir'?
                <Directory key={item.name} easyMode={easyMode} lightMode={lightMode} octokit={octokit} repo={repo} item={item} setFile={setFile}/> 
              :
                <File key={item.name} easyMode={easyMode} lightMode={lightMode} octokit={octokit} repo={repo} item={item} setFile={setFile}/>
            )}
          </List>
        </Grid>
        <Grid item container xs={9} data-color-mode={lightMode} direction="column" justifyContent="flex-start" alignItems="stretch">
          <FileEditor file={file} setFile={setFile} easyMode={easyMode}/>
        </Grid>
      </Grid>
      </React.Fragment>
    )
  }
  else{
    return <></>
  }
}

function Directory({ easyMode, lightMode, octokit, repo, item, setFile }){
  const [subdir, setSubdir] = React.useState(null);
  const expand = () =>{
    if(subdir){
      setSubdir(null);
    }
    else{
      octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: repo.owner.login,
        repo: repo.name,
        path: item.path
      })
      .then(res => setSubdir(res.data))
      .catch(err => console.log(err))
    }
  }
  return(
    <React.Fragment>
      <ListItem disablePadding>
        {!easyMode||(easyMode && item.name==="content")?
          <ListItemButton onClick={expand}>
          <ListItemIcon>
            <FolderOpenIcon/>
          </ListItemIcon>
          <ListItemText primary={item.name}/>
          {subdir? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        :null
        }
      </ListItem>
      <Collapse in={Boolean(subdir)} timeout="auto" unmountOnExit>
        {!subdir?null:
          <List dense component="div" disablePadding sx={{ pl: 3 }}>
            {subdir.map(subitem=>
              subitem.type==='dir'?
                <Directory key={subitem.name} easyMode={easyMode} lightMode={lightMode} octokit={octokit} repo={repo} item={subitem} setFile={setFile}/> 
              :
                <File key={subitem.name} easyMode={easyMode} lightMode={lightMode} octokit={octokit} repo={repo} item={subitem} setFile={setFile}/>
            )}
          </List>
        }
      </Collapse>
    </React.Fragment>
  )
}

function File({ easyMode, lightMode, octokit, repo, item, setFile }){
  function openFile(item){
    octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: repo.owner.login,
      repo: repo.name,
      path: item.path
    })
    .then(res => {
      setFile(res.data);
    })
    .catch(err => console.log(err))
  }
  return(
    <ListItem disablePadding>
      {easyMode?
        (item.name.endsWith(".md")&&(!item.name.startsWith(".")))?
          <ListItemButton onClick={()=>openFile(item)}>
            <ListItemIcon>
              {item.name.endsWith(".md")?<ArticleIcon/>:<HandymanIcon />}
            </ListItemIcon>
            <ListItemText primary={item.name.substring(0,item.name.lastIndexOf("."))}/>
          </ListItemButton>
        :null
      :
        <ListItemButton onClick={()=>openFile(item)}>
          <ListItemIcon>
            {item.name.endsWith(".md")?<ArticleIcon/>:<HandymanIcon />}
          </ListItemIcon>
          <ListItemText primary={item.name}/>
        </ListItemButton>
      }
    </ListItem>
  )
}


function FileEditor({file, setFile, easyMode}){
  const [content, setContent] = React.useState(null)
  const [changed, setChanged] = React.useState(false);
  const [meta, setMeta] = React.useState(null);
  const metaFields = {
    title: {type:"string", required: true, size: 9},
    date: {type:"date", required: true, size: 3},
    tags: {type:"suggest", required: false, size: 6},
    categories: {type:"suggest", required: false, size: 6},
    image: {type:"string", required: false, size: 6},
  }
  React.useEffect(() => {
    if(file){
      if(easyMode){
        const buffer_content = atob(file.content).split("---");
        const buffer_meta = buffer_content[1]
        setMeta(yaml.load(buffer_meta))
        setContent(buffer_content.slice(2).join("").trim())
        setChanged(false);
      }
      else{
        setContent(atob(file.content))
        setChanged(true);
      }
    }
  }, [file, easyMode])
  console.log(meta)
  if(content){
    return(
      <React.Fragment>
          {easyMode?
            <React.Fragment>
              <Grid item style={{paddingLeft:'1rem'}}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Post Configuration</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Set title, tags and publish!</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Grid spacing={1} container direction="row" justifyContent="space-between" alignItems="stretch"> 
                        <Grid item>
                          <Button variant="contained" startIcon={<PublishIcon/>} disabled={!changed}>{changed?(easyMode?"Publish":"Commit"):"No Changes Detected"}</Button>
                        </Grid>
                        <Grid item>
                          <Button variant="contained" startIcon={<DeleteIcon/>}>Delete</Button>
                        </Grid>
                        <Grid item xs/>
                        <Grid item>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox/>} label="Draft"/>
                          </FormGroup>
                        </Grid>
                        {Object.keys(metaFields).map(question=>
                          <React.Fragment key={question}>
                            {!metaFields.hasOwnProperty(question)?null:
                              <Grid item xs={metaFields[question].size}>
                                {metaFields[question].type==="date"?
                                  <DesktopDatePicker value={meta[question]} onChange={v=>console.log(v)} label={question} inputFormat="MM/DD/YYYY" renderInput={(params) => <TextField fullWidth required={metaFields[question].required} {...params} />}/>
                                :metaFields[question].type==="suggest"?
                                  <FormControl fullWidth>
                                    <InputLabel>{question}</InputLabel>
                                    <Select
                                      multiple
                                      value={meta[question]}
                                      //onChange={handleChange}
                                      input={<OutlinedInput label={question}/>}
                                      renderValue={(selected) => selected.join(', ')}
                                      >
                                        {meta[question].map(item=>
                                          <MenuItem key={item} value={item}>
                                            <Checkbox checked={meta[question].indexOf(item) > -1} />
                                            <ListItemText primary={item} />
                                          </MenuItem>
                                        )}
                                    </Select>
                                  </FormControl>
                                :
                                  <TextField fullWidth required={metaFields[question].required} label={question} value={meta[question]} onChange={e=>{setMeta({...meta,[question]:e.target.value})}} variant="outlined" />
                                }
                              </Grid>
                            }
                          </React.Fragment>
                        )}
                      </Grid>
                    </LocalizationProvider>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item style={{maxHeight: '60vh', paddingLeft:'1rem'}}>
                <MDEditor value={content} onChange={v=>{setContent(v);setChanged(true)}} height='99%'/>
              </Grid>

            </React.Fragment>
          :
            <Grid item style={{maxHeight: '60vh', overflow: 'auto'}}>
              <CodeEditor height='99%' value={content} onChange={e => setContent(e.target.value)}
 language={file.name.substring(file.name.lastIndexOf('.') + 1)}/>
            </Grid>
          }
      </React.Fragment>
    )
  }
  else{
    return(
      <React.Fragment>
      <Grid item xs/>
      <Grid item style={{textAlign: 'center'}}>
        <Typography>Select a file to start editing!</Typography>
        <Typography>You are in <b>{easyMode?'easy':'technical'} mode</b></Typography>     
      </Grid>
      <Grid item xs/>
      </React.Fragment>
    )
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<CookiesProvider><Main /></CookiesProvider>);
