import {useState} from 'react'
import {useForm} from '@mantine/form'
import { Group, Button,Modal,TextInput,Textarea } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { KeyedMutator } from 'swr';
import { ENDPOINT, Todo } from '../src/App';

function AddTodo({mutate} :  { mutate:KeyedMutator<Todo[]>}){
  // Open is the state variable that holds the current value (in this case, false initially).
 //setOpen is the function that updates the state.
 // // State to control the modal visibility

  const [open, setOpen] = useState(false)

  // The useForm hook from Mantine (or any form library) helps you handle form state and validation

  // The syntax { title: string; body: string } is TypeScript's way of specifying the shape of the values object, enforcing that any object passed to createTodo must contain a title and a body, both of which must be strings.
  async function createTodo(values: { title: string; body: string }) {
    // The variable updated will hold the result of the fetch operation.
    // 
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), //Convert the values object into a JSON string format so that it can be sent in the body of an HTTP request.
    }).then((r) => r.json());

    mutate(updated);
    form.reset();
    setOpen(false);
  }



  const form = useForm({
    initialValues: {
      title:"",
      body:"",
    },
  });

  return <>
  <MantineProvider>
    <Modal opened={open}
    onClose={() => setOpen(false)}
    title="Create ToDo"
    > 
    
    <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="Todo"
            placeholder="What do you want to do?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder="Tell me more..."
            {...form.getInputProps("body")}
          />

          <Button type="submit">Create todo</Button>
        </form>
    
    </Modal>


    <Group style={{ display: 'flex', justifyContent: 'center' }}>
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          ADD TODO
        </Button>
      </Group>
  </MantineProvider>


  
  </>


}


export default AddTodo