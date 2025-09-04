### **Running the backend module:**

Run the `TaskManager` class (backend/src/main/java/taskManager/TaskManager.java)

### **Accessing the database using the terminal:**

`brew services restart postgresql`

`psql -U postgres`

`postgres=# \l`

`\c task_manager_db`

`task_manager_db=# select * from public.tasks;`

### APIs:
#### Add a new task

`curl --location 'http://localhost:8081/manager/task' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic YWRtaW46YWRtaW4=' \
--data '{
    "title": "Study",
    "description": "Leetcode 14 week course",
    "dueDate": "01/11/2025",
    "status": "NOT_STARTED",
    "priority": 1
}'`

#### View all tasks
`curl --location 'http://localhost:8081/manager/tasks' \
--header 'Authorization: Basic YWRtaW46YWRtaW4xMjM='`


