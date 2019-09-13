import React from 'react'
import axios from 'axios'
import {
    changeName, changeTag,
    initializeForm
 } from '../actions'
import './App.css'

const SelectOS = ({ store }) => {
    const { osName, osTag } = store.getState().form;
    // const fileName = osName + "_" + osTag + ".tar";

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
                <form onSubmit={e => handleSubmit(e)}>
                    <label>
                        CentOS
                        <input
                            type="radio"
                            value="centos"
                            checked={osName === 'centos'}
                            onChange={() => store.dispatch(changeName("centos"))}>
                        </input>
                    </label>
                    <label>
                        Ubuntu
                        <input
                            type="radio"
                            value="ubuntu"
                            checked={osName === 'ubuntu'}
                            onChange={() => store.dispatch(changeName("ubuntu"))}>
                        </input>
                    </label>
                    <br></br>
                    <label>
                        latest
                        <input
                            type="radio"
                            value="latest"
                            checked={osTag === 'latest'}
                            onChange={() => store.dispatch(changeTag("latest"))}>
                        </input>
                    </label>
                    <br></br>
                    <button type="submit">submit</button>
                </form>
                <button type="button" onClick={e => handleDownload(e)}>download</button>
            </header>
        </div>
    )
}

export default SelectOS