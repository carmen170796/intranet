import { Flex, Spacer, Box, } from '@chakra-ui/react'

export default  function Header () {

    return (
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box>
                <img id='logo' src="logo.jpg" alt="Logo Europ Assistance/Generali" />
            </Box>
            <Spacer/>
         
        </Flex>
    )
} 

