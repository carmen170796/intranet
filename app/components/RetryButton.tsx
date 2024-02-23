import {
    Button
  } from '@chakra-ui/react'
import { Link} from "@remix-run/react";


export default function RetryButton(){
    return(
        
             <Link to="/">
                <Button 
                    bg='#00239c' 
                    color='white'
                    _hover={{ bg: '#00639c' }}
                >
                    Erneut suchen
                </Button>
            </Link>

           
    )
}