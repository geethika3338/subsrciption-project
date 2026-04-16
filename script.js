
// REGISTER

let regForm = document.getElementById("regForm");

if (regForm) {
    regForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        //  Validation
        if (name.length < 3) {
            alert("Name must be at least 3 characters");
            return;
        }
        if (!email.includes("@")) {
            alert("Invalid email");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }
        //  Send to backend
        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(res => res.text())
        .then(data => {
            alert(data);

            // store email for session
            localStorage.setItem("userName", email);

            // go to login
            window.location.href = "login.html";
        })
        .catch(err => {
            alert("Server error");
            console.log(err);
        });

    });
}


//  LOGIN

let loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        if (email === "" || password === "") {
            alert("Please fill all fields");
            return;
        }
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
.then(data => {
    if (data.message === "Login Successful") {
        alert("Login Successful");
        localStorage.setItem("userName", email);
        //  IMPORTANT (STORE PLAN)
        if (data.plan) {
            localStorage.setItem("selectedPlan", data.plan);
        }
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Email or Password");
    }

})
        .catch(err => {
            alert("Server error");
            console.log(err);
        });

    });
}



//  SELECT PLAN

function selectPlan(plan){
    let email = localStorage.getItem("userName");
    fetch("http://localhost:3000/select-plan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, plan })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        // SAVE LOCALLY (VERY IMPORTANT)
        localStorage.setItem("selectedPlan", plan);
        window.location.href = "dashboard.html";
    })
    .catch(err => {
        console.log(err);
        alert("Error saving plan");
    });
}


//  NAVIGATION

function goLogin(){
    window.location.href = "login.html";
}
function goRegister(){
    window.location.href = "register.html";
}


//  LOGOUT

function logout(){
    localStorage.clear();
    alert("Logged out");
    window.location.href = "login.html";
}


//  UPGRADE

function upgrade(){
    window.location.href = "plans.html";
}