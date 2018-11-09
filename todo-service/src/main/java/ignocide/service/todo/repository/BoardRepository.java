package ignocide.service.todo.repository;


import ignocide.service.todo.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findByIdAndDeletedFalse(Long boardId, Pageable pageable);

    Board findBoardByIdAndUserIdAndDeletedFalse(Long boardId, Long userId);

}