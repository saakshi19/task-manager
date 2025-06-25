package taskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import taskManager.repository.tables.Task;

import java.util.List;

@Repository
public interface TaskRepository
        extends JpaRepository<Task, Long>
{
    List<Task> getAllByDueDateEndingWith(String dueDate);

    List<Task> getAllByDueDateAfter(String dueDateAfter);
}
