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
import type { ActionArgs } from '@remix-run/node';
import type { V2_MetaFunction } from '@remix-run/react';
import { useNavigation, Form } from '@remix-run/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { processData } from '~/utils/finscan';

export const meta: V2_MetaFunction = () => [{ title: "Sanktionslisten FinScan" }];

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const namesFile = formData.get("namesFile") as File;

  if ((!name || name.length === 0) && (!namesFile || namesFile.size === 0)) {
    throw new Error("Sie müssen entweder eine Datei oder Name eingeben!");
  }

  if (namesFile.type !== 'text/csv' && namesFile.type !== 'text/xml' && namesFile.type !== 'application/octet-stream') {
    throw new Error("Dieser Datei- oder MIME-Typ ist leider nicht zulässig!");
  }

  let apiResponse;
  if (name) {
    apiResponse = await processData(name);
  } else {
    apiResponse = await processData(namesFile);
  }

  return apiResponse;
}

export default function SanctionslistFinnscan() {
  const [name, setName] = useState('');

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
          accept=".csv, .xml, .dta"
          className='w-96 ml-1' />

        <FormHelperText className='ml-4 text-black'>(DTAUS, XML und CSV Dateien sind zulässig)</FormHelperText>

      </FormControl>

      <Button
        isLoading={ isLoading }
        bg='blue.500'
        color='white'
        display='block'
        type='submit'
        variant='outline'
      >
        { textButton }
      </Button>

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