import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  ListItem,
  OrderedList,
  UnorderedList
} from '@chakra-ui/react'
import { Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, Td } from '@chakra-ui/table';
import type { ActionArgs } from '@remix-run/node';
import type { V2_MetaFunction } from '@remix-run/react';
import { useNavigation, Form, useActionData } from '@remix-run/react';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import exportPDF from '~/components/ExportPDF';

import { processData } from '~/utils/finscan';
import type { APIResponse } from '~/utils/types';

export const meta: V2_MetaFunction = () => [{ title: "Sanktionslisten FinScan" }];

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const namesFile = formData.get("namesFile") as File;

  if ((!name || name.length === 0) && (!namesFile || namesFile.size === 0)) {
    throw new Error("Sie müssen entweder eine Datei oder Name eingeben!");
  }

  if (!namesFile && namesFile.type !== 'text/csv') {
    throw new Error("Dieser Datei- oder MIME-Typ ist leider nicht zulässig!");
  }

  if (name) {
    return [await processData(name) as Partial<APIResponse>];
  } else {
    return await processData(namesFile) as Array<Partial<APIResponse>>;
  }
}

export default function SanctionslistFinnscan() {
  const [name, setName] = useState("");
  const [results, setResults] = useState<Array<Partial<APIResponse>>>([]);

  const formSubmitData = useActionData<typeof action>();
  useEffect(() => {
    setResults(formSubmitData as Array<Partial<APIResponse>>);
  }, [formSubmitData]);

  const navigation = useNavigation();
  const textButton = navigation.state === "submitting" ? "Warten" : "Prüfen";
  const isLoading = navigation.state === "submitting";

  return (
    <Form method="post" className='pl-40' encType='multipart/form-data'>
      <h1 className='text-xl text-eablue'>Sanktionslisten FinScan</h1>
      <h3 className='text-m text-eablue'>Sie haben hier zwei Möglichkeiten:</h3>
      <UnorderedList className='ml-4'>
        <ListItem className='text-m text-eablue'>Manuelle Überprüfung: einen Namen eingeben.</ListItem>
        <ListItem className='text-m text-eablue'>Automatisierte Überprüfung: eine Datei hochladen.</ListItem>
      </UnorderedList>

      <FormControl className='flex flex-row my-4'>

        <FormLabel>Namen eingeben:</FormLabel>

        <Input
          name='name'
          type='text'
          size='sm'
          className='w-96'
          value={ name }
          onChange={ (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value) }
        />
      </FormControl>

      <FormControl className='flex flex-row mt-4'>

        <FormLabel>Datei hochladen:</FormLabel>

        <Input name='namesFile'
          type='file'
          size='sm'
          accept=".csv"
          className='w-96 ml-1' />

        <FormHelperText className='ml-4 text-black'>(Nur CSV Dateien sind zulässig)</FormHelperText>

      </FormControl>

      <div className='flex flex-row justify-between'>
        <Button
          isLoading={ isLoading }
          mt={ 4 }
          bg='ea.blue'
          _hover={ { bg: "blue.500" } }
          color='white'
          display='block'
          type='submit'
        >
          { textButton }
        </Button>
        <Button
          onClick={ exportPDF }
          mt={ 4 }
          mr={ 4 }
          bg='ea.blue'
          _hover={ { bg: "blue.500" } }
          color='white'
          display='block'>Export PDF</Button>
      </div>

      {
        (results && results.length > 0) && <TableContainer>
          <Table variant='simple' id='results-table'>
            <TableCaption placement='top'>Ergebnisse am { new Date().toDateString() }</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Found</Th>
                <Th>Message</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                results && results.length > 0 && results.filter((result) => result.returned != 0).map((result, index) =>
                  <Tr key={ result.searchResults ? `result.searchResults[0].clientName_${index}` : result.clientId }>
                    <Td>{ result.searchResults ? result.searchResults[0].clientName : result.clientId }</Td>
                    <Td>{ result.returned }</Td>
                    <Td>{ result.message }</Td>
                  </Tr>
                )
              }
            </Tbody>
          </Table>
        </TableContainer>
      }

      <h2 className='text-red-600 font-bold mt-4'>Achtung: Das ist keine Testumgebung. Bitte nur erforderliche Prüfungen vornehmen, keine Testprüfungen.</h2>
      <h3 className='text-m text-eablue mt-4'>Folgende Informationen müssen geprüft werden:</h3>
      <OrderedList className='ml-4'>
        <ListItem className='text-m'>Vollständiger Firmenname</ListItem>
        <ListItem className='text-m'>Bekannte Abkürzungen des Firmennamens</ListItem>
        <ListItem className='text-m'>Namen der gesamten Geschäftsführung bzw. Aufsichtsräte (falls zutreffend/bekannt)</ListItem>
      </OrderedList>
      <h2 className='mt-4'>Eine Kurzbeschreibung der erforderlichen Schritte (insbesondere Dokumentation, Ablage, Vorgehen bei Treffern) ist hier hinterlegt. </h2>
      <h2 className='mt-4'>Die Suche wird über eine externe Schnittstelle ausgeführt und kann abhänging von der Größe der hochgeladenen Datei unterschiedlich lang dauern. Bitte in diesem Fall das Browser-Fenster nicht schließen und das Ergebnis der Suche abwarten.</h2>

    </Form>
  )
}