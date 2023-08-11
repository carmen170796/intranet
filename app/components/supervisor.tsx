import {
    FormControl,
    Select,
  } from '@chakra-ui/react'


function WorkersDropdown (data:any) {
    if (data.error) {
        return <p> {data.error}</p>
    }
    else {
        if (data.data.length === 0) {
            <p>Es konnten keine Mitarbeiter entsprechend des Profils gefunden werden</p>
        }
        else {
            return 
                <FormControl>
                    <Select  name='ma'>
                        <option value='' >Alle</option>
                        {data.data.map(worker=> 
                            <option 
                                key={worker["ID_USUARIO"]}
                                value={worker["ID_USUARIO"]}> 
                                {worker["DEFINICION_USUARIO"]}
                            </option>
                        )}
                    </Select>                
                </FormControl>
        }
    }
}

function  claimsWorkers ({ profil, data, user}) {
    if (profil === 999) {
      return (
        <>
            <p>Für Teamleiter: Falls nur Akten eines bestimmten Mitarbeiters gewünscht sind:</p>
            <p>Mitarbeiter-Login:</p>
            <WorkersDropdown/>
        </>
      )
    }
    return <input type="hidden" name="ma" value={user}/>
  }

  export default claimsWorkers
  