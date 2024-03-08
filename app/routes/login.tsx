import {
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    FormHelperText,
  } from '@chakra-ui/react'

  import type { ChangeEvent} from 'react';
  import { useState} from 'react';
  import {type ActionArgs, json, redirect, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node';
  import { loginUser} from '~/utils/login'
  import { getSession, commitSession } from './sessions';
  import { Form, useActionData, useNavigation} from "@remix-run/react";

function validateUsername (username: any) {
    if (typeof username !== "string" || username.length === 0 ){
        return "Bitte geben Sie Ihre Anmeldeinformationen ein"
   }
}

function validatePassword (password: any) {
    if (typeof password !== "string" || password.length === 0 ){
        return "Bitte geben Sie Ihre Anmeldeinformationen ein"
   }
}

function resultRequest ( message:any , status:number) {
    return json({message: message, status: status})
}

// check whether the user already has a session, if so redirect to dashboard
export async function loader({ request} : LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    if (session.has("login") && session.get("login") != null ) {
        return redirect('/');        
    }
    return null
}

//check the submitted data and answer accordinly 
export async function action({ request }: ActionArgs) {

    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();
    const username= formData.get("username") as string
    const password = formData.get("password") as string

    const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
    }

    if (Object.values(fieldErrors).some(Boolean)) {
        return resultRequest( {fieldErrors}, 400 )
    }
    
    try{
        const result = await loginUser(username,password)
        
        session.set("login", result.user_ok);
        session.set("loginUsername", result.user_name);
        session.set("profile", result.user_profil);
        session.set("error", result.user_error);
        session.set("user", result.user_username);

        return redirect('/', {
            headers: {
            "Set-Cookie": await commitSession(session),
            },
        })

           
    }
    catch(err:any){
        return resultRequest( err.message, err.status)
    }
}

export const meta: V2_MetaFunction = () => [{ title: "Login" }];

export default function Login() {
    const [username, setUsername] = useState('');
    const error = useActionData<typeof action>();

    const navigation = useNavigation();
    const textButton = navigation.state === "submitting" ? "Warten": "Einloggen";
    const isLoading = navigation.state === "submitting";

    return (
            <Form method="post"  className='pl-40'> 
                <h1 className='text-2xl text-eablue'>ASSISTANCE LOGIN</h1>

                <FormControl isRequired isInvalid={!error ? false : true}>
                    <FormHelperText> Bitte loggen Sie sich hier mit Ihrem üblichen OLE-Usernamen und Ihrem Paßwort ein: </FormHelperText>
                    {error?.message ? (
                        <FormErrorMessage>
                           {error.message}
                        </FormErrorMessage>
                    ) : null}

                    <FormLabel>Login:</FormLabel>
                
                    <Input 
                        name='username' 
                        type='text' 
                        size='sm' 
                        width='150'
                        value={username}
                        onChange={(event:ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                        autoComplete='username'
                        />
                </FormControl>

                <FormControl isRequired isInvalid={!error ? false : true}>
    
                    <FormLabel>Password:</FormLabel>

                    <Input name='password' 
                    type='password'
                    size='sm' 
                    width='150' />

                </FormControl>

                <Button 
                        isLoading={isLoading}
                        mt={4}
                        className="primaryButton"
                        _hover={{ bg: "blue.500" }}  
                        color='white' 
                        display='block'
                        type='submit'                      
                    >
                    {textButton}
                    </Button>
            </Form>
    )
}
