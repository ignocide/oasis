package ignocide.service.todo.service.impl;

import ignocide.service.todo.domain.Todo;
import ignocide.service.todo.exception.ResourceNotFoundException;
import ignocide.service.todo.repository.TodoRepository;
import ignocide.service.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {
    @Autowired
    TodoRepository todoRepository;

    @Override
    public List<Todo> findAllByBoardId(Long boardId) {
        return todoRepository.findByBoardIdAndDeletedFalse(boardId);
    }

    @Override
    public void create(Todo todo) {
        todoRepository.save(todo);
    }

    public Todo findTodoById(Long todoId){
        Todo todo = todoRepository.findTodoByIdAndDeletedFalse(todoId);
        if(todo == null){
            throw new ResourceNotFoundException();
        }
        return todo;
    }

    @Override
    public void update(Long todoId,Todo updateTodo) {
        Todo target = findTodoById(todoId);
        target.setName(updateTodo.getName());
        target.setDetail(updateTodo.getDetail());
        todoRepository.save(target);
    }

    @Override
    public void delete(Long todoId) {
        Todo todo = findTodoById(todoId);
        todo.setDeleted(true);
        todoRepository.save(todo);
    }

}
