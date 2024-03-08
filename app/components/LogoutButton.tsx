import {
    Button
  } from '@chakra-ui/react'
import { Form} from "@remix-run/react";


export default function LogoutButton(){
    return(
        
             <Form action="/logout" method="post" id='logout'>
                <Button 
                    className="secondaryButton"
                    color='white'
                    _hover={{ bg: "#ff585d" }}
                    type='submit'
                >
                    Logout
                </Button>
            </Form>

           
    )
}