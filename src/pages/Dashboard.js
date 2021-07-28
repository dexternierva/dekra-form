import React, { useState } from 'react';
import axios from 'axios';
import UsersList from "../components/UsersList";
import GetUsers from "../containers/GetUsers";
import GetExperience from "../containers/GetExperience";
import GetEducation from "../containers/GetEducation";
import { Link } from "react-router-dom";
import { useCurrentUser, useDispatchCurrentUser } from "../containers/CurrentUser";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import DescriptionIcon from '@material-ui/icons/Description';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import MenuIcon from '@material-ui/icons/Menu';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Profile from "../components/Formik/Profile";
import Experience from "../components/Formik/Experience";
import Education from "../components/Formik/Education";
import PracticalKnowledge from "../components/Formik/PracticalKnowledge";
import PracticalActivities from "../components/Formik/PracticalActivities";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
        display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

function Dashboard (props) {
    const [state, setState] = useState("profile");
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const currentUser = useCurrentUser();
    const dispatch = useDispatchCurrentUser();
    const history = useHistory();

    // CONDITIONAL RENDERING FUNCTION
    function Component() {
        switch (state) {
            case 'profile':
                return <Profile />;
            case 'experience':
                return <GetExperience><Experience /></GetExperience>;
            case 'education':
                return <GetEducation><Education /></GetEducation>;
            case 'practicalknowledge':
                return <PracticalKnowledge />;
            case 'practicalactivitiesform':
                return <PracticalActivities />;
            default:
                return <Profile />;
        }
    }

    const user = {
        avatar: '/static/images/avatars/avatar_6.png',
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post("https://dekra-form-api-m8bsw.ondigitalocean.app/logout");
        } catch (error) {
            console.error("Error in logging out", error);
        }

        dispatch({ type: "LOGOUT" });
        history.push("/");
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Box
                display="flex" 
                flexDirection="column"
                justifyContent="center" 
                alignItems="center"
                marginBottom="2rem"
            >
                <Avatar
                    component="div"
                    src={user.avatar}
                    className={classes.large}
                />
                <Typography color="textPrimary" variant="h6">{currentUser.firstname} {currentUser.lastname}</Typography>
            </Box>

            <Divider />

            { currentUser.role.type === "authenticated" ?
                <List>
                    <ListItem button>
                        <ListItemIcon><DescriptionIcon /></ListItemIcon>
                        <ListItemText><Link onClick={ () => setState("profile") } style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>Profile</Link></ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><WorkIcon /></ListItemIcon>
                        <ListItemText><Link onClick={ () => setState("experience") } style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>Work Experience</Link></ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><SchoolIcon /></ListItemIcon>
                        <ListItemText><Link onClick={ () => setState("education") } style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>Education</Link></ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
                        <ListItemText><Link onClick={ () => setState("practicalknowledge") } style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>Practical Knowledge</Link></ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><PlaylistAddCheckIcon /></ListItemIcon>
                        <ListItemText><Link onClick={ () => setState("practicalactivitiesform") } style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>Practical Activities</Link></ListItemText>
                    </ListItem>
                </List>
            :
                <List dense={true}>
                    <ListItem>
                        <ListItemIcon><PermIdentityIcon /></ListItemIcon>
                        <ListItemText
                            primary="foobar"
                            secondary="username"
                        />
                    </ListItem>
                    <ListItem href="#simple-list">
                    <ListItemIcon><MailOutlineIcon /></ListItemIcon>
                        <ListItemText
                            primary="dexternierva@gmail.com"
                            secondary="email"
                        />
                    </ListItem>
                </List>

            }

            <Divider />

            <List>
                {currentUser.isAuthenticated && (
                    <ListItem button>
                        <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
                        <ListItemText onClick={handleLogout}>Logout</ListItemText>
                    </ListItem>
                )}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>A-Vantage International Recruitment Corp</Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    { currentUser.role.type === "authenticated" ? <Component /> : <GetUsers><UsersList /></GetUsers> }
                    
                    <Box py={2}>
                        <Typography variant="body2" display="block" align="center" gutterBottom>
                            Copyright &copy; 2019 A-Vantage International Recruitment Corp. All rights reserved.
                        </Typography>
                    </Box>
                </main>
            </div>
        </>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;