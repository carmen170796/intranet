import {
    FormControl,
    FormLabel, 
    Select,
    RadioGroup,
    Radio,
    Input,
    Box,
    Stack,
    FormErrorMessage
  } from '@chakra-ui/react'
import React, { useState } from 'react'

function isDateInvalid(startDate:string, endDate:string){
    if (Date.parse(startDate) > Date.parse(endDate)){
        return  true
    }
    return false
}


export default function CommonFilters() {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [error, setError ] = useState(false)
    const handleEndDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = event.target.value
        setEndDate(newEndDate)
        isDateInvalid(startDate, newEndDate) ? setError(true) : setError(false)

        
    }

    const handleStartDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = event.target.value
        setStartDate(newStartDate)
        isDateInvalid(newStartDate, endDate)? setError(true) : setError(false)

    }

    return( 
        <>
            <Box>
                <FormControl isRequired>
                    <FormLabel as='legend'> Art der Bearbeitung</FormLabel>
                    <RadioGroup name="process" >
                        <Stack direction='row' spacing={10}>
                            <Radio value="0" checked>Bearbeitete</Radio>
                            <Radio value="1">Eröffnete</Radio>
                         </Stack>
                    </RadioGroup>
                </FormControl>
            </Box>
       
            <Box>
                <FormControl isRequired >
                    <FormLabel as='legend'>Status:</FormLabel>
                    <RadioGroup name="status">
                        <Stack direction='row' spacing={20}>
                            <Radio  value="1" checked>Aktive</Radio>
                            <Radio  value="9">Stornierte</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                <FormControl isInvalid={error}>
                    <FormLabel >Zeitraum von:</FormLabel>  
                    <Input name='startDate' type='date' value={startDate} onChange={handleStartDataChange}/> 
                    <FormErrorMessage>Start date must come before end date</FormErrorMessage>
                </FormControl>   
            </Box>
            <Box>
                <FormControl isInvalid={error}>
                        <FormLabel>Bis:</FormLabel>  
                        <Input name='endDate'  type='date' value={endDate} onChange={handleEndDataChange}/> 
                        <FormErrorMessage>End date must come after start date</FormErrorMessage>
                    </FormControl> 
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>Aktentyp:</FormLabel>
                            <Select name="type" placeholder='Select option'>
                                <option value='' >Alle Akten</option>
                                <option value="KFZ">KFZ-Akten</option>
                                <option value="MED">Medizinische Akten</option>
                                <option value="HOME">Home-Assistance (technische Akten)</option>
                                <option value="INFO">Service-Akten (Info)</option>
                        </Select>
                </FormControl>
                </Box>
                <Box>
                    <FormControl >
                        <FormLabel>Produkt</FormLabel>
                        <Input type="text" name="product"></Input>
                    </FormControl>
                </Box>

        </>
    )
}