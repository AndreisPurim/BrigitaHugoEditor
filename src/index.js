import React from 'react';
import ReactDOM from 'react-dom/client';
import { Octokit } from "@octokit/rest";
import DrifterStars from '@devil7softwares/react-drifter-stars'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";

import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import OutlinedInput from '@mui/material/OutlinedInput';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';


import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';
import Fade from '@mui/material/Fade';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import HashLoader from "react-spinners/HashLoader";

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
  const [token, setToken] = React.useState("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");
  const [lightMode, setLightMode] = React.useState(useMediaQuery('(prefers-color-scheme: dark)')?'dark':'light');
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
          <Tooltip title="Dark Mode">
            <IconButton onClick={changeTheme}>
              <DarkModeIcon style={{color:"white"}}/>
            </IconButton>
          </Tooltip>
          {login===""?null:
            <Tooltip title="Dark Mode">
              <IconButton onClick={()=>setLogin("")}>
                <LogoutIcon style={{color:"white"}}/>
              </IconButton>
            </Tooltip>
          }
        </Grid>
        <LoadingIndicator/>
      {login?
        <ReposPage login={login} lightMode={lightMode}/>
      :
        <Grid item >
          <Card elevation={24} sx={{maxWidth: 600}}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Welcome to Brigita!
              </Typography>
              <Typography variant="h5" component="div">
                  Paste your github Personal Access Token below!
              </Typography>
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
  console.log(repos)
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
      <WebsitePage lightMode={lightMode} octokit={octokit} repo={selected}/>
    </Grid>
  )
}

function WebsitePage({ lightMode, octokit, repo }){
  if(repo){
    return(
      <Grid item xs={12}>
        <div>{repo.trees_url}</div>
      </Grid>
    )
  }
  else{ return null; }
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
