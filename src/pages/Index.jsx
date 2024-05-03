import { Box, Flex, Heading, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No input',
        description: "You must write something to add a task.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={8}>
      <Flex direction="column" align="center" justify="center">
        <Heading mb={8}>Todo App</Heading>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }} width="100%" maxW="500px">
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            mr={2}
          />
          <Button colorScheme="blue" px={8} onClick={addTask}>Add</Button>
        </Flex>
        <List spacing={3} mt={6} width="100%" maxW="500px">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" bg={task.isCompleted ? 'green.100' : 'gray.100'} p={4}>
              <Flex align="center">
                <ListIcon as={FaCheckCircle} color={task.isCompleted ? 'green.500' : 'gray.500'} cursor="pointer" onClick={() => toggleTaskCompletion(task.id)} />
                <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.text}</span>
              </Flex>
              <IconButton icon={<FaTrash />} isRound="true" onClick={() => deleteTask(task.id)} aria-label="Delete task" />
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  );
};

export default Index;