package taskManager.services;

import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import taskManager.mappers.TaskMappers;
import taskManager.models.Task;
import taskManager.repository.TaskRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskMappers taskMappers;

    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);

    public String addTask(Task task) {
        taskManager.repository.tables.Task taskDatabaseModel = taskMappers.toDatabaseModel(task);
        logger.info(taskDatabaseModel.toString());
        taskManager.repository.tables.Task taskModelObject = taskRepository.save(taskDatabaseModel);
        return taskModelObject.getId().toString();
    }

    public List<Task> getAllTasks() {
        List<Task> tasks = new ArrayList<>();
        List<taskManager.repository.tables.Task> db_tasks = taskRepository.findAll();
        for (taskManager.repository.tables.Task task : db_tasks) {
            tasks.add(taskMappers.toEntityModel(task));
        }
        return tasks;
    }

    public Task updateTask(Task updatedTask) {
        taskManager.repository.tables.Task existingTask = taskRepository.findById(updatedTask.getId())
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + updatedTask.getId()));

        if (updatedTask.getTitle() != null) {
            existingTask.setTitle(updatedTask.getTitle());
        }
        if (updatedTask.getDescription() != null) {
            existingTask.setDescription(updatedTask.getDescription());
        }
        if (updatedTask.getDueDate() != null) {
            existingTask.setDueDate(updatedTask.getDueDate());
        }
        if (updatedTask.getStatus() != null) {
            existingTask.setStatus(updatedTask.getStatus());
        }
        if (updatedTask.getPriority() != 0) {
            existingTask.setPriority(updatedTask.getPriority());
        }
        taskManager.repository.tables.Task savedTask = taskRepository.save(existingTask);
        return taskMappers.toEntityModel(savedTask);
    }

}
