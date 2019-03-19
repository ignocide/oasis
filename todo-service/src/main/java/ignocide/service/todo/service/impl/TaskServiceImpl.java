package ignocide.service.todo.service.impl;

import ignocide.service.todo.domain.Step;
import ignocide.service.todo.domain.Task;
import ignocide.service.todo.exception.ResourceNotFoundException;
import ignocide.service.todo.repository.TaskRepository;
import ignocide.service.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Task findTodoById(Long todoId) {
        Task task = taskRepository.findTodoByIdAndDeletedFalse(todoId);
        if (task == null) {
            throw new ResourceNotFoundException();
        }
        return task;
    }

    @Override
    public Task update(Long todoId, Task updateTask) {
        Task target = findTodoById(todoId);
        target.setName(updateTask.getName());
        target.setDetail(updateTask.getDetail());
        return taskRepository.save(target);
    }

    @Override
    public Task updateStep(Long todoId, Step step) {
        Task target = findTodoById(todoId);
        target.setStep(step);
        return taskRepository.save(target);
    }

    @Override
    public void delete(Long todoId) {
        Task task = findTodoById(todoId);
        task.setDeleted(true);
        taskRepository.save(task);
    }

    @Override
    public List<Task> findTodosByBoardId(Long boardId) {
        Step step = Step.TODO;
        return taskRepository.findByBoardIdAndStepAndDeletedFalseOrderByIdDesc(boardId, step);
    }

    @Override
    public Page<Task> findDonesByBoardId(Long boardId, Pageable pageable) {
        Step step = Step.DONE;
        return taskRepository.findByBoardIdAndStepAndDeletedFalseOrderByIdDesc(boardId, step, pageable);
    }


}
