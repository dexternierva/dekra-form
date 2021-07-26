import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import PracticalKnowledge from "../components/PracticalKnowledge";
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
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DescriptionIcon from '@material-ui/icons/Description';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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

function Practice (props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const currentUser = useCurrentUser();
    const dispatch = useDispatchCurrentUser();
    const history = useHistory();

    const user = {
        avatar: '/static/images/avatars/avatar_6.png',
        jobTitle: 'Senior Developer',
        name: 'Katarina Smith'
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:1337/logout")
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

            <List>
                <ListItem button>
                    <ListItemIcon><DescriptionIcon /></ListItemIcon>
                    <ListItemText><Link to="/dashboard" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>Curriculum Vitae</Link></ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><ListAltIcon /></ListItemIcon>
                    <ListItemText><Link to="/practicalknowledge" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>Practical Knowledge</Link></ListItemText>
                </ListItem>
            </List>

            <Divider />
            <List>
                {currentUser.isAuthenticated && (
                    <ListItem button>
                        <ListItemIcon><ExitToAppOutlinedIcon /></ListItemIcon>
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
                    <Typography variant="h6" noWrap>Avantage International Application Form</Typography>
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
                    <PracticalKnowledge />
                </main>
            </div>
        </>
    );
}

Practice.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Practice;