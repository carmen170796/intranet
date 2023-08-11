import {
    Button,
    FormControl,
    FormLabel, 
    Select,
    RadioGroup,
    Radio,
    Input,
    Box,
    Stack,
    Text
  } from '@chakra-ui/react'


  import { Form} from "@remix-run/react";
  //$vonDef = mktime(0, 0, 0, date("m"),  date("d")-5,  date("Y"));
  //$vonDef = date("d.m.Y", $vonDef);
  //$bisDef = date("d.m.Y");
  export default function Filters () {
    return (
    <Box ml='7rem'>
       <Form>
            <Text pb={4}  fontSize='md'>Hier können Sie einschränken, welche Akten Sie sehen wollen:</Text>
            <Stack width={'15rem'}>
                <Box>
                    <FormControl>
                        <FormLabel> Art der Bearbeitung</FormLabel>
                        <RadioGroup name="eroeffnet" >
                            <Stack direction='row' spacing={10}>
                                <Radio value="0" checked>Bearbeitete</Radio>
                                <Radio value="1">Eröffnete</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </Box>
       
                <Box>
                    <FormControl>
                        <FormLabel>Status:</FormLabel>
                            <RadioGroup name="status">
                                <Stack direction='row' spacing={20}>
                                    <Radio  value="1" checked>Aktive</Radio>
                                    <Radio  value="9">Stornierte</Radio>
                                </Stack>
                            </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>Zeitraum von:</FormLabel>  
                        <Input name='von'></Input>  
                    </FormControl>   
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>Bis (Format: dd.mm.yyyy):</FormLabel>  
                        <Input name='bis'></Input>  
                    </FormControl> 
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>Aktentyp:</FormLabel>
                            <Select name="typ" placeholder='Select option'>
                                <option value='' >Alle Akten</option>
                                <option value="KFZ">KFZ-Akten</option>
                                <option value="MED">Medizinische Akten</option>
                                <option value="HOME">Home-Assistance (technische Akten)</option>
                                <option value="INFO">Service-Akten (Info)</option>
                        </Select>
                </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>Produkt</FormLabel>
                        <Input type="text" name="produkt"></Input>
                    </FormControl>
                </Box>
            </Stack>
                      
            <Button
                        mt={4}
                        bg='ea.blue'
                        color='white' 
                        display='block'
                        type='submit'
                    >
                    Akte anzeigen
                    </Button>
        </Form>
    </Box>
    )
} 