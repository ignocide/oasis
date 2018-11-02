package ignocide.service.todo.repository.board;


import ignocide.service.todo.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BoardRepository extends PagingAndSortingRepository<Board, Long> {
    Page<Board> findAll(Pageable pageable);
}