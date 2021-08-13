import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Backdrop,
    CircularProgress,
    Grid
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from "../containers/GetUsers";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
}));

function UsersList () {
    const classes = useStyles();
    const history = useHistory();
    const { loading, response, error, setUserID } = useContext(UserContext);
    console.log("***RESPONSE: ", response);
    const handleRowClick = function (params) {
        setUserID(params.id);
        history.push(`/users/${params.id}`)
    }

    if (response !== null) {
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'firstname', headerName: 'First name', width: 130 },
            { field: 'lastname', headerName: 'Last name', width: 130 },
            { field: 'email', headerName: 'Email', width: 240, },
            { field: 'created_at', headerName: 'Created At:', width: 240},
        ];

        const rows = [];

        // response.map((user) => rows.push(user));
        response.map(function (user) {
            if (user.role.type !== "manager") {
                rows.push(user)
            }

            return null;
        })

        return (
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <div style={{ height: 400, width: '100%', marginTop: '4rem' }}>
                            <DataGrid 
                                rows={rows} 
                                columns={columns} 
                                pageSize={5} 
                                onRowClick={ 
                                    (params) => handleRowClick(params) 
                                } 
                            />
                        </div>
                    </Grid>
                </Grid>
            </>
        );
    }

    /**
     * NO RESPONSE FROM API
     * 
     */
    return (
        <>
            { loading && 
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop> 
            }
            { error && <p>Something went wrong, please try again later.</p> }
        </>
    )
}

export default UsersList;