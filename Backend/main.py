from fastapi import FastAPI, HTTPException, Depends
from typing import Optional, List, Dict
from pydantic import BaseModel
from uuid import UUID, uuid4
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Declare origins
origins = [
    "http://localhost:5173",
    "localhost:5173"
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define ToDoItem model
class ToDoItem(BaseModel):
    id: UUID
    title: str
    type: str
    date: str
    description: str
    completed: bool = False

# Define UpdateTodo model
class UpdateTodo(BaseModel):
    id: Optional[UUID] = None
    title: Optional[str] = None
    type: Optional[str] = None
    date: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

# Empty todo dictionary
todos: Dict[UUID, ToDoItem] = {}

# Fetch all todos
@app.get('/todos')
def get_all_todos():
    return list(todos.values())

# Fetch todo by id
@app.get('/todos/{id}')
def get_todo(id: UUID):
    if id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todos[id]

# Add new todo
@app.post('/todos/new')
def post_todo(todo: ToDoItem) -> dict:
    todos[todo.id] = todo
    return {"data": "Todo added."}

# Update todo
@app.put("/todos/edit/{id}")
async def update_todo(id: UUID, todo: UpdateTodo):
    if id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")

    if todo.title is not None:
        todos[id].title = todo.title
    if todo.type is not None:
        todos[id].type = todo.type
    if todo.date is not None:
        todos[id].date = todo.date
    if todo.description is not None:
        todos[id].description = todo.description
    if todo.completed is not None:
        todos[id].completed = todo.completed
    
    return todos[id]

# Delete todo
@app.delete("/todos/delete/{id}")
async def delete_todo(id: UUID):
    if id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    del todos[id]
    return {"msg": "Todo has been deleted successfully"}
