package taskManager.mappers;

import org.springframework.stereotype.Component;
import taskManager.models.Task;

@Component
public class TaskMappers {

    public taskManager.repository.tables.Task toDatabaseModel(Task task) {
        taskManager.repository.tables.Task taskDatabaseModel = new taskManager.repository.tables.Task();
        taskDatabaseModel.setTitle(task.getTitle());
        taskDatabaseModel.setDescription(task.getDescription());
        taskDatabaseModel.setPriority(task.getPriority());
        taskDatabaseModel.setDueDate(task.getDueDate());
        taskDatabaseModel.setStatus(task.getStatus());
        return taskDatabaseModel;
    }

    public Task toEntityModel(taskManager.repository.tables.Task task) {
        Task taskEntity = new Task();
        taskEntity.setId(task.getId());
        taskEntity.setTitle(task.getTitle());
        taskEntity.setDescription(task.getDescription());
        taskEntity.setPriority(task.getPriority());
        taskEntity.setDueDate(task.getDueDate());
        taskEntity.setStatus(task.getStatus());
        return taskEntity;
    }
}
