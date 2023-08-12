const amount = document.getElementById("amount");
const description = document.getElementById("description");
const myForm = document.getElementById('my-form');
const userList = document.getElementById('users');
const category =document.getElementById('category')

myForm.addEventListener('submit',fetchData);

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
    }catch(error){
        console.log(error);
    }
}

function createLiElement(userData){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`Category: ${userData.category}, Price: ${userData.price}, Description: ${userData.description}   `));
    var delbtn = document.createElement('button');
    delbtn.type='button'
    delbtn.className ='delete';
    delbtn.id = 'deleteButton'
    delbtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(delbtn); 
    var editBtn = document.createElement('button')
    editBtn.type='button'
    editBtn.className ='edit';
    editBtn.id = 'editButton'
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editBtn); 
       
    userList.appendChild(li);
    
    description.value = '';
    amount.value = '';
    category.selectedIndex =0;

    delbtn.onclick = async (e) => {
        const target = e.target.parentElement;
        try{
        const id = userData.id

        const user = await axios.delete(`http://localhost:4000/expense/delete-expense/${id}`)
        userList.removeChild(target)
        }catch(e){
            console.log(e)
        }
    }
    editBtn.onclick = async(e)=>{
        const target = e.target.parentElement;
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

            const id = userData.id;

            const user = await axios.delete(`http://localhost:4000/expense/delete-expense/${id}`)
            userList.removeChild(target)
        } catch(error){
            console.log(error)
        }
    }
}

document.addEventListener('DOMContentLoaded', loadServerDetais);
async function loadServerDetais() {
    try{
        const dbData = await axios.get('http://localhost:4000/expense/get-expense')
        const usersData =dbData.data;
        if(usersData.length<1){
            console.log("No users");
        }

        for(let i =0;i<usersData.length;i++){
            createLiElement(usersData[i]);
        }

    }catch(err){
        console.log(err);
    }
}

