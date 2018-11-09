package ignocide.service.todo.controller;


import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {
    @GetMapping
    public ResponseEntity getList(Pageable pageable) {
        return (ResponseEntity) ResponseEntity.ok();
    }
}
