import React from 'react';
import { Spinner } from '@chakra-ui/react';

function SpinnerComponent() {
  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
   
        <Spinner 
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        />
    </div>
  );
}

export default SpinnerComponent;