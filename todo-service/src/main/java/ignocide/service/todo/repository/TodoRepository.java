package ignocide.service.todo.repository;


import ignocide.service.todo.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByBoardId(Long boardId);

}