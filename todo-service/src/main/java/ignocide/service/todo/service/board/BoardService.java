package ignocide.service.todo.service.board;

import ignocide.service.todo.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface BoardService {
    Page<Board> findAll(Pageable pageable);
    void create(Board user);
}
