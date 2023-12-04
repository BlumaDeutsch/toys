const baseUrl = "http://localhost:1200/api/v1"

// const showAllTasks = async () => {
//     await axios.get(`${baseUrl}/tasks`).then(res => {
//         const tasks = res.data;
//         tasks.map(task => {
//             container.innerHTML += `
//             <h3>Title: ${task.title}</h3>
//             <p><b>Description: ${task.description}<b/></p>
//             <h5>Status: ${task.status}</h5>
//             <h5>Date: ${task.dueDate}</h5>
//             <h5>Is Done: ${task.isDone}</h5>
//             <br/>
//             `
//         })
//         console.log(tasks);
//     }).catch(err => {
//         console.log(err);
//     })
// }
// showAllTasks();

// const createTask = async (e) => {
//     e.preventDefault();
//     let isDone = false;
//     const title = document.getElementById("title").value;
//     const description = document.getElementById("description").value;
//     const dueDate = document.getElementById("dueDate").value;
//     const status = document.getElementById("status").value;
//     const checkboxDone = document.getElementById("checkboxDone").value;
//     if (checkboxDone == "on")
//         isDone = true;
//     console.log(isDone);
//     await axios.post(`${baseUrl}/tasks`, { title, description, dueDate, isDone, status }).then(res => {
//         console.log(res.data);
//     }).catch(err => {
//         console.log(err);
//     })
// }
// saveTask.addEventListener("click", createTask);
