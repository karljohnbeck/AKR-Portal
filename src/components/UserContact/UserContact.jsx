import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Typography, Button, Card, CardContent, Grid, TextField, Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import EditInfoSuccessDialog from '../EditInfoSuccessDialog/EditIntoSuccessDialog'

function UserContact(props) {

    // State used to toggle the edit button on and off
    const [nameEdit, toggleNameEdit] = useState(true);

    // function used to toggle edit and non edit views
    const handleDateChange = (date) => {
        toggleNameEdit(!nameEdit);
    };

    // function that dispatches to the edit reducer whenever an edit is made to an input
    const handleEditChange = (event) => {

        props.dispatch(
            {
                type: 'SET_EDIT',
                payload: { key: event.target.id, value: event.target.value }
            });
    }
    // cancel button resets the reducers 
    const handleDateReset = (event) => {

        props.dispatch(
            {
                type: 'FETCH_USER_INFO',
                payload: props.id
            });
        handleDateChange()
    }

    // when the save button is click it will trigger a saga to start a PUT request using editInfo reducer 
    const handleSaveEdit = (event) => {
        event.preventDefault()
        props.dispatch(
            {
                type: 'UPDATE_USER_DATA',
                payload: props.store.editInfo
            })
       
    };

    return (
        <div>
            {/* IF the state is true this a just a view of information */}
            {nameEdit ?
                <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Contact</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip title={<h1>Edit</h1>}>
                                    <IconButton  onClick={handleDateChange} >
                                        <EditIcon fontSize="large" color="secondary"/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Typography variant="h5">
                            Email: {props.store.info.email}
                            <br />
                            Phone: {props.store.info.phone_number}
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
                    {/* IF the state is FALSE this You can edit */}
                    <form  onSubmit={handleSaveEdit} >
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Contact</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <EditInfoSuccessDialog handleDateChange={handleDateChange}/>
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateReset}
                                style={{margin:5}}
                                >Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h5">
                            {/* EMAIL!  */}
                            <TextField
                                required
                                id="email"
                                label="Email"
                                defaultValue={props.store.info.email}
                                variant="outlined"
                                onChange={handleEditChange}
                                color="secondary"
                            />
                            <br />
                            <br />
                            {/* PHONENUMBER?! */}
                            <TextField
                                required
                                id="phone_number"
                                label="Phone Number"
                                defaultValue={props.store.info.phone_number}
                                variant="outlined"
                                onChange={handleEditChange}
                                color="secondary"
                            />
                        </Typography>
                    </CardContent>
                    </form>
                </Card>
            }
        </div>
    );
}

export default connect(mapStoreToProps)(UserContact);