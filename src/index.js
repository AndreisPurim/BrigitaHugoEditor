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
import Collapse from '@mui/material/Collapse';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/Article';
import HandymanIcon from '@mui/icons-material/Handyman';

import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import CodeEditor from '@uiw/react-textarea-code-editor';


import HashLoader from "react-spinners/HashLoader";
import MDEditor from '@uiw/react-md-editor';

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
  const [login, setLogin] = React.useState("");
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
            <WebsitePage lightMode={lightMode} easyMode={easyMode} octokit={new Octokit({auth: '', userAgent: 'Brigita Editor Example' })} repo= {exampleRepo}/>
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
      <Fade in={Boolean(repos.length && !selected)} unmountOnExit>
        <Paper elevation={24} style={{padding:'2rem'}}>
          <Grid spacing={2} container direction="row" justifyContent="center" alignItems="flex-start">
            <Grid item xs={12} style={{textAlign:'center'}}><Typography variant="h4">Pick your website repository</Typography></Grid>
            {repos.map(item =>
              <Grid item key={item.id} xs={2} >
                <Button onClick={()=>setSelected(item)} fullWidth size="large" variant={lightMode==='light'?"contained":"outlined"} style={{textTransform: 'none'}}>{item.name}</Button>      
              </Grid>
            )}
          </Grid>
        </Paper>
      </Fade>
      {!selected?null:
        <WebsitePage lightMode={lightMode} octokit={octokit} repo={selected}/>
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
  },[])
  return(
    <Grid item xs={12}>
      {files.length<1?null:
        <Paper style={{width:'90vw'}}>
          <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
            <Grid item xs={3} style={{maxHeight: '70vh', overflow: 'auto'}}>
              <List dense>
                {files.map(item=>
                  item.type==='dir'?
                    <Directory key={item.name} lightMode={lightMode} octokit={octokit} repo={repo} item={item} setFile={setFile}/> 
                  :
                    <File key={item.name} lightMode={lightMode} octokit={octokit} repo={repo} item={item} setFile={setFile}/>
                )}
              </List>
            </Grid>
            <Grid item container xs={9} data-color-mode={lightMode} direction="column" justifyContent="flex-start" alignItems="stretch">
              <FileEditor file={file} setFile={setFile} easyMode={easyMode}/>
            </Grid>
          </Grid>
        </Paper>
      }
    </Grid>
  )
}

function Directory({ lightMode, octokit, repo, item, setFile }){
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
      <ListItemButton onClick={expand}>
        <ListItemIcon>
          <FolderOpenIcon/>
        </ListItemIcon>
        <ListItemText primary={item.name}/>
        {subdir? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      </ListItem>
      <Collapse in={Boolean(subdir)} timeout="auto" unmountOnExit>
        {!subdir?null:
          <List dense component="div" disablePadding sx={{ pl: 3 }}>
            {subdir.map(subitem=>
              subitem.type==='dir'?
                <Directory key={subitem.name} lightMode={lightMode} octokit={octokit} repo={repo} item={subitem} setFile={setFile}/> 
              :
                <File key={subitem.name} lightMode={lightMode} octokit={octokit} repo={repo} item={subitem} setFile={setFile}/>
            )}
          </List>
        }
      </Collapse>
    </React.Fragment>
  )
}

function File({ lightMode, octokit, repo, item, setFile }){
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
      <ListItemButton onClick={()=>openFile(item)}>
        <ListItemIcon>
          {item.name.endsWith(".md")?<ArticleIcon/>:<HandymanIcon />}
        </ListItemIcon>
        <ListItemText primary={item.name}/>
      </ListItemButton>
    </ListItem>
  )
}


function FileEditor({file, setFile, easyMode}){
  const [content, setContent] = React.useState(null)
  React.useEffect(() => {
    if(file){
      if(easyMode){
        setContent(atob(file.content))
      }
      else{
        setContent(atob(file.content))
      }
    }
  }, [file, easyMode])
  if(content){
    return(
      <React.Fragment>
        <Grid item style={{height: '10vh'}}>
          <Button variant="contained">Publish</Button>
        </Grid>
          {easyMode?
            <Grid item style={{maxHeight: '60vh'}}>
              <MDEditor value={content} onChange={setContent} height='99%'/>
            </Grid>
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
