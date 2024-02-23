import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";

interface Claim {
  record_number: string;
  claim_number: string;
  update_date: string;
  update_user: string;
  claim_type: string;
  id_product: string;
}
interface ResultTableProps {
  claims: Claim[];
}

function ResultTable({claims}: ResultTableProps)  {
  return (
    <Box pl="7rem" pr="7rem" pb="4rem">
      <TableContainer>
        <Table colorScheme="ea.blue">
          <Thead>
            <Tr>
              <Th>Aktennummer</Th>
              <Th>Antragsnummer</Th>
              <Th>Datum</Th>
              <Th>Mitarbeiter</Th>
              <Th>Type</Th>
              <Th>Produkt</Th>
            </Tr>
          </Thead>
          <Tbody>
            {claims.map((claim, index) => (
              <Tr key={index}>
                <Td>{claim.record_number}</Td>
                <Td>{claim.claim_number}</Td>
                <Td>{claim.update_date}</Td>
                <Td>{claim.update_user}</Td>
                <Td>{claim.claim_type}</Td>
                <Td>{claim.id_product}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ResultTable;
