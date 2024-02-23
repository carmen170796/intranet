import {
    FormControl,
    Select,
    FormLabel
  } from '@chakra-ui/react'

  interface User {
    username: string;
    name: string;
  }
  interface Data_User {
    data:{
      error: string | undefined;
      workers: Array<User> ; 
    }
  }

  function sortByProperty<T>(array: T[], property: keyof T): T[] {
    return array.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
  }

function WorkersDropdown (data:Data_User) {
    if (data.data.error) {
        return <p> {data.data.error}</p>
    }
    else  {
        if (data.data.workers.length === 0) {
            return <p>Es konnten keine Mitarbeiter entsprechend des Profils gefunden werden</p>
        }
        data.data.workers = sortByProperty(data.data.workers, "name")
        return (
                <FormControl >
                    <FormLabel>Mitarbeiter</FormLabel>
                    <Select  name='ma' >
                        <option value='' >Alle</option>
                        {data.data.workers.map(worker=> 
                            <option 
                                key={worker.username}
                                value={worker.username}> 
                                {worker.name}
                            </option>
                        )}
                    </Select>
                </FormControl>  
        )              
    }
}

export default WorkersDropdown  