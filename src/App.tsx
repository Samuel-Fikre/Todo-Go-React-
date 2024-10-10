import { Box, List,ThemeIcon} from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { CheckCircleFillIcon } from "@primer/octicons-react";
import useSWR from 'swr';
import AddTodo from '../components/AddTodo'
import './App.css';

// In TypeScript, an interface is a way to define the structure of an object. It specifies what properties the object should have and their types.

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}


export const ENDPOINT = 'http://localhost:8080'


// The function takes a single parameter url of type string, indicating that it expects a URL as an input

// fetch(url)

// The fetch function is called with the provided url. This function returns a Promise that resolves to the Response object representing the response to the request.
// The .json() method is called on the response object, which reads the response body and parses it as JSON.



const fetcher = (url: string) => 
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
// Move console.log above the return statement
  // useswr
  // This hook provides an easy way to fetch, cache, revalidate, and mutate data. It stands for Stale-While-Revalidate, a caching strategy that allows the page to show stale data while re-fetching for the latest data in the background.

  //'api/todos':
   // This is the key or the URL from which the data is being fetched. Its commonly used as the identifier for caching and re-fetching the data. In this case, you're requesting data from the /api/todos endpoint.

   //This is the response from the api/todos endpoint. It will contain the fetched data from that URL.
   //mutate is a function provided by SWR to manually update (or "mutate") the data in the cache. This is useful when you want to revalidate or update the cached data without refetching it from the serve


  const {data, mutate} = useSWR<Todo[]>('api/todos', fetcher)

  async function markTodoAdDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());

    mutate(updated);
  }

  return (
    <MantineProvider>
      <Box style={{
        padding: "2rem",
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto"
      }}>
        <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo) => {
          return (
            <List.Item
              onClick={() => markTodoAdDone(todo.id)}
              key={`todo_list__${todo.id}`}
              icon={
                todo.done ? (
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon color="gray" size={24} radius="xl">
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                )
              }
            >
              {todo.title}
            </List.Item>
          );
        })}
      </List>
       
       <AddTodo mutate={mutate} />
      </Box>
    </MantineProvider>

  );
}

export default App;
