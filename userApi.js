const apiUrl = "https://60f2e13d6d44f300177887df.mockapi.io/users"
async function getData() {
    let response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data);
    createTable(data);
}
getData();

async function createUser() {
    try {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify({ name, email }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        document.querySelector("form").reset();
        alert("User added successfully");
        document.getElementById("tbody").innerHTML = "";
        getData();
    } catch (error) {
        console.log(error);
    }
}
function createTable(data) {
    let tbody = document.getElementById("tbody");
    data.forEach(element => {
        tbody.innerHTML += `<tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.email}</td>
        </tr>`;
    });
}

async function deleteUser() {
    try {
        let id = document.getElementById("id").value
        if(id==="")
        {
            alert("enter a valid ID to delete")
        }
        let response = await fetch(apiUrl + `/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        
        document.querySelector("form").reset();
        alert("User Deleted")
        document.getElementById("tbody").innerHTML = "";
        getData();
    } catch (error) {
        console.log(error);
    }
}

async function editUser() {
    try {
        let id = document.getElementById("id").value
        if(document.getElementById("id") ==='')
        {
            alert("enter id to edit the user")
        }
        let response = await fetch(apiUrl + `/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });


        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        if (name === '' || email === '') 
        { alert("Enter fields to change") }
        else{
        let res = await fetch(apiUrl + `/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name, email }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        document.querySelector("form").reset();
        alert("User Edited")
        document.getElementById("tbody").innerHTML = "";
        getData()
    }
    } catch (error) { console.log(error) }


}
