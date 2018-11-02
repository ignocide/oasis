package ignocide.service.todo.service.user.impl;

import ignocide.service.todo.domain.Board;
import ignocide.service.todo.repository.board.BoardRepository;
import ignocide.service.todo.service.user.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

//import javax.transaction.Transactional;

//@Transactional
@Service
public class BoardServiceImpl implements BoardService {
    @Autowired
    private BoardRepository boardRepository;

    @Override
    public Page<Board> findAll(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    @Override
    public void create(Board board){
        boardRepository.save(board);
    }
}
