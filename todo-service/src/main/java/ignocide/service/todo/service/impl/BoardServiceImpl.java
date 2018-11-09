package ignocide.service.todo.service.impl;

import ignocide.service.todo.domain.Board;
import ignocide.service.todo.repository.BoardRepository;
import ignocide.service.todo.service.BoardService;
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
    public Page<Board> findAll(Long userId, Pageable pageable) {
        return boardRepository.findByIdAndDeletedFalse(userId, pageable);
    }

    public Board findBoardByIdAndUserId(Long boardId, Long userId) {
        return boardRepository.findBoardByIdAndUserIdAndDeletedFalse(boardId, userId);
    }

    @Override
    public void create(Board board) {
        boardRepository.save(board);
    }
}
