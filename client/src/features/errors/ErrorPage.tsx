import React from 'react';
import {Button, Text, Heading, Stack, Link} from "@chakra-ui/react";
import axios from 'axios';

export default function ErrorPage() {
    const baseUrl = 'http://localhost:8080/api/'
    // const baseUrl = '/api'

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
            <Heading as="h1">There was an error...Go back to activities</Heading>
            <Button as={Link}>Activities</Button>
        </>
    )
}


