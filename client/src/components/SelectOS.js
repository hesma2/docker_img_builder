import React from 'react'
import axios from 'axios'
import {
    Button, Card, CardContent,
    FormLabel, FormControl, FormControlLabel,
    Radio, RadioGroup,
    
} from '@material-ui/core'
import {
    changeName, changeTag,
    initializeForm
 } from '../actions'
import './App.css'

const SelectOS = ({ store }) => {
    const { osName, osTag } = store.getState().form;

    const handleChangeOS = e => {
        store.dispatch(changeName(e.target.value));
    }

    const handleChangeTag = e => {
        store.dispatch(changeTag(e.target.value));
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios.post('/api/imgInfo', {
            osName,
            osTag,
        })
        .then(response => {
            console.log(response)
            store.dispatch(initializeForm())
        })
        .catch(err => {
            console.error(new Error(err))
        })
    }

    const handleDownload = e => {
        e.preventDefault();

        axios.get('/api/download', {
            responseType: 'blob',
            params: { osName, osTag }
        })
        .then(response => {
            const link = document.createElement('a');
            const blob = new Blob([response.data]);
            link.setAttribute('href', window.URL.createObjectURL(blob));
            link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            store.dispatch(initializeForm())
        })
        .catch(err => {
            console.error(new Error(err))
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <FormControl component="fieldset" onSubmit={e => handleSubmit(e)}>
                    <div className="flex">
                        <Card className="card">
                            <CardContent>
                                <FormLabel component="legend">OS</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel 
                                        value="centos"
                                        control={<Radio checked={osName === 'centos'} />}
                                        onChange={handleChangeOS}
                                        label="CentOS" />
                                    <FormControlLabel
                                        value="ubuntu"
                                        control={<Radio checked={osName === 'ubuntu'} />}
                                        onChange={handleChangeOS}
                                        label="Ubuntu" />
                                </RadioGroup>
                            </CardContent>
                        </Card>
                        <Card className="card">
                            <CardContent>
                                <FormLabel component="legend">TAG</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel
                                        value="latest"
                                        control={<Radio checked={osTag === 'latest'} />}
                                        onChange={handleChangeTag}
                                        label="latest" />
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" type="submit">create</Button>
                    </div>
                </FormControl>
                <div>
                    <Button variant="contained" color="default" type="button" onClick={e => handleDownload(e)}>
                        download
                    </Button>
                </div>
            </header>
        </div>
    )
}

export default SelectOS