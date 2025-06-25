package taskManager.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import taskManager.models.Task;
import taskManager.services.TaskService;

import java.util.List;

@RestController
@RequestMapping("/manager")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("API is working!");
    }

    @GetMapping("/tasks")
    @ResponseBody
    public ResponseEntity<List<Task>> tasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @PostMapping("/task")
    public ResponseEntity<String> addTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.addTask(task));
    }

    @PostMapping("task/update")
    public ResponseEntity<String> updateTask(@RequestBody Task task) {
        return ResponseEntity.ok("No task updated!");
    }
}
