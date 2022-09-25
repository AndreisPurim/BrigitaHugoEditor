import React from 'react';
import ReactDOM from 'react-dom/client';
import { Octokit } from "@octokit/rest";
import DrifterStars from '@devil7softwares/react-drifter-stars'
import { CookiesProvider, useCookies } from 'react-cookie';

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

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import HashLoader from "react-spinners/HashLoader";
import MDEditor from '@uiw/react-md-editor';
import FolderZipIcon from '@mui/icons-material/FolderZip';


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
        <WebsitePage lightMode={lightMode} 
        octokit={new Octokit({     
          auth: '',    
          userAgent: 'Brigita Editor' 
        })}
        
        repo={{
  "id": 534644223,
  "node_id": "R_kgDOH94F_w",
  "name": "baltsec_test",
  "full_name": "Baltic-Security-Foundation/baltsec_test",
  "private": false,
  "owner": {
    "login": "Baltic-Security-Foundation",
    "id": 101171342,
    "node_id": "O_kgDOBgfAjg",
    "avatar_url": "https://avatars.githubusercontent.com/u/101171342?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Baltic-Security-Foundation",
    "html_url": "https://github.com/Baltic-Security-Foundation",
    "followers_url": "https://api.github.com/users/Baltic-Security-Foundation/followers",
    "following_url": "https://api.github.com/users/Baltic-Security-Foundation/following{/other_user}",
    "gists_url": "https://api.github.com/users/Baltic-Security-Foundation/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Baltic-Security-Foundation/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Baltic-Security-Foundation/subscriptions",
    "organizations_url": "https://api.github.com/users/Baltic-Security-Foundation/orgs",
    "repos_url": "https://api.github.com/users/Baltic-Security-Foundation/repos",
    "events_url": "https://api.github.com/users/Baltic-Security-Foundation/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Baltic-Security-Foundation/received_events",
    "type": "Organization",
    "site_admin": false
  },
  "html_url": "https://github.com/Baltic-Security-Foundation/baltsec_test",
  "description": null,
  "fork": false,
  "url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test",
  "forks_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/forks",
  "keys_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/keys{/key_id}",
  "collaborators_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/collaborators{/collaborator}",
  "teams_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/teams",
  "hooks_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/hooks",
  "issue_events_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/issues/events{/number}",
  "events_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/events",
  "assignees_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/assignees{/user}",
  "branches_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/branches{/branch}",
  "tags_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/tags",
  "blobs_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/git/blobs{/sha}",
  "git_tags_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/git/tags{/sha}",
  "git_refs_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/git/refs{/sha}",
  "trees_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/git/trees{/sha}",
  "statuses_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/statuses/{sha}",
  "languages_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/languages",
  "stargazers_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/stargazers",
  "contributors_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/contributors",
  "subscribers_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/subscribers",
  "subscription_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/subscription",
  "commits_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/commits{/sha}",
  "git_commits_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/git/commits{/sha}",
  "comments_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/comments{/number}",
  "issue_comment_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/issues/comments{/number}",
  "contents_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/contents/{+path}",
  "compare_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/compare/{base}...{head}",
  "merges_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/merges",
  "archive_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/{archive_format}{/ref}",
  "downloads_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/downloads",
  "issues_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/issues{/number}",
  "pulls_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/pulls{/number}",
  "milestones_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/milestones{/number}",
  "notifications_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/notifications{?since,all,participating}",
  "labels_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/labels{/name}",
  "releases_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/releases{/id}",
  "deployments_url": "https://api.github.com/repos/Baltic-Security-Foundation/baltsec_test/deployments",
  "created_at": "2022-09-09T13:00:42Z",
  "updated_at": "2022-09-09T13:03:02Z",
  "pushed_at": "2022-09-09T13:23:45Z",
  "git_url": "git://github.com/Baltic-Security-Foundation/baltsec_test.git",
  "ssh_url": "git@github.com:Baltic-Security-Foundation/baltsec_test.git",
  "clone_url": "https://github.com/Baltic-Security-Foundation/baltsec_test.git",
  "svn_url": "https://github.com/Baltic-Security-Foundation/baltsec_test",
  "homepage": null,
  "size": 1329,
  "stargazers_count": 0,
  "watchers_count": 0,
  "language": "SCSS",
  "has_issues": true,
  "has_projects": true,
  "has_downloads": true,
  "has_wiki": true,
  "has_pages": true,
  "forks_count": 0,
  "mirror_url": null,
  "archived": false,
  "disabled": false,
  "open_issues_count": 0,
  "license": null,
  "allow_forking": true,
  "is_template": false,
  "web_commit_signoff_required": false,
  "topics": [],
  "visibility": "public",
  "forks": 0,
  "open_issues": 0,
  "watchers": 0,
  "default_branch": "main",
  "permissions": {
    "admin": true,
    "maintain": true,
    "push": true,
    "triage": true,
    "pull": true
  }
}} />
        {/* {login?
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
        } */ }
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

function WebsitePage({ lightMode, octokit, repo }){
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
        <Paper style={{minWidth:'80vw'}}>
          <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
            <Grid item xs={3}>
              <List>
                {files.map(item=>
                  item.type==='dir'?
                    <Directory key={item.name} lightMode={lightMode} octokit={octokit} repo={repo} item={item} setFile={setFile}/> 
                  :
                    <File key={item.name} lightMode={lightMode} octokit={octokit} repo={repo} item={item} setFile={setFile}/>
                )}
              </List>
            </Grid>
            <Grid item xs={9} data-color-mode={lightMode}>
                <MDEditor value={file?file:""} height='99%'/>
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
      .then(res => {console.log(res);setSubdir(res.data)})
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
          <List component="div" disablePadding sx={{ pl: 4 }}>
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
      const encoded = res.data.content;
      const decoded = atob(encoded);
      setFile(decoded);
    })
    .catch(err => console.log(err))
  }
  return(
    <ListItem disablePadding>
      <ListItemButton onClick={()=>openFile(item)}>
        <ListItemIcon>
          <ArticleIcon/>
        </ListItemIcon>
        <ListItemText primary={item.name}/>
      </ListItemButton>
    </ListItem>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<CookiesProvider><Main /></CookiesProvider>);
