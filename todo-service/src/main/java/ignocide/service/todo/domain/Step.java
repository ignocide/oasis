package ignocide.service.todo.domain;

public enum Step {
    TODO("To Do"),
    DOING("Doing"),
    DONE("Done");


    private final String label;

    Step(String label) {
        this.label = label;
    }

}
