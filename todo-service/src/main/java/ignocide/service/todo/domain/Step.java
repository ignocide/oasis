package ignocide.service.todo.domain;

public enum Step {
    TODO("TODO"),
//    DOING("DOING"),
    DONE("DONE");


    private final String label;

    Step(String label) {
        this.label = label;
    }

}
