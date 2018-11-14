package ignocide.service.todo.service.impl;

import ignocide.service.todo.domain.Step;
import ignocide.service.todo.domain.Task;
import ignocide.service.todo.exception.ResourceNotFoundException;
import ignocide.service.todo.repository.TaskRepository;
import ignocide.service.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    TaskRepository taskRepository;

    @Override
    public List<Task> findAllByBoardId(Long boardId) {
        return taskRepository.findByBoardIdAndDeletedFalse(boardId);
    }

    @Override
    public Task findById(Long todoId) {
        return taskRepository.findTodoByIdAndDeletedFalse(todoId);
    }

    @Override
    public Task create(Task task) {

        return taskRepository.save(task);
    }

    public Task findTodoById(Long todoId){
        Task task = taskRepository.findTodoByIdAndDeletedFalse(todoId);
        if(task == null){
            throw new ResourceNotFoundException();
        }
        return task;
    }

    @Override
    public void update(Long todoId,Task updateTask) {
        Task target = findTodoById(todoId);
        target.setName(updateTask.getName());
        target.setDetail(updateTask.getDetail());
        taskRepository.save(target);
    }

    @Override
    public void updateStep(Long todoId, Step step) {
        Task target = findTodoById(todoId);
        target.setStep(step);
        taskRepository.save(target);
    }

    @Override
    public void delete(Long todoId) {
        Task task = findTodoById(todoId);
        task.setDeleted(true);
        taskRepository.save(task);
    }



}
