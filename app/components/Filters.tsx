import {
    Button,
    Box,
    Stack,
    Text,
    Input
  } from '@chakra-ui/react'


import CommonFilters from './CommonFilters';
import WorkersDropdown from './WorkersDropdown';



  export default function Filters ({data}) {
    
    return (
        <Box pl='7rem' pb='2rem'>
                    <Text pb={4}  fontSize='md'>Hier können Sie einschränken, welche Akten Sie sehen wollen:</Text>
                    <Stack width={'15rem'}>
                        <CommonFilters/>

                        { data.profil == "999" 
                            ? <WorkersDropdown data={data.data}/>
                            : <Input type="hidden" name="ma" value={data.user}/>
                        }

                        <Button
                            mt={4}
                            _hover={{ bg: "blue.500" }}  
                            className="primaryButton"
                            color='white' 
                            display='block'
                            type='submit'
                        >
                            Akte anzeigen
                        </Button>
                    </Stack>
        </Box>
    )
} 