package ignocide.service.todo.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND, reason="Resource can not found")
public class ResourceNotFoundException extends RuntimeException{

}
