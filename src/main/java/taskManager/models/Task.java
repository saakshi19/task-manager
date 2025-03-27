package taskManager.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Task {
    Long id;
    String title;
    String description;
    int priority;
    String dueDate;
    String status;
}
