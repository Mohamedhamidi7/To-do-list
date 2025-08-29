const popBoxBTN = document.querySelectorAll('.popBox');

for(e of popBoxBTN){
    e.setAttribute('onclick',`showSettingBox(true,'${e.value}')`);
}
const allTasks = [];
let taskId = 0;
let displayedTasks = allTasks;
let tasksForm = document.querySelector('#tasksSettings');
const categories = []
let categoryId = 0
function showSettingBox(status,type){
    if(status == true){
        document.getElementById('settingBox').style.display='flex';
        document.getElementById('closeBox').addEventListener('click',()=>{showSettingBox(false)});
        switch (type){
            case 'cat':
                
                document.getElementById('categoriesSettings').style.display ='flex';
                document.getElementById('settingBoxName').innerHTML = 'Add a category';
                break;
            case 'tas':
                if(categories.length==0){
                    document.getElementById('settingBoxName').innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Notice';
                    document.getElementById('errorMSG').style.display ='flex';
                    break;
                }
                document.getElementById('tasksSettings').style.display ='flex';
                document.getElementById('settingBoxName').innerHTML = 'Add a task';
                break;
            default:
                break;
        }
        
    }else{
        document.getElementById('settingBox').style.display='none';
        document.getElementById('categoriesSettings').style.display ='none';
        document.getElementById('tasksSettings').style.display ='none';
        document.getElementById('errorMSG').style.display ='none';
    }
}
function addTask(newTask){
    allTasks.push(newTask);
    console.log("New Task is added");
    displayTasks();
}
function removeTask(taskId){
    if(allTasks.length==0){
        console.log("No DATA");
        displayTasks();
    }else{
        allTasks.forEach((e)=>{
            if(e.taskId==taskId){
                console.log(allTasks.indexOf(e));
                allTasks.splice(allTasks.indexOf(e),1);
                return;
            }
        });
        displayTasks();
    }  
}
function creatTask(title, description, category, doTime){
    console.log("New Task is created");
    console.log("taskId incremented");
    return {title:title, description:description, category:category, doTime:doTime , isFavourit : false, taskId:taskId++}
}
function displayTasks(){
    if(allTasks.length==0){
        console.log("No DATA");
        document.getElementById('tasksDisplay').innerHTML =''
    }else{
        document.getElementById('tasksDisplay').innerHTML =''
        displayedTasks.forEach((e) => {
            document.getElementById('tasksDisplay').innerHTML += `
                <section class="oneTask" >
                <article>
                    <time>${e.doTime}</time>
                    <h3>${e.title}</h3>
                    <p>${e.description}</p>
                    <ul>
                        <li><i class="fa-solid fa-hashtag"></i>${e.category}</li>
                    </ul>
                </article>
                <div>
                    <button class="settingBtn secondaryBtn" onclick="removeTask(${e.taskId})">
                        <i class="fa-solid fa-ellipsis"></i>
                    </button>
                </div>
                </section>
            `
            console.log("Display updated");
        });    
    } 
}
tasksForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const taskTitle= document.getElementById('taskTitle'); 
    const taskDescription= document.getElementById('taskDescription'); 
    const taskDate= document.getElementById('taskDate'); 
    const taskCategory= document.getElementById('taskCategory');
    addTask(creatTask(taskTitle.value, taskDescription.value,taskCategory.value, taskDate.value.replace('T',' | ')));
    showSettingBox(false);
    taskTitle.value= '' 
    taskDescription.value=  ''
    taskDate.value= ''
    taskCategory.value= ''
});
function creatCategory(name, color){
    console.log("New Category is created");
    console.log("categoryId incremented");
    return {name:name, color:color, categoryId:categoryId++}
}
function addCategory(newCategory){
    categories.push(newCategory);
    console.log("New Category is added");
    displayCategories();
}
function removeCategory(categoryId){
    if(categories.length==0){
        console.log("No DATA");
        displayCategories();
    }else{
        categories.forEach((e)=>{
            if(e.categoryId==categoryId){
                console.log(categories.indexOf(e));
                categories.splice(categories.indexOf(e),1);
                return;
            }
        });
        displayCategories();
    }  
}
function displayCategories(){
    if(categories.length==0){
        console.log("No Category Available");
        document.getElementById('categoriesDisplay').innerHTML =''
        document.getElementById('categoriesInput').innerHTML =''
    }else{
        document.getElementById('categoriesDisplay').innerHTML =''
        document.getElementById('categoriesInput').innerHTML = ''
        categories.forEach((e) => {
            document.getElementById('categoriesDisplay').innerHTML += `
                <li>
                        <i class="fa-solid fa-hashtag" style="color:${e.color}"></i>${e.name.trim().toLowerCase()}
                        <button id="categorySettingsBTN${e.categoryId}" class="settingBtn secondaryBtn"><i class="fa-solid fa-ellipsis" onclick="removeCategory(${e.categoryId})"></i></button>
                </li>
            `;
            document.getElementById('categoriesInput').innerHTML += `
                <option value="${e.name}">${e.name.toLowerCase()}</option>
            `;
            console.log("Display updated");
        });    
    } 
}
let categoriesForm = document.querySelector('#categoriesSettings');
categoriesForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const categoryName= document.getElementById('categoryName'); 
    const categoryColor= document.getElementById('categoryColor'); 
    addCategory(creatCategory(categoryName.value, categoryColor.value));
    showSettingBox(false);
    categoryName.value= '' 
    categoryColor.value=  '#e033ff'
});
// addTask(creatTask('Task 1','sdfgssd fgs d fg s dfg  df g d fg   dfg','Gym','1234123412'));
// addTask(creatTask('B','2','3','4'));
// addTask(creatTask('C','2','3','4'));
// removeTask(1);
// console.log(allTasks);

