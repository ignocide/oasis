package ignocide.service.auth.controller.form;

import ignocide.service.auth.domain.User;
import lombok.Data;

@Data
public class UserForm {
    private String email;
    private String password;

    public User toUser(){
        return new User(this.email,this.password);
    }
}
