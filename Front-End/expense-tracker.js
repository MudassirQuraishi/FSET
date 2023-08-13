

// getting form data
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const myForm = document.getElementById('my-form');
const userList = document.getElementById('users');
const category =document.getElementById('category')


// Event Listeners
myForm.addEventListener('submit',fetchData);
document.addEventListener('DOMContentLoaded', loadServerDetails);


// Fucnctions
async function fetchData(e){
    e.preventDefault();
    const details = {
        amount : amount.value,
        description : description.value,
        category :  document.getElementById('category').options[document.getElementById('category').value].text,
    }
    try{
        const response = await axios.post('http://localhost:4000/expense/add-expense',details)
        createLiElement(response.data)
    }
    catch(error){
        console.log(error);
        alert (`Error creating User: ${error.message}`)
    }
}

function createLiElement(userData){

    const li = document.createElement('li');
    const div = document.createElement('div');
    div.className ='button-group'
    li.appendChild(document.createTextNode(`Category: ${userData.category}, Price: ${userData.price}, Description: ${userData.description}   `));
    var delbtn = document.createElement('button');
    delbtn.type='button'
    delbtn.className ='delete';
    delbtn.id = 'deleteButton'
    delbtn.appendChild(document.createTextNode('Delete'));
    div.appendChild(delbtn); 
    var editBtn = document.createElement('button')
    editBtn.type='button'
    editBtn.className ='edit';
    editBtn.id = 'editButton'
    editBtn.appendChild(document.createTextNode('Edit'));
    div.appendChild(editBtn); 

    li.appendChild(div)
       
    userList.appendChild(li);
    description.value = '';
    amount.value = '';
    category.selectedIndex =0;
    
    delbtn.onclick = async (e) => {
        const target = e.target.parentElement.parentElement;
        try{
        const id = userData.id
        const user = await axios.delete(`http://localhost:4000/expense/delete-expense/${id}`)
        userList.removeChild(target)
        }
        catch(e){
            console.log(e)
            alert(`Error deleting expense : ${e.message}`)
        }
    }
    editBtn.onclick = async(e)=>{
        const target = e.target.parentElement.parentElement;
        try{
            amount.value = userData.price;
            description.value = userData.description;
            category.value = userData.category;
            const options = category.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].text === userData.category) {
                    category.selectedIndex = i;
                    break;
                }
            }
            myForm.addEventListener('submit',async ()=>{
                try{
                    const id = userData.id;
                    const updatedData = {
                        price : amount.value,
                        description :description.value,
                        category : document.getElementById('category').options[document.getElementById('category').value].text
                    }
                    const user = await axios.put(`http://localhost:4000/expense/edit-expense/${id}`,updatedData)
                    userList.removeChild(target)
                }
                catch(error){
                    alert(`Error updating expense : ${error.message}`)
                }
            })  
        } 
        catch(error){
            console.log(error)
            alert (`Error editing user: ${error.message}`)
        }
    }
}

async function loadServerDetails() {
    try{
        const dbData = await axios.get('http://localhost:4000/expense/get-expense')
        const usersData =dbData.data;
        if(usersData.length<1){
            console.log("No users");
        }
        for(let i =0;i<usersData.length;i++){
            createLiElement(usersData[i]);
        }
    }
    catch(err){
        console.error(err);
        alert(`Error loading : ${err.message}`);
    }
}

