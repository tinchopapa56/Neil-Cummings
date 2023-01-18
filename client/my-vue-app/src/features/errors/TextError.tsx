import React from 'react';
import {Button, Text, Stack} from "@chakra-ui/react";
import axios from 'axios';

export default function TestErrors() {
    const baseUrl = 'http://localhost:5000/api/'

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => console.log(err.response));
    }

    return (
        <>
            <Text as='h1'>Test Error component</Text>
            <Stack direction={"row"}>
                    <Button onClick={handleNotFound}> Not Found </Button>
                    <Button onClick={handleBadRequest}> Bad Request </Button>
                    <Button onClick={handleValidationError}> Validation Error </Button>
                    <Button onClick={handleServerError} > Server Error </Button>
                    <Button onClick={handleUnauthorised}> Unauthorised </Button>
                    <Button onClick={handleBadGuid}> Bad Guid </Button>
            </Stack>
        </>
    )
}


