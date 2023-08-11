import {
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    FormHelperText,
  } from '@chakra-ui/react'

  import { useState } from 'react';
  import {type ActionArgs, json, redirect, type LoaderArgs} from '@remix-run/node';
  import { login, getSession } from '~/utils/session.server'
  import { Form, useActionData, useLoaderData } from "@remix-run/react";

function validateUsername (username: any) {
    if (typeof username !== "string" || username.length === 0 ){
        return "Please provide your username"
   }
}

function validatePassword (password: any) {
    if (typeof password !== "string" || password.length === 0 ){
        return "Please provide your password"
   }
}

function resultRequest ( message:any , status:number) {
    return json({
        message, 
        status: status
        })
}

// check whether the user already has a session, if so redirect to dashboard
export async function loader({ request} : LoaderArgs) {
    const session = await getSession(request);
    if (session.has("login_ok") && session.get("login_ok") > 0){
        return redirect('/dashboard');        
    }
}

//check the submitted data and answer accordinly 
export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const username= formData.get("username")
    const password = formData.get("password")

    const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
    }

    if (Object.values(fieldErrors).some(Boolean)) {
        return resultRequest( {fieldErrors}, 400 )
    }
    const result = await login(username,password)
    if (result === null){
        return resultRequest("Check your credentials",200)
    }   
    return redirect('/dashboard')
    
}

export default function Login() {
    const [username, setUsername] = useState('');
    const data = useActionData<typeof action>();
    
    return (
        <main>
            <Form method="post"  className='pl-40'> 
                <h1 className='text-2xl text-eablue'>ASSISTANCE LOGIN</h1>

                <FormControl isRequired isInvalid={!data ? false : true}>
                    <FormHelperText> Bitte loggen Sie sich hier mit Ihrem üblichen OLE-Usernamen und Ihrem Paßwort ein: </FormHelperText>
                    {data?.message ? (
                        <FormErrorMessage>
                           {data.message}
                        </FormErrorMessage>
                    ) : null}

                    <FormLabel>Login:</FormLabel>
                
                    <Input 
                        name='username' 
                        type='text' 
                        size='sm' 
                        width='150'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        />
                </FormControl>

                <FormControl isRequired isInvalid={!data ? false : true}>
    
                    <FormLabel>Password:</FormLabel>

                    <Input name='password' 
                    type='password'
                    size='sm' 
                    width='150' />

                </FormControl>

                <Button
                        mt={4}
                        bg='ea.blue'
                        color='white' 
                        display='block'
                        type='submit'
                    >
                    Einloggen
                    </Button>
            </Form>
        
        </main>
    )
}
